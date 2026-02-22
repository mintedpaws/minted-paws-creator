// app/api/health/route.js
// Minted Paws — Health Check
// GET /api/health

import { NextResponse } from 'next/server';

export async function GET() {
  const checks = {
    replicate: !!process.env.REPLICATE_API_TOKEN,
    model: 'bytedance/flux-pulid',
  };

  const allGood = checks.replicate;

  return NextResponse.json(
    {
      status: allGood ? 'ready' : 'missing configuration',
      service: 'Minted Paws Creator',
      checks: {
        replicate: checks.replicate ? '✅ Configured' : '❌ Missing REPLICATE_API_TOKEN',
        model: checks.model,
      },
      types: ['fire', 'water', 'grass', 'electric', 'psychic', 'fighting'],
    },
    { status: allGood ? 200 : 503 }
  );
}
