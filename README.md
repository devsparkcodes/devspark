# DevSpark Website

Public website for **DevSpark** — a technology company working on AI-powered solutions, workflow automation and custom software, with practical AI education as one of its business verticals.

- **Production site:** https://devsparkcodes.vercel.app
- **Repository:** https://github.com/devsparkcodes/devspark
- **Current course offering:** Generative AI Engineering — Level 01, Cohort 01

This README is the entry point for contributors and coding agents. Detailed documentation lives under [`docs/`](docs/README.md).

## Project Overview

DevSpark is a company first; education is one vertical of it. The website presents the company, its proposed solution areas, and the current course — and routes visitors to two real actions: **discussing a project** (contact form) and **registering interest / free-demo participation** (published Google Form).

The website itself is a static, public marketing site. It has no login, no database and no payment processing:

- **Course enrollment** happens outside the site through one published Google Form, centralized in `config/site.ts`.
- **Paid enrollment and payment verification** are manual (spreadsheet + instructor verification), not website features.
- **The contact form** is the only dynamic endpoint (`POST /api/contact` → Resend).

## Features

All implemented and verified in the codebase:

| Area | What exists |
|---|---|
| Pages | Home (`/`), Solutions (`/solutions`), Courses (`/courses`), About (`/about`), Help Center (`/guides`), Contact (`/contact`), branded 404 |
| Redirect | `/faq` permanently redirects (`308`) to `/guides` (configured in `next.config.ts`) |
| Curriculum | Interactive 8-week / 24-class outline on `/courses` with per-week disclosure panels (class dates, topics, practical activity, assessments) |
| Homepage timeline | Cohort countdown/timeline derived from the same curriculum data |
| Registration CTAs | Live links to the published Google Form (`https://forms.gle/xpjhjQgRXKfnbJds9`); pending notes hide automatically when the URL is set |
| Contact form | Validated, rate-limited, duplicate-protected submissions forwarded to Resend; success is shown only after the provider accepts — a missing configuration returns an honest `503` notice, never a fake success |
| Help Center | Searchable, filterable guides (four categories, twelve guides) with accordion disclosures |
| Course policies | Published: fees, early-bird rules, 100-point assessment, attendance/certificate criteria, Top Three Awards, cancellation and refund terms |
| SEO | Per-page metadata via `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts` (activated when `NEXT_PUBLIC_SITE_URL` is set) |
| Security | Content-Security-Policy and baseline security headers for every route (`next.config.ts`) |
| Accessibility | Skip link, keyboard navigation, visible focus, ARIA on menus/disclosures, `prefers-reduced-motion` support, contrast-checked tokens |

## Technology Stack

Verified versions from `package.json`:

| Layer | Choice |
|---|---|
| Framework | Next.js 16.4 (App Router) on React 19.3 |
| Language | TypeScript 5.9 (strict, `tsc --noEmit`) |
| Styling | Tailwind CSS 4.3 with semantic tokens in `app/globals.css` |
| Icons | `@phosphor-icons/react` (deep SSR imports) |
| Fonts | Manrope (headings) + Inter (body) via `next/font`, self-hosted |
| Email | Resend HTTP API, called server-side only from `app/api/contact/route.ts` |
| Linting | ESLint 9 + `eslint-config-next` |
| Hosting | Vercel (Git integration, auto-deploy from `main`) |
| Version control | Git + GitHub |

No test framework is configured. There is no custom backend, database, auth or payment integration.

## Project Structure

```text
app/                    # App Router: pages, API route, SEO files
  api/contact/          # POST /api/contact (validation → Resend)
  courses/ guides/ …    # one folder per route, each exports its metadata
  globals.css           # semantic design tokens + base styles
  layout.tsx            # root layout, fonts, metadata
  sitemap.ts robots.ts  # generated from lib/seo.ts
components/
  layout/               # site header and footer
  sections/             # page sections (hero, program, curriculum-grid, …)
  ui/                   # shared primitives (button, disclosure, page-hero, …)
  motion-reveal.tsx     # scroll-reveal controller
config/
  site.ts               # brand, contact links, Google Form URLs
  navigation.ts         # primary navigation entries
  content.ts            # ALL site copy, course facts, curriculum, FAQs
lib/
  email.ts              # Resend payload + email body builder
  seo.ts                # metadata helpers, canonical/OG URL handling
  utils.ts              # cn() and reveal-delay helpers
logos/                  # official brand assets (kept byte-for-byte)
design-system/          # design-system reference (MASTER.md)
docs/                   # project documentation (start at docs/README.md)
```

`config/content.ts` is the single source of truth for published copy and curriculum — components never hardcode course facts.

## Prerequisites

- **Node.js ≥ 20.9.0** (enforced via the `engines` field in `package.json`)
- npm (lockfile is committed; use `npm ci` for reproducible installs)
- Git

## Installation

```bash
git clone https://github.com/devsparkcodes/devspark.git
cd devspark
npm ci
```

Use `npm install` only when intentionally updating dependencies.

## Local Development

```bash
npm run dev        # development server at http://localhost:3000
```

The contact form works locally only if the required environment variables are configured (see below); without them it returns the honest `503` notice, which is expected behavior.

## Environment Configuration

Copy `.env.example` to `.env.local` and fill in values. **Never commit real values** — `.env*` files are gitignored except `.env.example`. All contact-form variables are server-side only; never prefix them with `NEXT_PUBLIC_`.

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes (for real delivery) | Resend API key (starts with `re_`) |
| `CONTACT_FROM_EMAIL` | Yes (for real delivery) | Verified sender, `Name <address>` format |
| `CONTACT_TO_EMAIL` | No | Destination inbox; defaults to the published site address |
| `RESEND_API_URL` | No (testing only) | Endpoint override for a local mock; leave unset in production |
| `NEXT_PUBLIC_SITE_URL` | No (SEO) | Deployed origin, no trailing slash — enables canonical/Open Graph tags, sitemap and robots |

