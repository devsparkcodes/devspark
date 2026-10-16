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
Domain; verified current services; midterm/final project submission deadlines (announced in advance through the official course schedule); certificate online verification (certificate provision and eligibility criteria are confirmed — 80% attendance of 24 sessions including both demos, and 60/100 — while the digital issuance workflow belongs to the future LMS); instructor-replacement refund request window and approval SLA; cancellation refund approval turnaround; attendance-tracking method for the free demos; website-side paid-enrollment/payment processing; founder photo asset. Confirmed and no longer TBD: first paid class date (Friday, December 4, 2026, 7:30 PM PKT), student cancellation procedure (email to devspark.codes@gmail.com, PKT receipt timestamp, 14-day refund after approval), refunds if DevSpark cancels the course (14 days after the official notice), the lead-instructor-replacement refund policy, standard competition ranking for tied award scores (ranks 1–3 win; joint ranks can exceed three recipients), and the 5-calendar-day review decision window. Do not invent the remaining details.

## Resolved (implemented in code)
- Google Form (registration of interest + free-demo participation): `https://forms.gle/xpjhjQgRXKfnbJds9` (`config/site.ts` links).
- Course facts published: 8 weeks · 24 live sessions (2 free demos + 22 paid sessions), Mon/Wed/Fri 7:30–9:30 PM Pakistan Standard Time, starts Monday, November 30, 2026, first paid class Friday, December 4, 2026, final scheduled session Friday, January 22, 2027 (if uninterrupted), teaching platform Google Meet (confirmed; joining details shared privately with confirmed students), fee PKR 4,000 one-time standard with Cohort 01 introductory early-bird PKR 3,000 (25% off) for the first 20 confirmed paid enrollments, first two sessions free (Nov 30 + Dec 2, 2026), teaching language Urdu with English technical terminology, presentation-led teaching using structured slides with optional Excalidraw visuals, live practical demonstrations and interactive Q&A (slide/PDF files not promised), full 8-week curriculum and 100-point assessment, assignment deadline (each of the six released Fridays, due Sunday 11:59 PM PKT).
- Certificate: DevSpark Certificate of Completion confirmed for students who meet the course requirements; digital issuance/verification (IDs, QR) planned with the future LMS.
- Logo assets: header `logos/Full logo/black-devspark.png`, footer/dark `logos/Full logo/white-devspark.png`, favicon `app/icon.svg` (rendered via `components/ui/logo.tsx`).
- Brand accent: `#F58220` (semantic tokens in `app/globals.css`; see `design-system/devspark/MASTER.md`).
- Contact email `devspark.codes@gmail.com`; social LinkedIn/Instagram/GitHub `devsparkcodes` (`config/site.ts`). Facebook: not configured.
- Contact form: operational via `POST /api/contact` → Resend. Mock-tested; real email delivery NOT yet verified (needs credentials + verified sender — `docs/05`, `.env.example`).
- Headings font Manrope, body/UI Inter (`next/font`).
