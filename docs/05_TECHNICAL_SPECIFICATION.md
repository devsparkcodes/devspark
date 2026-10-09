# Technical Specification

## Confirmed stack
- Next.js + TypeScript + Tailwind CSS
- Git + GitHub
- Vercel deployment
- OpenCode coding agent
- UI UX Pro Max skill as a design assistant, not source of truth

Use compatible stable versions at implementation time and record installed versions.

## Architecture
- Primarily public/static website; use Next.js App Router unless a documented reason says otherwise.
- Reusable components and consistent layout.
- Centralized content/config for links and frequently changed details.
- Semantic design tokens for color, typography, spacing and motion.
- Future products can be added later but must not appear in V1.
- No custom backend/database, login, payment gateway, student dashboard or LMS without new approval.

Proposed structure (adapt to actual project needs):
```text
app/
  layout.tsx
  page.tsx
  solutions/
  courses/
  about/
  guides/
  faq/
  contact/
components/
  layout/
  sections/
  ui/
  motion/
config/
  site.ts
  navigation.ts
  content.ts
public/
  images/
  brand/
```

## Contact form
Custom backend is out of scope. Form-handling provider/destination is TBD. Never show success unless a submission really succeeded. Never put secrets in client code or Git. Until an approved working destination exists, keep the form clearly non-operational in development or prioritize email/social links; do not release a misleading form.

## Google Form
URL is TBD. Centralize it and verify before release.

## Quality gates
TypeScript checks, lint and production build pass; routes/CTAs work; no broken assets or console errors; mobile/tablet/desktop checked; keyboard/focus/contrast/reduced motion reviewed; performance and metadata checked; images/fonts/3D optimized.

## Secrets
Use `.env.local` only when a real integration needs it. Provide `.env.example` without secrets and ensure secret files are ignored by Git. No API key is expected for a purely static site.

## Deployment
1. Build/test locally.
2. Initialize Git and create GitHub repository.
3. Connect repository to Vercel.
4. Deploy preview and inspect.
5. Add custom domain when chosen (TBD).
6. Verify production links, metadata, responsive layout and integrations.
Do not commit or push unless explicitly authorized.
