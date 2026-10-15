# AGENTS.md — DevSpark Website

## Mission
Build the DevSpark public website as a technology-company brand focused on real-world solutions. Education is one business vertical, not the company’s whole identity.

## Read first
Read `README.md` and documents `01` through `08` before implementation. If docs conflict, report the conflict and ask; do not silently choose.

## Confirmed constraints
- Next.js + TypeScript + Tailwind CSS.
- GitHub + Vercel.
- OpenCode; UI UX Pro Max is a helper, not source of truth.
- Light theme for V1.
- Brand: DevSpark. Tagline: “Building AI Solutions”.
- Professional, modern, user-friendly.
- Show Solutions and Courses; do not show a live Products section/product cards in V1.
- No custom backend, database, login, payment gateway, student dashboard or LMS in V1.
- Course enrollment uses the published Google Form URL centralized in `config/site.ts` (`https://forms.gle/xpjhjQgRXKfnbJds9`).
- Colors/fonts are provisional and centrally configurable.
- Founder photo may appear; no Founder page.
- Premium visual quality and purposeful animation/possible 3D, without sacrificing performance/accessibility.
- Do not commit or push without explicit authorization.

## Integrity rules
Never invent services, client results, testimonials, certifications/accreditation, prices, dates, contact details, course facts or URLs. Unknowns remain TBD. Do not fake a working contact form or show success unless submission succeeded. Never expose secrets in source/Git. Do not add unapproved services or Products to visible V1. Do not create filler pages.

## Task protocol
1. Inspect repository and relevant docs.
2. State goal, intended files and assumptions.
3. Make focused changes.
4. Reuse components/tokens.
5. Run relevant checks.
6. Report changed files, checks/results and unresolved issues.
7. Stop at phase boundaries for user review.

## Design protocol
Start with a reviewed homepage concept. Keep tokens centralized. Respect responsive layouts, keyboard accessibility, contrast and reduced motion. Optimize assets. Prefer one purposeful visual concept over many distracting effects.

## Completion checklist
- Docs and implementation agree.
- No fake claims or broken placeholder URLs.
- No visible Products section in V1.
- Enrollment CTA uses verified Google Form URL.
- Contact flow is genuinely configured or not presented as functional.
- Responsive/accessibility/reduced-motion checks done.
- Lint, TypeScript checks and production build pass.
- Unresolved items are reported.