Setup details and sender rules (including why a Gmail address cannot be a Resend sending domain) are documented in `.env.example` and `docs/05_TECHNICAL_SPECIFICATION.md`.

## Available Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build (also runs TypeScript checking) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint over the repository |
| `npm run typecheck` | Type-check with `tsc --noEmit` |

There is no test script. The standard validation gate before any commit is:

```bash
npm run typecheck && npm run lint && npm run build
```

## Content Management

Almost all editable copy lives in **`config/content.ts`**:

- `hero`, `solutions`, `about`, `faq`, `contact` — homepage and page section copy
- `program` — course facts, audience, outcomes, methodology, materials, assessment, certificate, awards, pricing, FAQs
- `program.weeks` — **the authoritative curriculum**: eight weeks, 24 classes, dates, topics, practical activities and assessment strings
- `helpCenter` — Help Center categories, guides and sections

Site-wide links and brand strings live in `config/site.ts`; navigation entries in `config/navigation.ts`.

### Updating course content safely

1. Edit only `config/content.ts` (and `config/site.ts` for links). Do not hardcode course facts into components.
2. Keep `program.weeks` internally consistent: 8 weeks × 3 classes, dates on the published Monday/Wednesday/Friday schedule, assessment strings in the form `"Assignment 01 — 10 points"`, `"Midterm Project — 15 points"`, `"Final Project — 25 points"`. **Milestone assessments must begin with `Midterm` or `Final`** — the homepage timeline reads that prefix to place its milestone callouts.
3. Assessment points must continue to total 100 (6×10 + 15 + 25).
4. Both `/courses` (`CurriculumGrid`) and the homepage cohort timeline read the same data — never duplicate curriculum copy inside components.
5. Run the validation gate above, then review the rendered `/` and `/courses` pages.

Policy changes (fees, attendance, certificates, awards, refunds, dates) require explicit owner approval — see `docs/04_COURSE_AND_ENROLLMENT.md` before touching them.

## Deployment

- The GitHub repository is connected to **Vercel**; every push to `main` auto-deploys to production (https://devsparkcodes.vercel.app). There is no `vercel.json` — behavior comes from `next.config.ts` and the Vercel project settings.
- Environment variables are configured in the Vercel project settings (Settings → Environment Variables), never in the repository.
- Set `NEXT_PUBLIC_SITE_URL` to the production origin (no trailing slash) so canonical URLs, Open Graph tags, the sitemap and robots are emitted; redeploy after changing it.
- Never force-push to `main`. Commit only intended files with a descriptive message.

## Documentation Index

| Document | Purpose |
|---|---|
| [`docs/README.md`](docs/README.md) | Documentation index and reading order |
| [`docs/01_PROJECT_OVERVIEW.md`](docs/01_PROJECT_OVERVIEW.md) | What DevSpark is, website scope, audiences, journeys |
| [`docs/02_BRAND_AND_DESIGN.md`](docs/02_BRAND_AND_DESIGN.md) | Brand rules, palette, typography, accessibility baseline |
| [`docs/03_WEBSITE_REQUIREMENTS.md`](docs/03_WEBSITE_REQUIREMENTS.md) | Functional and non-functional requirements per page |
| [`docs/04_COURSE_AND_ENROLLMENT.md`](docs/04_COURSE_AND_ENROLLMENT.md) | **Authoritative course policies**: fees, assessment, attendance, certificate, awards, refunds, recordings |
| [`docs/05_TECHNICAL_SPECIFICATION.md`](docs/05_TECHNICAL_SPECIFICATION.md) | Stack, architecture, contact API, secrets, quality gates |
| [`docs/06_UI_UX_SPECIFICATION.md`](docs/06_UI_UX_SPECIFICATION.md) | UI/UX workflow and review checklist |
| [`docs/07_IMPLEMENTATION_ROADMAP.md`](docs/07_IMPLEMENTATION_ROADMAP.md) | Build-phase history and future phases (LMS, products) |
| [`docs/08_OPENCODE_MODEL_SELECTION.md`](docs/08_OPENCODE_MODEL_SELECTION.md) | Coding-agent model selection notes |
| [`docs/AGENTS.md`](docs/AGENTS.md) | Operating rules for AI coding agents |
| [`design-system/devspark/MASTER.md`](design-system/devspark/MASTER.md) | Design tokens, component rules, motion system |

If documentation and implementation disagree, report the conflict — do not silently pick one (per `docs/AGENTS.md`).

## Maintenance and Troubleshooting

- **Before every commit:** `npm run typecheck && npm run lint && npm run build`, then `git diff --check`.
- **Contact form returns 503:** required Resend variables are missing in that environment — expected until real delivery is configured (see `.env.example`).
- **Registration/demo buttons point nowhere:** the Google Form URL is missing from `config/site.ts`; components hide pending notes automatically when it is null.
- **Colors look wrong or hard-coded:** use the semantic tokens in `app/globals.css` (`--color-accent`, `--color-text`, …) — never scatter raw hex values. White on the orange accent fails contrast; use dark text (`#111111`) on orange.
- **Curriculum or course copy changed but a page did not update:** confirm the text lives in `config/content.ts`, not in a component.
- **`/faq` should keep redirecting:** the redirect is defined in `next.config.ts`; do not recreate a `/faq` page.
- **Unknowns** (unconfirmed dates, SLAs, features) stay clearly marked as pending in docs and on the site — never invent them.
