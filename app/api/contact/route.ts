import { createHash } from "node:crypto";

import { NextRequest, NextResponse } from "next/server";

import { contact } from "@/config/content";
import { siteConfig } from "@/config/site";
import { sendInquiryEmail, type SendFailureReason } from "@/lib/email";

/**
 * Contact form endpoint.
 *
 * Validates input server-side, applies layered abuse protection, and
 * forwards accepted messages to the Resend HTTP API through
 * `lib/email.ts` — a server-to-server call with a hard timeout. Provider
 * credentials never reach client code. Required environment variables are
 * documented in `.env.example`; while they are missing, submissions are
 * honestly rejected with 503 instead of pretending to succeed, and the
 * visitor is pointed at the published direct email address.
 *
 * The visitor sees success only after the provider has accepted the
 * message (HTTP 2xx with the expected response shape). Provider
 * acceptance is not a guarantee of final inbox delivery, and no such
 * claim is made anywhere in the UI.
 *
 * Abuse protection is layered because no single limiter is enough:
 *
 *  1. A body-size guard, before the body is read.
 *  2. A global window over all visitors, so a route with no resolvable
 *     client IP cannot be spammed without limit.
 *  3. A per-visitor attempt budget covering *every* request — valid,
 *     invalid, honeypot, provider failure — so retry loops cannot run
 *     indefinitely.
 *  4. A duplicate-submit guard, so a double click cannot produce a
 *     second email.
 *  5. A tighter per-visitor send budget for accepted messages.
 *
 * The per-visitor buckets are still an in-process `Map`. That is a real
 * limitation on serverless: each instance has its own map, so the
 * effective limit is `limit x instances`, and the state is lost on
 * cold start. See the deployment notes at the bottom of this file.
 */

/** Accepted messages per visitor per window. */
const SEND_WINDOW_MS = 10 * 60 * 1000;
const SEND_MAX_PER_WINDOW = 3;

/** Every request per visitor per window (valid or not). */
const ATTEMPT_WINDOW_MS = 10 * 60 * 1000;
const ATTEMPT_MAX_PER_WINDOW = 20;

/** Backstop over all visitors; only trips under real abuse. */
const GLOBAL_WINDOW_MS = 60 * 1000;
const GLOBAL_MAX_PER_WINDOW = 120;

/** Bounds the in-process maps so they cannot grow without limit. */
const MAX_BUCKETS = 1000;

/** Reject oversized bodies before reading them into memory. */
const MAX_BODY_BYTES = 32 * 1024;

/**
 * Identical payloads from the same visitor inside this window are treated
 * as a double submit (double-click, impatient retry) and rejected before a
 * second email is sent.
 */
const DUPLICATE_WINDOW_MS = 60 * 1000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validCategories = new Set(
  contact.form.categories.map((category) => category.value)
);

type Buckets = Map<string, number[]>;

const attemptBuckets: Buckets = new Map();
const sendBuckets: Buckets = new Map();
const duplicateBuckets: Buckets = new Map();
const globalStamps: number[] = [];

function within(stamps: number[], windowMs: number, now: number): number[] {
  return stamps.filter((stamp) => now - stamp < windowMs);
}

/** Reads a bucket, dropping it once the window has fully elapsed. */
function readBucket(
  buckets: Buckets,
  key: string,
  windowMs: number,
  now: number
): number[] {
  const stamps = buckets.get(key);
  if (!stamps) return [];
  const recent = within(stamps, windowMs, now);
  if (recent.length === 0) buckets.delete(key);
  else buckets.set(key, recent);
  return recent;
}

/**
 * Appends to a bucket and re-inserts it, so Map insertion order tracks
 * recency and the oldest (least recently used) bucket is evicted first
 * once `MAX_BUCKETS` is reached.
 */
function record(buckets: Buckets, key: string, now: number): void {
  const stamps = buckets.get(key) ?? [];
  stamps.push(now);
  buckets.delete(key);
  buckets.set(key, stamps);
  while (buckets.size > MAX_BUCKETS) {
    const oldest = buckets.keys().next().value;
    if (oldest === undefined) break;
    buckets.delete(oldest);
  }
}

