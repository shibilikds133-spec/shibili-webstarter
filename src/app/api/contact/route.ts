import { NextResponse } from 'next/server';

import { rateLimitCheck } from '@/lib/rateLimit';
import { getEnv } from '@/lib/env';
import { ContactFormSchema } from '@/lib/schemas';

export const runtime = 'nodejs'; // Required for in-memory rate limiting map to persist

export async function POST(req: Request) {
  const env = getEnv();
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const parsed = ContactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.issues.map(i => i.message) },
      { status: 400 }
    );
  }

  const { name, email, message, website } = parsed.data;

  // Honeypot check (abort if bot filled the hidden field)
  if (website && website.length > 0) {
    return NextResponse.json({ status: 'ok' }, { status: 200 }); // fake success for bots
  }

  // Rate Limiting (In-memory dev/local fallback).
  // Note: For distributed deployments, adapt `rateLimitCheck` to use a global store (e.g. Redis).
  // Do NOT rely solely on x-forwarded-for for authorization boundaries.
  const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || 'unknown';
  const limited = await rateLimitCheck(ip);
  if (limited) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const payload = {
    tenantId: env.TENANT_ID,
    name,
    email,
    message,
    meta: {
      ua: req.headers.get('user-agent'),
      timestamp: new Date().toISOString()
    }
  };

  /*
  // Example Upstream submission
  try {
    const upstream = await fetch(`${env.RAISUITE_API_BASE}/enquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RAISUITE_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!upstream.ok) {
      console.error(`[contact] Upstream error: ${upstream.status}`);
      // Do not expose upstream details to client
      return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('[contact] Network error contacting upstream', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
  */

  console.log('[contact] Received enquiry', payload);

  return NextResponse.json({ status: 'ok' }, { status: 200 });
}