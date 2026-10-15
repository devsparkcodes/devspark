# Project Overview

## Vision
DevSpark is intended to grow into a technology company and product brand that solves real-world problems. Potential future areas include AI solutions, automation, software development and DevSpark-owned products. Education is one business vertical, not the entire company identity. The website must present DevSpark as a company, not merely an online institute or personal portfolio.

## Brand
- Name: **DevSpark**
- Tagline: **Building AI Solutions**
- Tone: professional, modern, user-friendly.
- Theme: light for V1.
- No strict age range for learners.
- A founder photo may appear, but there is no dedicated Founder page.

## Website goals
1. Explain DevSpark’s identity and direction.
2. Help businesses contact DevSpark to discuss solutions.
3. Present the current Generative AI Engineering program.
4. Send learners to a Google Form for enrollment.
5. Provide useful FAQs and guides/resources.
6. Leave room for future services and products.

## V1 scope
Implemented: responsive public website with Home (`/`), Solutions (`/solutions`), Courses (`/courses`), About (`/about`), Contact (`/contact`) and the Help Center at `/guides` (four categories, twelve guides). The former `/faq` route permanently redirects (`308`) to `/guides`; header navigation labels it **Help** (there are no separate Guides and FAQ entries). Also included: contact form (`POST /api/contact` → Resend, mock-tested), email and social links, centralized design tokens, purposeful motion, SEO basics, and accessibility/performance checks. Registration runs through the published Google Form (`https://forms.gle/xpjhjQgRXKfnbJds9`) wired centrally in `config/site.ts`; the registration CTAs are live links and the pending notes hide automatically.

Not included: custom backend/database, login/student dashboard, payment gateway, automated payment verification, custom LMS, certificate verification, or a live Products section.

## Success criteria
- Company-first identity is clear.
- Solutions and Courses are easy to find.
- Contact and enrollment journeys work.
- Site is polished, responsive, accessible, fast and maintainable.
- Colors/fonts can be changed centrally.

## TBD
Domain; verified current services; meeting platform and subscription; midterm/final project submission deadlines; certificate criteria and online verification; top-three award terms; paid-enrollment/payment process; founder photo asset. Do not invent these details.

## Resolved (implemented in code)
- Google Form (registration of interest + free-demo participation): `https://forms.gle/xpjhjQgRXKfnbJds9` (`config/site.ts` links).
- Course facts published: 8 weeks · 24 live sessions, Mon/Wed/Fri 7:30–9:30 PM Pakistan Standard Time, starts Monday, November 30, 2026, fee PKR 4,000 one-time, first two sessions free (Nov 30 + Dec 2, 2026), teaching language Urdu, full 8-week curriculum and 100-point assessment, assignment deadline (each of the six released Fridays, due Sunday 11:59 PM PKT).
- Logo assets: header `logos/Full logo/black-devspark.png`, footer/dark `logos/Full logo/white-devspark.png`, favicon `app/icon.svg` (rendered via `components/ui/logo.tsx`).
- Brand accent: `#F58220` (semantic tokens in `app/globals.css`; see `design-system/devspark/MASTER.md`).
- Contact email `devspark.codes@gmail.com`; social LinkedIn/Instagram/GitHub `devsparkcodes` (`config/site.ts`). Facebook: not configured.
- Contact form: operational via `POST /api/contact` → Resend. Mock-tested; real email delivery NOT yet verified (needs credentials + verified sender — `docs/05`, `.env.example`).
- Headings font Manrope, body/UI Inter (`next/font`).
