# Website Requirements

## Product objectives
1. Present DevSpark as a technology company (education is one vertical, not the whole identity).
2. Let businesses describe a problem and reach DevSpark through the contact form.
3. Publish the Generative AI Engineering — Level 01, Cohort 01 course: facts, curriculum, policies and registration route.
4. Provide confirmed self-service answers through the Help Center.
5. Stay honest: only confirmed information is published; unknowns stay marked, never invented.

## User roles
- **Prospective client** — explores Solutions, then submits a project inquiry.
- **Prospective learner** — compares course facts and policies, then registers through the Google Form (free demo first or full-course interest).
- **Enrolled student** — attends live sessions; the website is not their classroom (no accounts, no dashboard).
- **Help seeker** — searches the Help Center for confirmed guidance.

## Navigation
Logo → Home (`/`), then **Solutions · Courses · About · Help · Contact**, plus a "Discuss a project" CTA. `Help` points to the Help Center at `/guides`; there are no separate Guides or FAQ navigation entries. The former `/faq` route permanently redirects (`308`) to `/guides` (configured in `next.config.ts`). Do not show Products or empty product cards in V1. Destinations are real routes (`config/navigation.ts`); the active route is exposed with `aria-current`.

## Page requirements

### Home (`/`)
Establish DevSpark's company identity and route visitors to Solutions, Courses or Contact. Implemented sections in order: hero/tagline, Solutions preview, current learning program (facts, cohort timeline and curriculum summary), About/company statement with working principles, FAQ preview, contact CTA and footer. Hero copy is implemented and centralized in `config/content.ts` (`hero`) — revise it there, not in this document.

### Solutions (`/solutions`)
Help businesses contact DevSpark to discuss a problem or requirement. The three areas shown — AI-powered solutions, workflow automation and custom software — are proposed categories, not proof that every service is currently available; availability is confirmed per project. Include a "Discuss a project" CTA. No invented clients, case studies, metrics or guarantees.

### Courses (`/courses`)
Show **Generative AI Engineering — Level 01, Cohort 01** with:

- **Confirmed course facts** (start date, schedule, time, platform, language, fees, free demos, session breakdown) — the on-page "Course at a glance" table.
- **The full 8-week / 24-class curriculum** with per-week disclosures (dates, topics, practical activities, assessments), rendered from `config/content.ts` → `program.weeks`.
- **Audience, prerequisites and learning outcomes**, methodology and learning materials.
- **Assessment, certificate, Top Three Student Awards and refund/cancellation policies**, exactly as published.

Authoritative policy wording lives in `04_COURSE_AND_ENROLLMENT.md`; the page must stay consistent with it. Policy facts on the page include: standard fee PKR 4,000 one-time with Cohort 01 early-bird PKR 3,000 (25% off) for the first 20 verified paid enrollments (the interest form never reserves the offer); assignments released Fridays in Weeks 1, 2, 3, 5, 6 and 7, each due Sunday 11:59 PM PKT with no extensions; midterm project 15 points (Week 4), final project 25 points (Week 8), 100 points total; certificate requires 20/24 attendance (both demos counted) plus 60/100 with all submissions; the Top Three Student Awards require 24/24 attendance; cancellation, course-cancellation and lead-instructor-replacement refund rules per `04_COURSE_AND_ENROLLMENT.md`. Registration runs through the Google Form (`https://forms.gle/xpjhjQgRXKfnbJds9`); paid enrollment and early-bird places are confirmed only after DevSpark verifies payment — a screenshot alone is not proof.

### About (`/about`)
Tell DevSpark's company story; keep the company as the focus. Founder photo may appear as supporting content. No dedicated Founder page.

### Help Center (`/guides`)
Implemented as a client-side Help Center: search across guide titles/summaries/keywords and section content, single-select category filters, and React `Disclosure` accordions (`components/ui/disclosure.tsx`). It ships with four categories and twelve guides covering the website, getting help, solutions/projects, and courses/enrollment. Content answers only from confirmed information; nothing is filler.

### FAQ
There is no standalone FAQ page. The former `/faq` route permanently redirects to the Help Center at `/guides`. The homepage shows a small FAQ preview drawn from `config/content.ts` (`faq`).

### Contact (`/contact`)
Contact form posts to `POST /api/contact`, which validates input, rate-limits, deduplicates, and forwards accepted messages to Resend; email and social links provide alternatives. Success is only shown after the provider confirms acceptance (never faked), and an unconfigured deployment honestly returns a 503 notice. The form has passed mocked tests, and four real contact-form emails were sent through Resend in October 2026 (test-mode sender); production configuration is unconfirmed (see `05_TECHNICAL_SPECIFICATION.md` and `.env.example`).

