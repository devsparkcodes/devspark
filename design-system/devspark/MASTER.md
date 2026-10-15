# DevSpark — Design System Master

**Status:** V1 implemented — six routes (Home, Solutions, Courses, About, Help Center at `/guides`, Contact) + `POST /api/contact`, routed navigation with active states. `/faq` is a permanent `308` redirect to `/guides`. Remaining work is external setup (domain, Resend credentials, Google Form URL).
**Generated with:** UI UX Pro Max skill (`--design-system --persist`), then corrected against `docs/02_BRAND_AND_DESIGN.md`.
**Rule:** the project documentation remains the source of truth. Where this file and the docs disagree, the docs win and this file must be updated.

Check `design-system/devspark/pages/<page>.md` before building a page. If it exists, its rules override this Master file.

---

## 1. Direction

| Aspect | Decision | Source |
|---|---|---|
| Style | Minimalism & Swiss Style — grid-based, generous white space, high contrast, geometric sans, restrained decoration | UI UX Pro Max (`minimalism clean editorial light`) |
| Page pattern | Hero → value/focus areas → program → company → FAQ → CTA → footer | UI UX Pro Max (`hero-features-cta`) + `docs/03` |
| Variance / motion / density dials | 4 / 4 / 4 (balanced, standard, spacious) | UI UX Pro Max |
| Tone | Premium, modern, confident technology company (not academy, not portfolio, not generic AI template) | `docs/01`, `docs/02` |
| Theme | Light for V1; one dark band (contact + footer) for closing contrast | `docs/02` |

**Rejected deliberately:** glassmorphism (skill suggestion overridden by `docs/02`), GSAP/Three.js/R3F (V1 motion = CSS + one IntersectionObserver script + a hand-rolled Canvas 2D network — zero added dependencies), gradients/glow clichés, fake metrics, testimonials, client logos.

---

## 2. Color tokens (provisional, `app/globals.css` → `@theme`)

| Token | Value | Used for |
|---|---|---|
| `--color-primary` | `#111111` | Primary buttons, dark band, emphasis |
| `--color-on-primary` | `#f7f6f2` | Text on primary/dark band |
| `--color-accent` | `#F58220` | Orange accent: rules, dots, icon chips, focus on dark |
| `--color-on-accent` | `#111111` | Text/icons on orange (~7.3:1 — white on orange fails, never use it) |
| `--color-accent-soft` | `#ffebe0` | Icon-chip backgrounds |
| `--color-background` | `#F7F6F2` | Page background |
| `--color-surface` | `#FFFFFF` | Panels, cards on white sections |
| `--color-text` | `#171717` | Primary text |
| `--color-secondary` | `#666666` | Body/supporting text (5.3:1 on off-white) |
| `--color-muted` | `#737373` | Placeholder/disabled text (use on white or dark band only) |
| `--color-border` | `#E5E5E5` | Dividers, input-style borders |
| `--color-hairline` | `#ddd9d0` | Card borders, SVG strokes, structural rules |
| `--color-focus` | `#171717` | Focus ring on light; overridden to `#f58220` inside `.band-dark` |

**Contrast rules:** small orange text is never used on light backgrounds; orange appears as graphics, rules, fills with dark text. `.band-dark` retunes `text/secondary/muted/border/focus` for the dark subtree so components need no per-section overrides.

## 3. Typography

- Headings: **Manrope** (`--font-heading`), body/UI: **Inter** (`--font-sans`) — provisional per `docs/02`, loaded with `next/font` (self-hosted, `display: swap`).
- Scale tokens in `@theme`: `--text-display` (`clamp(2.4rem, 5.4vw, 4.2rem)`), `--text-headline`, `--text-title`, `--text-lead`, `--text-label` (0.75rem), `--text-body-sm` — each carries its own line-height/letter-spacing/font-weight modifiers.
- `.label` component class: uppercase, `0.16em` tracking, weight 600 (section eyebrows, table terms, badges).
- Headings use `text-wrap: balance`; paragraphs `text-wrap: pretty`.
- **Logo**: official originals imported directly from `logos/` (all four source files kept byte-for-byte intact; nothing is copied, cropped, recolored or regenerated). Header uses `logos/Full logo/black-devspark.png` (black Dev + orange Spark, 842×596 canvas with the original transparent padding) at `h-7 md:h-8`, natural aspect. Dark surfaces (footer) use `logos/Full logo/white-devspark.png` (white Dev + orange Spark, same 842×596 padded canvas) at its natural aspect ratio via `w-[145px] md:w-[165px]`, no transforms or chips. Favicon/app icon: `app/icon.svg` — a byte-for-byte copy of `logos/icon logo SVG/white-icon.svg` (Next.js requires the file under `app/`; geometry, viewBox and colors untouched). Rendered by `components/ui/logo.tsx` via static `next/image` imports; image `alt=""` with the home link's `aria-label` as the accessible name (footer duplicate stays a quiet repeat of the same link).

## 4. Shape, elevation, motion

