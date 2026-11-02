# AGENTS.md — DevSpark Website

## Mission
Build the DevSpark public website as a technology-company brand focused on real-world solutions. Education is one business vertical, not the company's whole identity.

## Read first
Before implementing anything:
1. The repository root [`README.md`](../README.md) — setup, commands, deployment, content-management workflow.
2. This folder's index [`README.md`](README.md) and documents `01` through `08`, in order.
3. [`design-system/devspark/MASTER.md`](../design-system/devspark/MASTER.md) for design tokens and component rules.

If docs conflict with each other or with the implementation, report the conflict and ask; do not silently choose.

## Repository purpose and shape
A static public marketing site (Next.js App Router) with one dynamic endpoint: `POST /api/contact` → Resend. Pages: Home, Solutions, Courses, About, Help Center (`/guides`), Contact, plus a branded 404; `/faq` is a permanent `308` redirect to `/guides`. There is no database, auth, payment or LMS. Full structure: root `README.md` → Project Structure.

## Confirmed constraints
- Next.js + TypeScript + Tailwind CSS.
- GitHub + Vercel (push to `main` auto-deploys production).
- OpenCode; UI UX Pro Max is a helper, not source of truth.
- Light theme for V1.
- Brand: DevSpark. Tagline: "Building AI Solutions".
- Professional, modern, user-friendly.
- Show Solutions and Courses; do not show a live Products section/product cards in V1.
- No custom backend, database, login, payment gateway, student dashboard or LMS in V1.
- Course enrollment uses the published Google Form URL centralized in `config/site.ts` (`https://forms.gle/xpjhjQgRXKfnbJds9`).
- Colors/fonts are provisional and centrally configurable.
- Founder photo may appear; no Founder page.
- Premium visual quality and purposeful animation/possible 3D, without sacrificing performance/accessibility.
- Do not commit or push without explicit authorization.

## Architecture rules
- All published copy, course facts and the curriculum live in `config/content.ts`; brand and links in `config/site.ts`; navigation in `config/navigation.ts`. Components read these files — never hardcode course facts, dates, fees or policy text in components.
- Keep design tokens centralized in `app/globals.css`. Do not scatter hard-coded color/typography values; white text on the orange accent fails contrast and is never used (dark text on orange only).
- Reuse existing shared components (`components/ui/*`, `components/sections/*`) instead of creating parallel implementations.
- The contact flow must stay honest: success is shown only after the provider accepts the submission; a missing configuration returns the `503` notice — never fake success.
- Route metadata goes through `lib/seo.ts` (`pageMetadata`); secrets stay server-side and are never prefixed `NEXT_PUBLIC_`.

## Content and course rules
- Never invent services, client results, testimonials, certifications/accreditation, prices, dates, contact details, course facts or URLs. Unknowns stay marked as TBD/pending — do not resolve them by guessing.
- `docs/04_COURSE_AND_ENROLLMENT.md` is the authoritative policy document (fees, assessment, attendance, certificate, awards, refunds, recordings). Website copy must match it; policy wording changes require owner approval.
- Curriculum edits happen only in `config/content.ts` → `program.weeks`: 8 weeks × 3 classes, dates on the published Mon/Wed/Fri schedule, assessment strings like `"Assignment 01 — 10 points"`, and milestone assessments must start with `Midterm` or `Final` (the homepage timeline reads that prefix). Points must total 100 (6×10 + 15 + 25).
- Confirmed facts that must not be contradicted anywhere: session recordings are provided to enrolled students (no invented platform, deadline, downloads or lifetime access; recordings do not count as live attendance); the December 25, 2026 and January 1, 2027 classes proceed normally; Free Demo 02 is "Artificial Intelligence & Machine Learning | Part 1" (Prompt Engineering is Week 04).
- Do not create filler pages, placeholder sections or dead links. Do not add a visible Products section.

## Validation requirements
Before reporting any change complete, run and report the actual results of:
```bash
npm run typecheck
npm run lint
npm run build
```
For documentation-only changes, additionally verify relative Markdown links resolve and `git diff --check` passes. Never claim a check passed unless it was executed.

## Git workflow and commit boundaries
- Inspect `git status` and the full diff before committing; stage only intended files.
- Use focused, descriptive commit messages; never combine unrelated changes in one commit.
- Never force-push, reset, amend unrelated commits or overwrite remote changes.
- Be aware: every push to `main` deploys to production (https://devsparkcodes.vercel.app). Do not push unverified work.
- Commit or push only with explicit authorization for the current task.

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

## Documentation maintenance
- Keep `docs/` consistent with the implementation and with `config/` content; when you change behavior or confirmed facts, update the affected document in the same task (unless the task explicitly limits scope).
- Preserve document roles: root `README.md` = entry point; `docs/01`–`08` = detailed reference; `docs/04` = course policies; `docs/AGENTS.md` (this file) = operating rules for coding agents.
- Do not duplicate long content across documents — link to the authoritative one.

## QA responsibilities
- Routine work: verify routes, CTAs, keyboard/focus behavior, responsive layout and reduced motion for the areas you touched.
- A full-site QA pass uses the custom `website-qa` skill; run it only when the user asks for the QA phase, and never claim it has been executed otherwise.

## Completion checklist
- Docs and implementation agree.
- No fake claims or broken placeholder URLs.
- No visible Products section in V1.
- Enrollment CTA uses verified Google Form URL.
- Contact flow is genuinely configured or not presented as functional.
- Course copy matches `docs/04` (recordings, holidays, fees, assessment, attendance unchanged).
- Responsive/accessibility/reduced-motion checks done.
- Lint, TypeScript checks and production build pass.
- Unresolved items are reported.
