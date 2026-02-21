// lib/rate-limit.js
// In-memory rate limiter for Vercel serverless functions
// For production at scale, swap this out for Redis (Upstash) — but this handles
// moderate traffic fine and costs $0

// ============================================================
// CONFIGURATION — adjust these limits as needed
// ============================================================
const LIMITS = {
  // Max generations per IP address per hour
  perIpPerHour: 5,

  // Max generations per session token per day
  perSessionPerDay: 5,

  // Max generations per IP per day (hard ceiling)
  perIpPerDay: 15,

  // Cleanup: remove entries older than this (milliseconds)
  entryTTL: 24 * 60 * 60 * 1000, // 24 hours
};

// ============================================================
// Storage (in-memory — resets on cold start, which is fine)
// ============================================================
const ipStore = new Map();     // ip -> [timestamp, timestamp, ...]
const sessionStore = new Map(); // sessionToken -> [timestamp, timestamp, ...]

// Periodic cleanup to prevent memory leaks
let lastCleanup = Date.now();
function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < 60_000) return; // Only clean every 60s
  lastCleanup = now;
  const cutoff = now - LIMITS.entryTTL;

  for (const [key, timestamps] of ipStore) {
    const filtered = timestamps.filter((t) => t > cutoff);
    if (filtered.length === 0) ipStore.delete(key);
    else ipStore.set(key, filtered);
  }
  for (const [key, timestamps] of sessionStore) {
    const filtered = timestamps.filter((t) => t > cutoff);
    if (filtered.length === 0) sessionStore.delete(key);
    else sessionStore.set(key, filtered);
  }
}

// ============================================================
// Main check function
// ============================================================
export function checkRateLimit(ip, sessionToken) {
  cleanup();

  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;
  const oneDayAgo = now - 24 * 60 * 60 * 1000;

  // --- Check IP per hour ---
  const ipHits = ipStore.get(ip) || [];
  const ipHitsLastHour = ipHits.filter((t) => t > oneHourAgo);
  if (ipHitsLastHour.length >= LIMITS.perIpPerHour) {
    return {
      allowed: false,
      reason: "Too many requests. Please try again in a bit.",
      retryAfterSeconds: Math.ceil((ipHitsLastHour[0] + 60 * 60 * 1000 - now) / 1000),
    };
  }

  // --- Check IP per day ---
  const ipHitsLastDay = ipHits.filter((t) => t > oneDayAgo);
  if (ipHitsLastDay.length >= LIMITS.perIpPerDay) {
    return {
      allowed: false,
      reason: "Daily limit reached. Come back tomorrow!",
      retryAfterSeconds: Math.ceil((ipHitsLastDay[0] + 24 * 60 * 60 * 1000 - now) / 1000),
    };
  }

  // --- Check session per day ---
  if (sessionToken) {
    const sessionHits = sessionStore.get(sessionToken) || [];
    const sessionHitsLastDay = sessionHits.filter((t) => t > oneDayAgo);
    if (sessionHitsLastDay.length >= LIMITS.perSessionPerDay) {
      return {
        allowed: false,
        reason: "You've used all your generations for today. Come back tomorrow!",
        retryAfterSeconds: Math.ceil((sessionHitsLastDay[0] + 24 * 60 * 60 * 1000 - now) / 1000),
      };
    }
  }

  return { allowed: true };
}

// Record a successful generation
export function recordGeneration(ip, sessionToken) {
  const now = Date.now();

  const ipHits = ipStore.get(ip) || [];
  ipHits.push(now);
  ipStore.set(ip, ipHits);

  if (sessionToken) {
    const sessionHits = sessionStore.get(sessionToken) || [];
    sessionHits.push(now);
    sessionStore.set(sessionToken, sessionHits);
  }
}