- Radius: `--radius-card: 0.75rem` (12px) for cards/panels; buttons `rounded-xl`; chips/badges `rounded-full`.
- Elevation: one token, `--shadow-panel` (soft, low). Cards rely on hairline borders first.
- Easing: `--ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`); transitions 200–300ms; reveal 700ms with `--reveal-delay` stagger (70–310ms).
- Reveal system: hidden state is gated purely in CSS in `globals.css` — `@media (prefers-reduced-motion: no-preference) and (scripting: enabled)` hides `[data-reveal]` elements at first paint, so content stays visible without JavaScript or under reduced motion without any script. The `[data-revealed]` state attribute is set by the `MotionReveal` client component (`components/motion-reveal.tsx`) from a post-hydration effect as elements enter view: React 19 diffs every DOM attribute during hydration, so no DOM writes may happen before it completes. The effect re-runs on every `usePathname()` change — the root layout persists across client-side navigations, so a mount-only effect would observe only the first route's elements and leave later routes stuck at `opacity: 0` (blank-looking pages until a hard refresh).
- Ambient motion: `.flow-pulse` on the hero blueprint connectors (2.4s linear) + the hero particle network (`components/sections/hero-network.tsx` — hand-rolled Canvas 2D with 3D perspective projection, ink/accent nodes with quantized-alpha edges, subtle pointer parallax ≥768px with fine pointers, ~30fps throttle <640px, paused when the tab is hidden or the hero leaves the viewport, one static frame under reduced motion, nothing without JS). Masked by `.net-fade`; `aria-hidden`, `pointer-events: none`.

## 5. Component rules

- **Buttons** (`components/ui/button.tsx`): variants `primary` (ink → orange on hover), `accent`, `outline` (ink border → filled on hover), `quiet`, `onDark`. Base: `rounded-xl`, `cursor-pointer`, 200ms color transitions, `disabled:pointer-events-none disabled:opacity-60`.
- **Sections** (`components/ui/section.tsx`): tones `background` | `surface` | `dark`, `py-20 md:py-28`, `scroll-mt-24`.
- **Section heading** (`section-heading.tsx`): orange rule + index + label, headline, optional lead description — the editorial rhythm used by every section.
- **Cards**: hairline border, 12px radius, no oversized rounding, hover only changes border/shadow (never layout).
- **Icons**: Phosphor (`@phosphor-icons/react`, deep SSR imports), one weight/size family per hierarchy, `aria-hidden` when decorative.
- **Navigation**: sticky header; links are `NavLink` (`components/ui/nav-link.tsx`) — real routes with `aria-current="page"` + persistent orange underline for the active route; mobile menu closes on Escape/link click, exposes `aria-expanded`/`aria-controls`. Home is the logo → `/`.
- **Buttons** internal routes render `next/link` (enforced by `@next/next/no-html-link-for-pages`); `#…` anchors and external URLs stay plain `<a>`.
- **Page hero** (`components/ui/page-hero.tsx`): shared subpage header — eyebrow label, `h1` (`text-headline`), optional lead + actions; every route exports its own `metadata` (title via the `%s — DevSpark` template).
- **Forms** (`.input` in globals): contact form is fully operational — validated fields, enabled submit, `POST /api/contact` → Resend, honest success/error states (success only after provider acceptance; 503 notice when unconfigured). Never fake a submission.

## 6. Accessibility (release checklist)

- Semantic landmarks, one `h1`, sequential headings, skip link as first tab stop.
- Focus: 2px `--color-focus` ring with 3px offset (orange on the dark band).
- Body/supporting text ≥ 4.5:1; non-text UI ≥ 3:1.
- `prefers-reduced-motion` honoured globally and per-effect; no scroll-jacking.
- Touch targets ≥ 44px for icon controls; no horizontal scroll at 360/390/480/640/768/900/1024/1280/1440.
- No emoji icons; no unlabeled SVGs; no dead links — TBD destinations render as clearly marked, non-interactive placeholders.

## 7. Where things live

| Concern | File |
|---|---|
| Tokens, type scale, reveal/motion CSS | `app/globals.css` |
| Brand, links, TBD placeholders | `config/site.ts` |
| Navigation entries | `config/navigation.ts` |
| Section copy and facts | `config/content.ts` |
| Layout + reveal boot | `app/layout.tsx`, `components/motion-reveal.tsx` |
| Logo component + assets | `components/ui/logo.tsx` (static imports from `logos/Full logo/`), `app/icon.svg` (byte-copy of `logos/icon logo SVG/white-icon.svg`) |
| Hero ambient background | `components/sections/hero-network.tsx` |
| Routes | `app/solutions`, `app/courses`, `app/about`, `app/guides` (Help Center), `app/contact` (each with its own `metadata`); `app/api/contact` (POST); `app/not-found.tsx` (branded 404); `/faq` is a `308` redirect to `/guides` in `next.config.ts` |
| Subpage header / active nav | `components/ui/page-hero.tsx`, `components/ui/nav-link.tsx` |
