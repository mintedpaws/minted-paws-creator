// app/api/generate/route.js
// Server-side API route — the Replicate key NEVER touches the browser
//
// Flow:
//   1. Validate request (type, image present)
//   2. Check rate limits (IP + session)
//   3. Call Replicate with type-specific prompt
//   4. Record the generation
//   5. Return the image URL
//
// The frontend calls: POST /api/generate { type, image, sessionToken }

import { NextResponse } from "next/server";
import Replicate from "replicate";
import { checkRateLimit, recordGeneration } from "@/lib/rate-limit";
import { getPromptForType } from "@/lib/prompts";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// FLUX.1 Kontext Pro model identifier on Replicate
const MODEL = "black-forest-labs/flux-kontext-pro";

// Valid type IDs
const VALID_TYPES = ["fire", "water", "grass", "electric", "psychic", "fighting"];

// Max image size: 10MB base64 ≈ 13.3MB string
const MAX_IMAGE_SIZE = 14_000_000;

export async function POST(request) {
  try {
    // ── Parse request ──────────────────────────────────────
    const body = await request.json();
    const { type, image, sessionToken } = body;

    // ── Validate inputs ────────────────────────────────────
    if (!type || !VALID_TYPES.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${VALID_TYPES.join(", ")}` },
        { status: 400 }
      );
    }

    if (!image || !image.startsWith("data:image/")) {
      return NextResponse.json(
        { error: "Image is required (base64 data URI)" },
        { status: 400 }
      );
    }

    if (image.length > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "Image too large. Please use a photo under 10MB." },
        { status: 400 }
      );
    }

    // ── Rate limit check ───────────────────────────────────
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateCheck = checkRateLimit(ip, sessionToken);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: rateCheck.reason },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfterSeconds || 60),
          },
        }
      );
    }

    // ── Get prompt for this type ───────────────────────────
    const prompt = getPromptForType(type);

    // ── Call Replicate ─────────────────────────────────────
    const output = await replicate.run(MODEL, {
      input: {
        prompt: prompt,
        input_image: image,
        // Kontext Pro parameters
        aspect_ratio: "3:4",       // Trading card proportions
        safety_tolerance: 2,        // Moderate safety filter
        output_format: "png",
        output_quality: 95,
      },
    });

    // output is typically a URL string or array — normalize it
    const imageUrl = Array.isArray(output) ? output[0] : output;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "AI generation failed. Please try again." },
        { status: 500 }
      );
    }

    // ── Record successful generation ───────────────────────
    recordGeneration(ip, sessionToken);

    // ── Return result ──────────────────────────────────────
    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      type: type,
    });
  } catch (err) {
    console.error("[generate] Error:", err);

    // Handle specific Replicate errors
    if (err.message?.includes("rate limit")) {
      return NextResponse.json(
        { error: "AI service is busy. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    if (err.message?.includes("NSFW") || err.message?.includes("safety")) {
      return NextResponse.json(
        { error: "Image was flagged by our safety filter. Please try a different photo." },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
