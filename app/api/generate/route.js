// app/api/generate/route.js
// Minted Paws Creator — AI Pet Transformation API
// ------------------------------------------------
// 1. Accepts a pet photo (base64) + elemental type
// 2. Rate limits the request
// 3. Sends to Flux Kontext Pro on Replicate for image transformation
// 4. Returns the generated image URL
//
// Model: black-forest-labs/flux-kontext-pro ($0.04-0.05/image)

import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { checkRateLimit, recordGeneration } from '@/lib/rate-limit';
import { getPromptForType } from '@/lib/prompts';

// ---- Config ----
const MODEL = "black-forest-labs/flux-kontext-pro";
const VALID_TYPES = ["fire", "water", "grass", "electric", "psychic", "fighting"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, image, sessionId } = body;

    // ---- Validate type ----
    if (!type || !VALID_TYPES.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Valid types: ${VALID_TYPES.join(", ")}` },
        { status: 400 }
      );
    }

    // ---- Validate image ----
    if (!image || !image.startsWith('data:image')) {
      return NextResponse.json(
        { error: 'Image is required. Submit base64 data only.' },
        { status: 400 }
      );
    }

    if (image.length > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: 'Image too large. Please use a photo under 5MB.' },
        { status: 400 }
      );
    }

    // ---- Rate limiting ----
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateLimitResult = checkRateLimit(ip, sessionId);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: rateLimitResult.reason },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimitResult.retryAfter || 60),
            "X-RateLimit-Reset": String(
              rateLimitResult.retryAfter
                ? Math.floor(Date.now() / 1000) + rateLimitResult.retryAfter
                : Math.floor(Date.now() / 1000) + 60
            ),
          },
        }
      );
    }

    // ---- Get prompts for this type ----
    const promptText = getPromptForType(type);

    // Add anti-text instruction
    const fullPrompt = promptText +
      " Do not include any text, words, letters, numbers, or writing anywhere in the image.";

    // ---- Initialize Replicate ----
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // ---- Call Flux Kontext Pro ----
    // IMPORTANT: parameter is "input_image" not "image"
    const output = await replicate.run(MODEL, {
      input: {
        input_image: image,
        prompt: fullPrompt,
        aspect_ratio: "3:4",
        output_format: "png",
        safety_tolerance: 2,
        seed: Math.floor(Math.random() * 999999),
      },
    });

    // Kontext Pro returns a FileOutput object
    const imageUrl = Array.isArray(output) ? output[0] : output;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'AI generation failed. Please try again.' },
        { status: 500 }
      );
    }

    // ---- Record successful generation for rate limiting ----
    recordGeneration(ip, sessionId);

    // ---- Return result ----
    return NextResponse.json({
      imageUrl: typeof imageUrl === 'string' ? imageUrl : imageUrl.url(),
      type,
      model: MODEL,
    });

  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate image. Please try again.", details: error.message },
      { status: 500 }
    );
  }
}
