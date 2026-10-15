/**
 * Contact-form email delivery (server-only).
 *
 * Builds the inquiry email and forwards it to the Resend HTTP API
 * (https://resend.com/docs) with a hard timeout. Imported exclusively by
 * `app/api/contact/route.ts` — never by client code, so the API key and
 * raw provider responses stay server-side.
 *
 * Security properties:
 *
 *  - Every user-supplied value is HTML-escaped before it reaches the HTML
 *    part, and newlines are stripped from header-bound values, so visitor
 *    input can never inject markup or extra headers. The plain-text part
 *    is sent as `text/plain` and is never interpreted as HTML.
 *  - The visitor's address is set as `reply_to`, never as `from`, so a
 *    submission cannot spoof the sender.
 *  - Provider response bodies are read only to validate the expected
 *    shape; they are never logged or returned to the visitor, because they
 *    can contain account details.
 *
 * Configuration (all server-side, documented in `.env.example`):
 *
 *  - `RESEND_API_KEY`    required — Resend API key.
 *  - `CONTACT_FROM_EMAIL` required — verified sender.
 *  - `CONTACT_TO_EMAIL`  optional — receiving inbox; the route falls back
 *                        to the published site address.
 *  - `RESEND_API_URL`    optional — endpoint override for local testing
 *                        against a mock provider. Unset in production.
 */

/** Provider call budget. A hung socket must not hang the visitor's request. */
const TIMEOUT_MS = 10 * 1000;

const DEFAULT_ENDPOINT = "https://api.resend.com/emails";

export type InquiryPayload = {
  name: string;
  email: string;
  categoryLabel: string;
  message: string;
  receivedAt: Date;
};

/**
 * Why a send failed. The route maps each reason to a visitor-safe message;
 * the raw provider response never leaves this module.
 */
export type SendFailureReason =
  | "config"
  | "rate"
  | "provider"
  | "timeout"
  | "network"
  | "unexpected";

export type SendResult =
  | { ok: true; id: string }
  | { ok: false; reason: SendFailureReason; status?: number };

/** Escapes a value for safe interpolation into the HTML email part. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Flattens CR/LF so a value cannot inject extra header lines. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/**
 * Subject line. Appends "inquiry" only when the category label does not
 * already end with that word — the "project" label is "Project inquiry",
 * which previously produced "Project inquiry inquiry from ...".
 */
export function buildInquirySubject(payload: InquiryPayload): string {
  const label = headerSafe(payload.categoryLabel);
  const noun = /inquiry$/i.test(label) ? "" : " inquiry";
  return `[DevSpark] ${label}${noun} from ${headerSafe(payload.name)}`;
}

export function buildInquiryText(payload: InquiryPayload): string {
  return [
    "DevSpark website contact form",
    "=============================",
    "",
    `Received:  ${payload.receivedAt.toISOString()} (${payload.receivedAt.toUTCString()})`,
    `Category:  ${payload.categoryLabel}`,
    `Name:      ${payload.name}`,
    `Reply to:  ${payload.email}`,
    "",
    "Message",
    "-------",
    payload.message,
    "",
    "--",
    "Sent from the DevSpark website contact form (devspark.codes).",
  ].join("\n");
}

export function buildInquiryHtml(payload: InquiryPayload): string {
  const e = escapeHtml;
  const row = (label: string, value: string) =>
    `<tr><th align="left" valign="top" style="padding:6px 16px 6px 0;color:#6e6e6e;font:400 13px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;white-space:nowrap">${label}</th>` +
    `<td align="left" valign="top" style="padding:6px 0;color:#111111;font:400 14px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">${value}</td></tr>`;

  return [
    '<!doctype html><html><body style="margin:0;padding:24px;background:#f7f6f2">',
    '<div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e6e3dc;border-radius:14px;padding:28px">',
    '<p style="margin:0 0 4px;font:600 12px/1 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;letter-spacing:0.08em;text-transform:uppercase;color:#f58220">DevSpark</p>',
    '<h1 style="margin:0 0 18px;font:600 20px/1.3 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111111">New website inquiry</h1>',
    '<table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;border-top:1px solid #e6e3dc">',
    row("Received", `${e(payload.receivedAt.toISOString())}<span style="color:#6e6e6e"> (${e(payload.receivedAt.toUTCString())})</span>`),
    row("Category", `<strong style="font-weight:600">${e(payload.categoryLabel)}</strong>`),
    row("Name", e(payload.name)),
    row("Reply to", `<a href="mailto:${e(payload.email)}" style="color:#111111">${e(payload.email)}</a>`),
    "</table>",
    '<p style="margin:22px 0 8px;font:600 12px/1 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;letter-spacing:0.08em;text-transform:uppercase;color:#6e6e6e">Message</p>',
    `<div style="white-space:pre-wrap;font:400 14px/1.65 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111111;border:1px solid #e6e3dc;border-radius:10px;padding:16px">${e(payload.message)}</div>`,
    '<p style="margin:22px 0 0;font:400 12px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#6e6e6e">Sent from the DevSpark website contact form (devspark.codes). Reply directly to this email to answer the visitor.</p>',
    "</div></body></html>",
  ].join("");
}

export type InquiryEmailOptions = {
  apiKey?: string | undefined;
  from?: string | undefined;
  to?: string | undefined;
  endpoint?: string | undefined;
};

/**
 * Sends one inquiry to the configured inbox.
 *
 * Returns `{ ok: true, id }` only when the provider both accepted the
 * request (HTTP 2xx) and returned the expected `{ id }` shape — Resend's
 * acceptance, not a guarantee of final inbox delivery. Every failure path
 * returns a coarse reason so the route can answer with a safe message.
 */
export async function sendInquiryEmail(
  payload: InquiryPayload,
  options: InquiryEmailOptions = {}
): Promise<SendResult> {
  const apiKey = options.apiKey ?? process.env.RESEND_API_KEY;
  const from = options.from ?? process.env.CONTACT_FROM_EMAIL;
  const to = options.to ?? process.env.CONTACT_TO_EMAIL;
  const endpoint = options.endpoint ?? process.env.RESEND_API_URL ?? DEFAULT_ENDPOINT;

  if (!apiKey || !from || !to) return { ok: false, reason: "config" };

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject: buildInquirySubject(payload),
        text: buildInquiryText(payload),
        html: buildInquiryHtml(payload),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    const name = error instanceof Error ? error.name : "";
    if (name === "TimeoutError" || name === "AbortError") {
      return { ok: false, reason: "timeout" };
    }
    return { ok: false, reason: "network" };
  }

  if (!response.ok) {
    // 401/403/422 mean the credentials or the sending domain are wrong —
    // a configuration problem the visitor can only work around by email.
    if (
      response.status === 401 ||
      response.status === 403 ||
      response.status === 422
    ) {
      return { ok: false, reason: "config", status: response.status };
    }
    if (response.status === 429) {
      return { ok: false, reason: "rate", status: response.status };
    }
    return { ok: false, reason: "provider", status: response.status };
  }

  // Validate the expected shape. A 2xx without an `id` is not an acceptance
  // we can report as success.
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return { ok: false, reason: "unexpected", status: response.status };
  }
  const id = (body as { id?: unknown } | null)?.id;
  if (typeof id !== "string" || id.length === 0) {
    return { ok: false, reason: "unexpected", status: response.status };
  }

  return { ok: true, id };
}
