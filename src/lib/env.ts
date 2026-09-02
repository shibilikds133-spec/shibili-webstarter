import { z } from 'zod';

const EnvSchema = z.object({
  TENANT_ID: z.string().min(1),
  RAISUITE_API_BASE: z.string().url(),
  RAISUITE_API_KEY: z.string().min(10),
  TURNSTILE_SECRET: z.string().optional()
});

let cached: z.infer<typeof EnvSchema> | null = null;

export function getEnv() {
  if (cached) return cached;
  const parsed = EnvSchema.safeParse({
    TENANT_ID: process.env.TENANT_ID,
    RAISUITE_API_BASE: process.env.RAISUITE_API_BASE,
    RAISUITE_API_KEY: process.env.RAISUITE_API_KEY,
    TURNSTILE_SECRET: process.env.TURNSTILE_SECRET
  });
  if (!parsed.success) {
    const missingFields = Object.keys(parsed.error.flatten().fieldErrors);
    console.error(`[env] Missing or invalid configuration: ${missingFields.join(', ')}`);
    throw new Error('Environment configuration error. Check the application logs.');
  }
  cached = parsed.data;
  return cached;
}