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
  layout.tsx            # root layout: fonts, metadata template, reveal boot
  page.tsx              # Home
  globals.css           # semantic design tokens + base/reveal styles
  solutions/
  courses/
  about/
  guides/               # Help Center (/guides)
  contact/
  api/contact/          # POST /api/contact route handler
  not-found.tsx         # branded 404
  sitemap.ts            # generated sitemap (needs NEXT_PUBLIC_SITE_URL)
  robots.ts             # generated robots.txt
  icon.svg              # favicon
components/
  layout/               # site header + footer
  sections/             # page sections (hero, program, curriculum-grid, …)
  ui/                   # shared primitives (button, disclosure, page-hero, …)
  motion-reveal.tsx     # scroll-reveal controller (per-navigation effect)
config/
  site.ts               # brand, contact links, Google Form URLs
  navigation.ts         # primary navigation entries
  content.ts            # all site copy, course facts, curriculum, FAQs
lib/
  email.ts              # Resend payload + HTML/text email builder
  seo.ts                # metadata helpers, canonical/OG URLs, siteUrl
  utils.ts              # cn() class merger, reveal-delay helper
logos/                  # official brand assets (kept byte-for-byte)
public/                 # static assets
design-system/          # design-system reference (devspark/MASTER.md)
docs/                   # project documentation
```
(`/faq` is not a route; it is a permanent `308` redirect to `/guides` configured in `next.config.ts`.)

## Contact form (implemented)
`POST /api/contact` (App Router route handler, `app/api/contact/route.ts`) validates the payload (name, email, category, message), applies layered rate limiting and per-visitor duplicate-submit detection, then forwards accepted messages to the **Resend** HTTP API via `lib/email.ts`. The client (`components/sections/contact-form.tsx`) only shows success after the provider confirms acceptance.

Response contract: `400` validation · `409` duplicate · `429` rate-limited · `503` not configured · `502` provider failure · `{ok:true}` on success. While the required environment variables are missing, submissions are honestly rejected with a 503 notice — success is never faked.

**Testing status:** verified against a local mock Resend provider (validation, dedup, rate limiting, provider failure/timeout, unconfigured state). **Real email delivery has NOT been verified** — that requires a real `RESEND_API_KEY` and a verified sender (see Secrets).

## Google Form
Registration URL published: `https://forms.gle/xpjhjQgRXKfnbJds9`. Centralized in `config/site.ts` (`links.enrollmentFormUrl` and `links.demoFormUrl`, both set to the same form); enrollment controls render live links and the pending notes hide automatically, so no broken link can be published. The form itself covers registration of interest and free-demo participation — it does not confirm paid enrollment.

## Open Graph screenshots
Social previews use real page screenshots, not a generated graphic. Each route's metadata (`pageMetadata` in `lib/seo.ts`, plus the root layout for the homepage) points at its own file in `public/og/` (`home.png`, `courses.png`, `solutions.png`, `about.png`, `guides.png`, `contact.png` — all 1200×630 PNG). There is deliberately no shared generic image and no `app/opengraph-image.tsx`: Next.js file-based metadata and exported `openGraph.images` compete, so a single source of truth (the metadata export) is used instead.

These PNGs are **static point-in-time captures** — they are not regenerated when a page changes or when a crawler requests them. To refresh after a significant visual change:

1. Build and serve the latest code locally (`npm run build && npm run start`).
2. With any Chromium-based browser tooling (e.g. Playwright), open each route at a **1200×630** viewport, wait for fonts/animations to settle (emulating `prefers-reduced-motion: reduce` avoids mid-reveal frames), and capture the viewport (no browser chrome) over `public/og/<route>.png`.
3. Keep filenames aligned with routes; confirm each image is 1200×630 and visually shows the matching page's main heading.
4. Run the standard quality gate and commit the updated PNGs with the change that motivated the refresh.

No screenshot service, runtime capture, or extra dependency is used.

## Quality gates
TypeScript checks, lint and production build pass; routes/CTAs work; no broken assets or console errors; mobile/tablet/desktop checked; keyboard/focus/contrast/reduced motion reviewed; performance and metadata checked; images/fonts/3D optimized. Standard pre-commit gate: `npm run typecheck && npm run lint && npm run build`.

## Security headers
`next.config.ts` applies a Content-Security-Policy and baseline headers to every route: `default-src 'self'`, self-hosted fonts/scripts/styles, `object-src 'none'`, `frame-ancestors 'none'` + `X-Frame-Options: DENY`, `nosniff`, strict-origin referrer policy and a restrictive permissions policy (camera, microphone, geolocation, payment disabled). `poweredByHeader` is off. HSTS is deliberately not set until the production domain and HTTPS deployment are confirmed (an unverified host must not pin browsers to HTTPS). `'unsafe-eval'` appears only in the development policy for the dev server's HMR runtime.

## Secrets and environment
Server-side only, set in the deployment platform (e.g. Vercel → Settings → Environment Variables), never committed:
- `RESEND_API_KEY` (required) — Resend API key.
- `CONTACT_FROM_EMAIL` (required) — verified sender, `Name <address>`.
- `CONTACT_TO_EMAIL` (optional) — destination inbox; defaults to the published address.
- `RESEND_API_URL` (optional, testing only) — endpoint override for a local mock; leave unset in production.

`.env.example` documents these without secrets; `.env*` is gitignored (except `.env.example`). Never use a `NEXT_PUBLIC_` prefix for these. A Gmail address cannot be verified as a Resend sending domain — use Resend test mode or a domain you control.

## Deployment
Current workflow (already established):
1. Push to `main` on GitHub — the Vercel Git integration builds and auto-deploys to production (https://devsparkcodes.vercel.app). There is no `vercel.json`; behavior comes from `next.config.ts` and project settings.
2. Configure environment variables in Vercel (Settings → Environment Variables) — names only, never committed; see Secrets above.
3. Set `NEXT_PUBLIC_SITE_URL` to the production origin (no trailing slash) and redeploy so canonical URLs, Open Graph tags, sitemap and robots activate.
4. Verify production links, metadata, responsive layout and integrations after each deploy.
5. Add a custom domain when chosen (TBD) — re-check HSTS at that point (see Security headers).
Do not force-push; do not commit or push unless explicitly authorized.
