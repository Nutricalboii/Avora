import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// ─── Schema ─────────────────────────────────────────────────────────────────

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address').max(254),
  company: z.string().max(100).optional(),
  serviceType: z.string().max(50).optional(),
  focusArea: z.string().max(50).optional(),
  industry: z.string().max(50).optional(),
  message: z.string().min(1, 'Message is required').max(2000),
  // Honeypot — bots fill this; real browsers leave it empty
  _honeypot: z.string().max(0, 'Bot detected').optional(),
});

// ─── Rate limiter ────────────────────────────────────────────────────────────
// Simple in-process store. On Vercel each function invocation shares memory
// within the same instance; good enough for spam throttling.

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;           // max submissions per window
const WINDOW_MS  = 15 * 60 * 1000; // 15 minutes

// Periodically prune stale entries so the map doesn't grow unbounded
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateLimitMap.entries()) {
    if (now > val.resetAt) rateLimitMap.delete(key);
  }
}, 5 * 60 * 1000); // every 5 minutes

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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getClientIp(req: NextRequest): string {
  // x-real-ip is set by Vercel's edge from the TCP connection — not spoofable
  // x-forwarded-for is best-effort and should not be fully trusted
  return (
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown'
  );
}

function jsonError(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, {
    status,
    headers: {
      'Content-Type': 'application/json',
      // Prevent caching of error responses
      'Cache-Control': 'no-store',
    },
  });
}

// ─── Handler ──────────────────────────────────────────────────────────────────

// Refuse requests whose body exceeds this to prevent memory exhaustion
const MAX_BODY_BYTES = 8_192; // 8 KB — more than enough for a contact form

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Enforce Content-Type
  const contentType = req.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return jsonError('Unsupported Media Type.', 415);
  }

  // 2. Enforce request body size
  const contentLength = Number(req.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return jsonError('Request body too large.', 413);
  }

  // 3. Rate limit
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(WINDOW_MS / 1000)),
          'Cache-Control': 'no-store',
        },
      }
    );
  }

  // 4. Parse JSON body
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return jsonError('Invalid JSON body.', 400);
  }

  // 5. Validate with Zod
  const parsed = ContactSchema.safeParse(rawBody);
  if (!parsed.success) {
    return jsonError(
      parsed.error.issues[0]?.message ?? 'Validation failed.',
      422
    );
  }

  const { _honeypot, ...data } = parsed.data;

  // 6. Honeypot trap — silent fake-success so bots never learn
  if (_honeypot && _honeypot.length > 0) {
    return NextResponse.json({ success: true }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  // 7. Forward to Google Apps Script backend
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

  if (!GOOGLE_SCRIPT_URL) {
    // Dev mode: no backend configured — log locally and succeed gracefully
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Contact] GOOGLE_SCRIPT_URL not set — logging locally:', data);
      return NextResponse.json({ success: true }, {
        headers: { 'Cache-Control': 'no-store' },
      });
    }
    console.error('[Contact] GOOGLE_SCRIPT_URL is not configured in production.');
    return jsonError('Service unavailable. Please email us directly.', 503);
  }

  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      // Abort if the upstream doesn't respond in 8 seconds
      signal: AbortSignal.timeout(8_000),
    });

    if (!res.ok) {
      console.error('[Contact] Google Script non-OK status:', res.status);
      return jsonError(
        'Submission could not be delivered. Please try again or email us directly.',
        502
      );
    }

    return NextResponse.json({ success: true }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    const isTimeout = err instanceof DOMException && err.name === 'TimeoutError';
    console.error('[Contact] Google Script error:', isTimeout ? 'timeout' : err);
    return jsonError(
      isTimeout
        ? 'Request timed out. Please try again.'
        : 'Submission could not be delivered. Please try again or email us directly.',
      isTimeout ? 504 : 502
    );
  }
}

// Explicitly block all other HTTP methods
export function GET()    { return jsonError('Method not allowed.', 405); }
export function PUT()    { return jsonError('Method not allowed.', 405); }
export function PATCH()  { return jsonError('Method not allowed.', 405); }
export function DELETE() { return jsonError('Method not allowed.', 405); }
