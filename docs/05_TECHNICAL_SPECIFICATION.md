# Technical Specification

## Confirmed stack
- Next.js (App Router) + TypeScript + Tailwind CSS
- Git + GitHub
- Vercel deployment
- OpenCode coding agent
- UI UX Pro Max skill as a design assistant, not source of truth

Installed versions (record in `package.json`): Next.js 16.4, React 19.3, Tailwind CSS 4.3, TypeScript 5.9, ESLint 9. Scripts: `dev`, `build`, `start`, `lint`, `typecheck`.

## Architecture
- Primarily public/static website; use Next.js App Router unless a documented reason says otherwise.
- Reusable components and consistent layout.
- Centralized content/config for links and frequently changed details.
- Semantic design tokens for color, typography, spacing and motion.
- Future products can be added later but must not appear in V1.
- No custom backend/database, login, payment gateway, student dashboard or LMS without new approval.

Actual structure:
```text
app/
  layout.tsx
  page.tsx              # Home
  solutions/
  courses/
  about/
  guides/               # Help Center (/guides)
  contact/
  api/contact/          # POST /api/contact route handler
  not-found.tsx         # branded 404
  icon.svg              # favicon
components/
  layout/
  sections/
  ui/
config/
  site.ts
  navigation.ts
  content.ts
lib/
  email.ts              # Resend payload + HTML/text email builder
logos/                  # official brand assets (kept byte-for-byte)
public/
design-system/
docs/
```
(`/faq` is not a route; it is a permanent `308` redirect to `/guides` configured in `next.config.ts`.)

## Contact form (implemented)
`POST /api/contact` (App Router route handler, `app/api/contact/route.ts`) validates the payload (name, email, category, message), applies layered rate limiting and per-visitor duplicate-submit detection, then forwards accepted messages to the **Resend** HTTP API via `lib/email.ts`. The client (`components/sections/contact-form.tsx`) only shows success after the provider confirms acceptance.

Response contract: `400` validation · `409` duplicate · `429` rate-limited · `503` not configured · `502` provider failure · `{ok:true}` on success. While the required environment variables are missing, submissions are honestly rejected with a 503 notice — success is never faked.

**Testing status:** verified against a local mock Resend provider (validation, dedup, rate limiting, provider failure/timeout, unconfigured state). **Real email delivery has NOT been verified** — that requires a real `RESEND_API_KEY` and a verified sender (see Secrets).

## Google Form
Registration URL published: `https://forms.gle/xpjhjQgRXKfnbJds9`. Centralized in `config/site.ts` (`links.enrollmentFormUrl` and `links.demoFormUrl`, both set to the same form); enrollment controls render live links and the pending notes hide automatically, so no broken link can be published. The form itself covers registration of interest and free-demo participation — it does not confirm paid enrollment.

## Quality gates
TypeScript checks, lint and production build pass; routes/CTAs work; no broken assets or console errors; mobile/tablet/desktop checked; keyboard/focus/contrast/reduced motion reviewed; performance and metadata checked; images/fonts/3D optimized.

## Secrets and environment
Server-side only, set in the deployment platform (e.g. Vercel → Settings → Environment Variables), never committed:
- `RESEND_API_KEY` (required) — Resend API key.
- `CONTACT_FROM_EMAIL` (required) — verified sender, `Name <address>`.
- `CONTACT_TO_EMAIL` (optional) — destination inbox; defaults to the published address.
- `RESEND_API_URL` (optional, testing only) — endpoint override for a local mock; leave unset in production.

`.env.example` documents these without secrets; `.env*` is gitignored (except `.env.example`). Never use a `NEXT_PUBLIC_` prefix for these. A Gmail address cannot be verified as a Resend sending domain — use Resend test mode or a domain you control.

## Deployment
1. Build/test locally.
2. Initialize Git and create GitHub repository.
3. Connect repository to Vercel.
4. Deploy preview and inspect.
5. Add custom domain when chosen (TBD).
6. Verify production links, metadata, responsive layout and integrations.
Do not commit or push unless explicitly authorized.