/**
 * Best-effort visitor key.
 *
 * Preference order:
 *   1. `x-vercel-forwarded-for` — set by Vercel's edge before the
 *      request reaches the app, so a client cannot inject it there.
 *   2. `x-real-ip` — same, set by the platform proxy.
 *   3. `x-forwarded-for` — LAST RESORT ONLY. When the app is reachable
 *      without a proxy this header is caller-controlled, so it can be
 *      rotated to evade the per-visitor limits. It is still used because
 *      it is the only option behind a self-configured reverse proxy
 *      that does not set the Vercel headers, and it stops naive scripted
 *      abuse in that setup. The global window is what actually bounds a
 *      header-rotating attacker.
 *
 * Returns `null` when nothing is available — the caller then skips
 * per-visitor limiting entirely rather than sharing one bucket, which is
 * what previously let a single unknown-IP bucket block unrelated
 * visitors. (`NextRequest.ip` is not exposed by the Next.js version in
 * use.)
 */
function visitorKey(request: NextRequest): string | null {
  const candidates = [
    request.headers.get("x-vercel-forwarded-for"),
    request.headers.get("x-real-ip"),
    request.headers.get("x-forwarded-for"),
  ];
  for (const candidate of candidates) {
    const first = candidate?.split(",")[0]?.trim();
    if (first) return first;
  }
  return null;
}

/**
 * Diagnostic log line. Visitor identifiers are a truncated salted hash,
 * never the raw IP, and neither the message body nor the visitor's email
 * address is ever written to the log.
 */
function logEvent(
  event: string,
  visitor: string | null,
  extra?: Record<string, string | number>
) {
  const id = visitor ? hashVisitor(visitor) : "unknown";
  const suffix = extra
    ? " " + Object.entries(extra).map(([k, v]) => `${k}=${v}`).join(" ")
    : "";
  console.warn(`[contact] ${event} visitor=${id}${suffix}`);
}

function hashVisitor(value: string): string {
  return createHash("sha256")
    .update(`devspark-contact:${value}`)
    .digest("hex")
    .slice(0, 12);
}

function errorResponse(
  status: number,
  error: string,
  message: string,
  fields?: Record<string, string>
) {
  return NextResponse.json(
    fields ? { error, message, fields } : { error, message },
    { status }
  );
}

export async function POST(request: NextRequest) {
  const now = Date.now();

  // 1. Size guard — before the body is read into memory.
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return errorResponse(400, "invalid", "Invalid request body.");
  }

  // 2. Global backstop over every visitor.
  const globalRecent = within(globalStamps, GLOBAL_WINDOW_MS, now);
  globalStamps.length = 0;
  globalStamps.push(...globalRecent);
  if (globalRecent.length >= GLOBAL_MAX_PER_WINDOW) {
    logEvent("global_limited", null, { window: GLOBAL_WINDOW_MS });
    return errorResponse(
      429,
      "rate_limited",
      "Too many messages have been received. Please try again later."
    );
  }
  globalStamps.push(now);

  const visitor = visitorKey(request);

  // 3. Per-visitor attempt budget. Counted before validation so invalid,
  //    honeypot and malformed requests are bounded too.
  if (visitor) {
    if (
      readBucket(attemptBuckets, visitor, ATTEMPT_WINDOW_MS, now).length >=
      ATTEMPT_MAX_PER_WINDOW
    ) {
      logEvent("attempt_limited", visitor);
      return errorResponse(
        429,
        "rate_limited",
        "Too many messages have been sent from this device. Please try again later."
      );
    }
    record(attemptBuckets, visitor, now);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return errorResponse(400, "invalid", "Invalid request body.");
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const category = typeof body.category === "string" ? body.category.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const honeypot = typeof body.website === "string" ? body.website.trim() : "";

  // Honeypot: real users never see this field, so a filled value is spam.
  if (honeypot !== "") {
    logEvent("honeypot", visitor);
    return errorResponse(400, "validation", "Please check the form fields.");
  }

  const invalid: Record<string, string> = {};
  if (name.length < 2 || name.length > 100) invalid.name = "invalid";
  if (email.length > 200 || !EMAIL_PATTERN.test(email)) invalid.email = "invalid";
  if (!validCategories.has(category)) invalid.category = "invalid";
  if (message.length < 10 || message.length > 5000) invalid.message = "invalid";
  if (Object.keys(invalid).length > 0) {
    return errorResponse(
      400,
      "validation",
      "Please check the form fields.",
      invalid
    );
  }

  // 4. Per-visitor send budget for accepted messages.
  if (
    visitor &&
    readBucket(sendBuckets, visitor, SEND_WINDOW_MS, now).length >=
      SEND_MAX_PER_WINDOW
  ) {
    logEvent("send_limited", visitor);
    return errorResponse(
      429,
      "rate_limited",
      "Too many messages have been sent from this device. Please try again later."
    );
  }

  // 5. Duplicate-submit guard. The same content from the same visitor
  //    inside a short window is a double click, not a second inquiry. It is
  //    checked before the send budget so a rejected duplicate does not
  //    consume that budget, and it is only recorded after a confirmed
  //    provider acceptance, so a failed send can always be retried.
  if (visitor) {
    const duplicateKey = `${visitor}:${contentHash(email, category, message)}`;
    if (
      readBucket(duplicateBuckets, duplicateKey, DUPLICATE_WINDOW_MS, now)
        .length > 0
    ) {
      logEvent("duplicate", visitor);
      return errorResponse(
        409,
        "duplicate",
        "This message was already received a moment ago. There is no need to send it again."
      );
    }
  }

  const categoryLabel =
    contact.form.categories.find((entry) => entry.value === category)?.label ??
    category;

  // The receiving inbox falls back to the published site address, so the
  // published contact and the form destination cannot drift apart.
  const toEmail = process.env.CONTACT_TO_EMAIL ?? siteConfig.links.contactEmail;

  if (
    !process.env.RESEND_API_KEY ||
    !process.env.CONTACT_FROM_EMAIL ||
    !toEmail
  ) {
    return errorResponse(
      503,
      "not_configured",
      "The contact form is not connected to an email provider yet. Nothing was sent — please check back soon, or email us directly."
    );
  }

  // 6. Provider hand-off. Only a confirmed acceptance (HTTP 2xx with the
  //    expected response shape) is reported to the visitor as success.
  const startedAt = Date.now();
  const result = await sendInquiryEmail({
    name,
    email,
    categoryLabel,
    message,
    receivedAt: new Date(now),
  });

  if (!result.ok) {
    logEvent("provider_failure", visitor, {
      reason: result.reason,
      ...(result.status !== undefined ? { status: result.status } : {}),
    });
    return errorResponse(502, result.reason, failureMessage(result.reason));
  }

  logEvent("provider_accepted", visitor, { ms: Date.now() - startedAt });

  if (visitor) {
    record(sendBuckets, visitor, Date.now());
    record(
      duplicateBuckets,
      `${visitor}:${contentHash(email, category, message)}`,
      Date.now()
    );
  }

  return NextResponse.json({ ok: true });
}