### 404
Branded not-found page (`app/not-found.tsx`).

## Registration and enrollment flow
1. Visitor opens Courses (or a homepage CTA) and selects a register button.
2. The site opens the published Google Form (`config/site.ts` links; `target="_blank"` with `rel="noopener noreferrer"` and an informative `aria-label`).
3. The form registers interest and free-demo participation; it never confirms paid enrollment and never reserves early-bird pricing.
4. Paid enrollment, payment verification and Google Meet link distribution happen off-site (instructor + spreadsheet) — none of it is a website feature.

## Journeys
- Business: Home → Solutions → Discuss a project → Contact.
- Student: Home/Courses → Program details → Register for a free demo → Google Form.
- Resource visitor: Home → Guides → Read a real resource → next relevant action.

## Non-functional requirements

### Responsive behavior
Intentional layouts for phone, tablet and desktop — not a compressed desktop page. The mobile menu closes on link click and Escape and exposes `aria-expanded`/`aria-controls`. No horizontal scrolling at tested widths (360–1440px).

### Accessibility
Semantic HTML and landmarks, one `h1` per page, sequential headings, skip link as the first tab stop, visible focus rings (2px, 3px offset), labeled form controls, body text ≥ 4.5:1 contrast, meaningful alternative text, `prefers-reduced-motion` honored globally and per effect, keyboard-operable menus/disclosures, touch targets ≥ 44px for icon controls. The orange accent never carries small text on light backgrounds; text on orange is always dark (`#111111`). Details: `02_BRAND_AND_DESIGN.md` and `design-system/devspark/MASTER.md`.

### SEO
Unique `title`/`description` per route via `lib/seo.ts` (`%s — DevSpark` title template), canonical and Open Graph/Twitter tags when `NEXT_PUBLIC_SITE_URL` is set, generated `sitemap.xml` and `robots.txt`. Every page shares a page-specific Open Graph screenshot from `public/og/` (`summary_large_image` card on all routes, homepage included) — static point-in-time captures, refreshed manually (see `05_TECHNICAL_SPECIFICATION.md`). While the variable is unset, absolute-URL metadata is omitted — the site never advertises `localhost` or an invented domain.

### Performance
Static prerendering for all pages, self-hosted fonts via `next/font` (`display: swap`), optimized logo assets, no heavy animation libraries (CSS + one IntersectionObserver reveal controller + a hand-rolled Canvas 2D hero background).

### Security and privacy
Content-Security-Policy and baseline headers (nosniff, referrer policy, frame denial, permissions policy) on every route via `next.config.ts`; `poweredByHeader` disabled. Secrets are server-side only, never committed, never `NEXT_PUBLIC_`. The contact form collects only name, email, category and message — no payment details, no unnecessary personal data. Rate limiting and duplicate-submit protection are applied before forwarding to Resend.

### Maintainability
All copy, curriculum and links live in `config/` (no hardcoded course facts in components). Semantic design tokens in `app/globals.css` — no scattered hex values. TypeScript strict mode, ESLint, and a documented validation gate (`npm run typecheck && npm run lint && npm run build`).

### Deployment
GitHub → Vercel Git integration; every push to `main` auto-deploys. Environment variables are configured in Vercel project settings only. See the root `README.md`.

## Content management
- Copy and curriculum: `config/content.ts`.
- Brand, contact links, Google Form URLs: `config/site.ts`.
- Navigation: `config/navigation.ts`.
- After any content change: run the validation gate and review `/` and `/courses`.
- Course policy wording must be changed only with owner approval and then mirrored between the website and `04_COURSE_AND_ENROLLMENT.md`.

## Known constraints
- No custom backend, database, login, payment gateway, student dashboard or LMS in V1.
- Real contact-form delivery requires Resend credentials in the running environment. They are configured locally (`.env.local`) and four real contact-form emails were sent in October 2026 (test-mode sender); production configuration is unconfirmed. The form is honest about a missing configuration with a 503 notice.
- No custom domain yet (HSTS deliberately not set until the domain and HTTPS deployment are confirmed — see `next.config.ts`).
- No automated test suite; quality relies on typecheck, lint, build and manual QA.
- Downloadable slide/PDF files are not promised to students; session recordings ARE provided to enrolled students (see `04_COURSE_AND_ENROLLMENT.md`).

## Integrity
Never invent company history, testimonials, accreditation, client results, pricing, dates or partnerships. Do not claim government accreditation. Do not present future services as currently available.
