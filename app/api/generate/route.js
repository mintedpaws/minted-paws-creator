// app/api/generate/route.js
// Minted Paws Creator — AI Pet Transformation API
// ------------------------------------------------
// 1. Accepts a pet photo (base64) + elemental type
// 2. Rate limits the request
// 3. Sends to GPT-Image-1.5 on Replicate for image transformation
// 4. Uploads the result to Cloudflare R2 for permanent storage
// 5. Returns the permanent image URL
//
// Model: openai/gpt-image-1.5 (billed via OpenAI API key)
// Storage: Cloudflare R2 via images.mintedpaws.co

import { NextResponse } from "next/server";
import Replicate from "replicate";
import { checkRateLimit, recordGeneration } from "@/lib/rate-limit";
import { getPromptForType } from "@/lib/prompts";
import { uploadToR2 } from "@/lib/r2";

// ---- Config ----
const MODEL = "openai/gpt-image-1.5";
const VALID_TYPES = [
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "fighting",
];
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
    if (!image || !image.startsWith("data:image")) {
      return NextResponse.json(
        { error: "Image is required. Submit base64 data only." },
        { status: 400 }
      );
    }

    if (image.length > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "Image too large. Please use a photo under 5MB." },
        { status: 400 }
      );
    }

    // ---- Validate OpenAI API key ----
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY environment variable is not set");
      return NextResponse.json(
        { error: "Server configuration error. Please contact support." },
        { status: 500 }
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

    // ---- Get prompt for this type ----
    const promptText = getPromptForType(type);

    // Add anti-text instruction
    const fullPrompt =
      promptText +
      " Do not include any text, words, letters, numbers, or writing anywhere in the image.";

    // ---- Initialize Replicate ----
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // ---- Call GPT-Image-1.5 ----
    const output = await replicate.run(MODEL, {
      input: {
        prompt: fullPrompt,
        input_images: [image],
        openai_api_key: process.env.OPENAI_API_KEY,
        input_fidelity: "low",
        aspect_ratio: "3:2",
        quality: "low",
        output_format: "png",
        output_compression: 100,
        moderation: "low",
      },
    });

    // GPT-Image-1.5 returns an array of image URLs
    const tempUrl = Array.isArray(output) ? output[0] : output;
    const tempImageUrl =
      typeof tempUrl === "string" ? tempUrl : tempUrl?.url?.();

    if (!tempImageUrl) {
      return NextResponse.json(
        { error: "AI generation failed. Please try again." },
        { status: 500 }
      );
    }

    // ---- Upload to R2 for permanent storage ----
    let permanentUrl = tempImageUrl; // fallback to temp URL if R2 fails

    try {
      // Fetch the generated image from Replicate's temp URL
      const imageResponse = await fetch(tempImageUrl);
      if (!imageResponse.ok) {
        throw new Error(`Failed to fetch image: ${imageResponse.status}`);
      }
      const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

      // Upload to R2
      permanentUrl = await uploadToR2(imageBuffer, type);
      console.log(`Image saved to R2: ${permanentUrl}`);
    } catch (r2Error) {
      // Log but don't fail — return temp URL as fallback
      console.error("R2 upload failed, using temp URL:", r2Error.message);
    }

    // ---- Record successful generation for rate limiting ----
    recordGeneration(ip, sessionId);

    // ---- Return result ----
    return NextResponse.json({
      imageUrl: permanentUrl,
      type,
      model: MODEL,
    });
  } catch (error) {
    console.error("Generation error:", error);

    // Surface helpful error messages for common issues
    const msg = error.message || "";
    if (msg.includes("verified")) {
      return NextResponse.json(
        {
          error:
            "OpenAI organization needs verification. Visit platform.openai.com/settings/organization/general",
          details: msg,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to generate image. Please try again.",
        details: msg,
      },
      { status: 500 }
    );
  }
}