/** Stable key for the duplicate-submit window. */
function contentHash(email: string, category: string, message: string): string {
  return createHash("sha256")
    .update(`${email}\n${category}\n${message}`)
    .digest("hex");
}

/**
 * Visitor-safe copy for each provider failure. None of these expose the
 * provider's response body, the API key, or which variable is missing.
 */
function failureMessage(reason: SendFailureReason): string {
  switch (reason) {
    case "config":
      return "The contact form's email service is not set up correctly, so nothing was sent. Please email us directly instead.";
    case "rate":
      return "The email service is busy right now, so nothing was sent. Please try again in a few minutes.";
    case "timeout":
      return "The email service took too long to respond, so nothing was sent. Your text is preserved — please try again.";
    default:
      return "The message could not be sent. Your text is preserved in the form — please try again.";
  }
}

/*
 * Remaining deployment requirement (not solvable in application code):
 *
 * Email delivery needs three manual steps outside this repository:
 * a Resend account, an API key, and a sender that Resend will accept.
 * A Gmail address cannot be verified as a Resend *sending* domain — the
 * fastest real-delivery path is Resend's test sender
 * ("DevSpark <onboarding@resend.dev>") used from an account whose own
 * address is the DevSpark inbox, because test mode only delivers to the
 * account owner's address. Sending to arbitrary recipients at scale needs
 * a domain the project controls, verified with SPF/DKIM/DMARC records.
 * Full steps are documented in `.env.example`. No credentials were
 * created or stored in this repository.
 *
 * The send and attempt buckets above live in this process's memory. On a
 * serverless platform each instance keeps its own map, so the real limit
 * is `SEND_MAX_PER_WINDOW x instances`, the state is lost on cold start,
 * and a distributed attacker can multiply the allowance by spreading
 * requests across instances.
 *
 * Before launch, add a limiter that is shared across instances — e.g.
 * Vercel's WAF / rate-limiting rules, or a small shared store such as
 * Upstash Redis used from this route. That requires platform or
 * infrastructure approval and is not implemented here.
 *
 * Note: `NextRequest.ip` is not exposed by the Next.js version in use, so
 * the visitor key comes from headers (see `visitorKey`). On Vercel those
 * are platform-set and trustworthy. If the site is ever hosted somewhere
 * that sets none of them, every request keys off a caller-controlled
 * `x-forwarded-for` (or off nothing at all), which a determined attacker
 * can rotate — the global window is then the only real bound. That must
 * be re-evaluated at the same time as the shared limiter above.
 */
