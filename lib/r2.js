// lib/r2.js
// Cloudflare R2 client for permanent image storage
// ------------------------------------------------
// Uses S3-compatible API via @aws-sdk/client-s3
// Images are uploaded after AI generation and served
// from images.mintedpaws.co for use in Customily templates
//
// Required env vars:
//   R2_ACCESS_KEY_ID     — from Cloudflare R2 API token
//   R2_SECRET_ACCESS_KEY — from Cloudflare R2 API token
//   R2_ENDPOINT          — S3 API URL from bucket settings (e.g. https://ACCOUNT_ID.r2.cloudflarestorage.com)
//   R2_BUCKET_NAME       — minted-paws-images
//   R2_PUBLIC_URL        — https://images.mintedpaws.co

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

/**
 * Upload an image buffer to R2 and return the public URL.
 *
 * @param {Buffer} imageBuffer — the PNG image data
 * @param {string} type — elemental type (used in filename for organization)
 * @returns {string} — public URL like https://images.mintedpaws.co/fire/a7f3b2c9.png
 */
export async function uploadToR2(imageBuffer, type) {
  // Generate a unique filename: type/timestamp-random.png
  const id =
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const key = `${type}/${id}.png`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: imageBuffer,
      ContentType: "image/png",
      // Cache for 1 year — these images never change once created
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  return `${process.env.R2_PUBLIC_URL}/${key}`;
}
