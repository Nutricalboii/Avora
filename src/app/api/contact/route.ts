import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// ponytail: single API route replaces client-side fetch to Google Script URL
// Engineered by Vaibhav Sharma · github.com/Nutricalboii

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().max(100).optional(),
  serviceType: z.string().max(50).optional(),
  budgetRange: z.string().max(50).optional(),
  message: z.string().min(1, 'Message is required').max(2000),
  _honeypot: z.string().max(0, 'Bot detected').optional(), // honeypot field
});

// Simple in-memory rate limiting (per-IP, resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3; // max submissions
const WINDOW_MS = 15 * 60 * 1000; // per 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (record.count >= RATE_LIMIT) return true;
  record.count++;
  return false;
}

export async function POST(req: NextRequest) {
  // Rate limiting by IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Validation failed.' },
      { status: 422 }
    );
  }

  const { _honeypot, ...data } = parsed.data;

  // Honeypot check — bots fill this field, humans leave it empty
  if (_honeypot && _honeypot.length > 0) {
    // Silently succeed — don't let bots know they were caught
    return NextResponse.json({ success: true });
  }

  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
  if (!GOOGLE_SCRIPT_URL) {
    console.error('GOOGLE_SCRIPT_URL env var is not set');
    return NextResponse.json(
      { error: 'Service temporarily unavailable.' },
      { status: 503 }
    );
  }

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Google Script submission error:', err);
    return NextResponse.json(
      { error: 'Failed to send. Please try again.' },
      { status: 500 }
    );
  }
}
