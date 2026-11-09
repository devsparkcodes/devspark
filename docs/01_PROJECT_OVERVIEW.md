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

## Audiences
1. **Businesses and individuals** with a problem to solve — routed to Solutions and the contact form.
2. **Learners** (students, professionals, complete beginners) interested in the Generative AI Engineering program — routed to Courses and the Google Form.
3. **Returning visitors** looking for help, policies or guides — routed to the Help Center at `/guides`.

## Website goals
1. Explain DevSpark's identity and direction.
2. Help businesses contact DevSpark to discuss solutions.
3. Present the current Generative AI Engineering program.
4. Send learners to a Google Form for enrollment.
5. Provide useful FAQs and guides/resources.
6. Leave room for future services and products.

## Current course offering
**Generative AI Engineering — Level 01, Cohort 01**: an 8-week, 24-session beginner program delivered live on Google Meet in Urdu (with English technical terminology), starting Monday, November 30, 2026. The first two sessions are free demos; the standard fee is PKR 4,000 with a Cohort 01 early-bird fee of PKR 3,000 for the first 20 verified paid enrollments. The full curriculum, assessment (100 points), certificate criteria, awards and refund rules are published on `/courses` and documented authoritatively in `04_COURSE_AND_ENROLLMENT.md`. Session recordings are provided to enrolled students so missed lessons can be reviewed; watching a recording does not count as live attendance.

## User journeys
- **Business:** Home → Solutions → Discuss a project → Contact form.
- **Student:** Home or Courses → review facts, curriculum and policies → Register for a free demo → published Google Form → (optional) paid enrollment verified off-site by the instructor.
- **Resource visitor:** Home → Help (`/guides`) → read a confirmed guide → next relevant action (contact, courses, registration).

## High-level technical architecture
- Next.js App Router + TypeScript + Tailwind CSS; six static pages plus one dynamic endpoint (`POST /api/contact`).
- All published copy and the curriculum live in `config/content.ts`; brand and links in `config/site.ts`; navigation in `config/navigation.ts`. Components read these files and never hardcode course facts.
- The contact form validates, rate-limits and deduplicates submissions server-side, then forwards them to the Resend HTTP API; success is shown only after provider acceptance.
- Design tokens (color, type scale, motion) are centralized in `app/globals.css`; see `design-system/devspark/MASTER.md`.
- Deployment: GitHub → Vercel auto-deploy from `main`. No database, no authentication, no payment processing.

Detailed technical documentation: `05_TECHNICAL_SPECIFICATION.md`.

## V1 scope
Implemented: responsive public website with Home (`/`), Solutions (`/solutions`), Courses (`/courses`), About (`/about`), Contact (`/contact`) and the Help Center at `/guides` (four categories, twelve guides). The former `/faq` route permanently redirects (`308`) to `/guides`; header navigation labels it **Help** (there are no separate Guides and FAQ entries). Also included: contact form (`POST /api/contact` → Resend, mock-tested), email and social links, centralized design tokens, purposeful motion, SEO basics, and accessibility/performance checks. Registration runs through the published Google Form (`https://forms.gle/xpjhjQgRXKfnbJds9`) wired centrally in `config/site.ts`; the registration CTAs are live links and the pending notes hide automatically.

Not included: custom backend/database, login/student dashboard, payment gateway, automated payment verification, custom LMS, certificate verification, or a live Products section.

## Success criteria
- Company-first identity is clear.
- Solutions and Courses are easy to find.
- Contact and enrollment journeys work.
- Site is polished, responsive, accessible, fast and maintainable.
- Colors/fonts can be changed centrally.

## Verified integrations
- **Google Form** (registration of interest + free-demo participation): `https://forms.gle/xpjhjQgRXKfnbJds9` (`config/site.ts` links).
- **Resend** for contact-form email delivery: wired in `app/api/contact/route.ts` + `lib/email.ts`; mock-tested, and four real contact-form emails were sent through Resend in October 2026 (test-mode sender, delivered to the account owner's inbox). Credentials are configured in local `.env.local`; production configuration is unconfirmed (`05_TECHNICAL_SPECIFICATION.md`, `.env.example`).
- **Vercel** hosting with the GitHub integration; production origin `https://devsparkcodes.vercel.app`.
- **Contact email** `devspark.codes@gmail.com`; social LinkedIn/Instagram/GitHub `devsparkcodes` (`config/site.ts`). Facebook: not configured.

## Resolved (implemented in code)
- Course facts published on `/courses`: 8 weeks · 24 live sessions (2 free demos + 22 paid sessions), Mon/Wed/Fri 7:30–9:30 PM Pakistan Standard Time, starts Monday, November 30, 2026, first paid session Friday, December 4, 2026, final scheduled session Friday, January 22, 2027 (if uninterrupted), teaching platform Google Meet (confirmed; joining details shared privately with confirmed students), fee PKR 4,000 one-time standard with Cohort 01 introductory early-bird PKR 3,000 (25% off) for the first 20 confirmed paid enrollments, first two sessions free (Nov 30 + Dec 2, 2026), teaching language Urdu with English technical terminology, presentation-led teaching using structured slides with optional Excalidraw visuals, live practical demonstrations, guided activities and interactive Q&A (downloadable slide or PDF files not promised; session recordings ARE provided to enrolled students), the full revised 8-week curriculum and 100-point assessment, assignment deadline (each of the six released Fridays, due Sunday 11:59 PM PKT).
- Certificate: DevSpark Certificate of Completion confirmed for students who meet the course requirements; digital certificate verification is not currently available — the eligibility rules are final, while the verification feature is on hold for a future phase.
- Logo assets: header `logos/Full logo/black-devspark.png`, footer/dark `logos/Full logo/white-devspark.png`, favicon `app/icon.svg` (rendered via `components/ui/logo.tsx`).
- Brand accent: `#F58220` (semantic tokens in `app/globals.css`; see `design-system/devspark/MASTER.md`).
- Headings font Manrope, body/UI Inter (`next/font`).

## TBD
Do not invent the remaining details:
- Domain name (site currently lives on the Vercel-assigned origin).
- Verified current services for the Solutions page.
- Exact midterm and final project submission dates (the policy is final — dates are announced in advance through the official course schedule).
- Certificate online verification feature (eligibility criteria are final; the digital verification tool is on hold for a future phase).
- Approval-decision turnaround for instructor-replacement and student-cancellation refund requests (the request windows and the 14-calendar-day processing after approval are confirmed).
- Attendance-recording method (an internal operational process; the published 20-of-24 rule with both free demos counted is final).
- Website-side paid-enrollment/payment processing (not a V1 feature and not claimed on the site).
- Founder photo asset.

Confirmed and no longer TBD: first paid session date (Friday, December 4, 2026, 7:30 PM PKT), student cancellation procedure (email to devspark.codes@gmail.com, PKT receipt timestamp, 100% of the fee actually paid before the deadline, 14-day refund after approval), refunds if DevSpark cancels the course (14 days after the official notice), the lead-instructor-replacement refund policy including its request window (any time while the course is ongoing; not accepted after the course officially ends, subject to applicable legal rights), standard competition ranking for tied award scores (ranks 1–3 win; joint ranks can exceed three recipients), and the 5-calendar-day review decision window.

## References
- Course policies: `04_COURSE_AND_ENROLLMENT.md`
- Technical architecture and secrets: `05_TECHNICAL_SPECIFICATION.md`
- Requirements per page: `03_WEBSITE_REQUIREMENTS.md`
- Setup, commands, deployment: [`../README.md`](../README.md)
