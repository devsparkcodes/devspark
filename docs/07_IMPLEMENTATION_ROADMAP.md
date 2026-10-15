# Implementation Roadmap

## Rules
Work in small phases. Inspect docs/repository before acting. State intended files and assumptions. Run checks after changes. Do not commit/push without authorization. Unknowns remain TBD.

## Phase 0 — Readiness
- Inspect logo/assets.
- Check Node, package manager, Git and OpenCode versions.
- Verify UI UX Pro Max installation instructions and prerequisites.
- Review available models.
**Acceptance:** environment and versions recorded; no secrets committed.

## Phase 1 — Design direction
- Use UI UX Pro Max to research a fitting visual style.
- Propose typography, tokens, hero and motion concept.
- Build one homepage prototype using placeholder content and provisional colors.
- Preview desktop and mobile.
**Acceptance:** user can review a real render; tokens are centralized; no fake claims.
**Stop for user review before full-site implementation.**

## Phase 2 — Foundation
Set up Next.js, TypeScript, Tailwind, layout, navigation, footer, buttons, typography, containers, semantic tokens and metadata.
**Acceptance:** typecheck, lint and build pass; shared components are responsive.

## Phase 3 — Pages
Recommended order: Home, Solutions, Courses, About, FAQ, Contact, Guides (only when real content is ready).
**Acceptance:** pages are consistent, CTAs work, no Products section, placeholders are not mistaken for facts.

## Phase 4 — Integrations and motion
Google Form connected (`https://forms.gle/xpjhjQgRXKfnbJds9` — registration CTAs open it); configure contact handling after approval, add verified email/social links, add purposeful animation/3D with fallbacks.
**Acceptance:** enrollment opens the real form; contact submissions are genuinely delivered or the form is not presented as operational.

## Phase 5 — QA
Run lint/typecheck/build; test routes, links, forms, keyboard access, responsive layouts, reduced motion, accessibility and performance.
**Acceptance:** no known critical bugs; user reviews the Vercel preview.

## Phase 6 — Launch
Connect GitHub to Vercel, configure domain when selected, verify HTTPS/routes/metadata/integrations, document redeployment.
**Acceptance:** live site and core journeys work; limitations are reported.

## Later, not V1 commitments
Products, expanded service pages/case studies, more cohorts, publishing workflow, certificate verification, CMS/analytics or advanced integrations.
