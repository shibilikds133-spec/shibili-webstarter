/**
 * Lightweight In-Memory Rate Limiter (Local/Dev Fallback)
 * 
 * NOTE: This is NOT suitable for distributed production environments (like Vercel serverless)
 * because each function instance maintains its own memory. 
 * 
 * For production, implement a provider adapter here (e.g. Redis/Upstash) and return 
 * its boolean result. The API route already awaits this function.
 */
const hits = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 20;

// Basic cleanup to prevent memory leaks in long-running processes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of hits.entries()) {
    if (now - entry.first > WINDOW_MS) hits.delete(key);
  }
}, WINDOW_MS * 2).unref?.();

export async function rateLimitCheck(key: string): Promise<boolean> {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry) {
    hits.set(key, { count: 1, first: now });
    return false;
  }
  if (now - entry.first > WINDOW_MS) {
    hits.set(key, { count: 1, first: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}