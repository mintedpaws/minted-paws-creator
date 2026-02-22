// app/api/generate/route.js
// Minted Paws Creator — AI Pet Transformation API
// ------------------------------------------------
// 1. Accepts a pet photo (base64) + elemental type
// 2. Rate limits the request
// 3. Sends to Flux PuLID on Replicate for identity-preserving transformation
// 4. Returns the generated image URL
//
// Model: bytedance/flux-pulid ($0.005/image)
// Upgrade path: switch to black-forest-labs/flux-kontext-pro for production

import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { checkRateLimit, recordGeneration } from '@/lib/rate-limit';
import { getPromptsForType } from '@/lib/prompts';

// ---- Config ----
const MODEL = "bytedance/flux-pulid";
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
    const prompts = getPromptsForType(type);

    // Combine all prompt lines into one string + add anti-text instruction
    const fullPrompt = prompts.prompt.join(" ") +
      " Do not include any text, words, letters, numbers, or writing anywhere in the image.";

    // ---- Initialize Replicate ----
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // ---- Call Flux PuLID ----
    // PuLID key parameters:
    //   main_face_image: the pet photo (extracts identity features)
    //   id_weight: how strongly to preserve identity (0-3)
    //   start_step: when to insert identity (0 = max fidelity, 4 = more editability)
    //   guidance_scale: prompt adherence (1-10)
    //
    // For stylized art (like Pokemon cards), we use:
    //   start_step: 1 (high fidelity but allows some artistic transformation)
    //   id_weight: 1.0 (balanced — preserves features without fighting the style)
    //   guidance_scale: 4 (standard)

    const output = await replicate.run(MODEL, {
      input: {
        main_face_image: image,
        prompt: fullPrompt,
        negative_prompt: "text, words, letters, numbers, writing, watermark, signature, blurry, bad anatomy, extra limbs, deformed, generic wolf, generic fox, human, cartoon, low quality, worst quality",
        width: 896,
        height: 1152,
        num_steps: 20,
        start_step: 1,
        guidance_scale: 4,
        id_weight: 1.0,
        true_cfg: 1,
        max_sequence_length: 256,
        num_outputs: 1,
        seed: Math.floor(Math.random() * 999999),
        output_format: "png",
        output_quality: 95,
      },
    });

    // PuLID returns an array of URLs
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
