# Brand and Design

## Confirmed
- DevSpark; tagline “Building AI Solutions”.
- Professional, modern, user-friendly.
- Light theme for V1.
- Use the user-approved logo without distorting it.
- Products are not displayed as a live section in V1.
- Founder photo may appear, but no dedicated Founder page.
- Design choices must remain easy to change.

## Palette (implemented as semantic tokens in `app/globals.css`)
- Black / primary `#111111`
- **Brand accent (orange) `#F58220`** — the confirmed accent; used for rules, dots, icon chips and focus on dark. Always paired with dark text (`#111111`) on orange — white on orange fails contrast and is never used.
- On-primary / off-white `#F7F6F2`
- Background `#F7F6F2`; surface `#FFFFFF`
- Main text `#171717`
- Secondary text `#666666`
- Muted text `#737373`
- Border `#E5E5E5`; hairline `#ddd9d0`

Colors are defined once as semantic design tokens (`--color-primary`, `--color-accent`, `--color-background`, `--color-surface`, `--color-text`, `--color-secondary`, `--color-muted`, `--color-border`, `--color-hairline`, `--color-focus`, etc.) in `app/globals.css`. Do not scatter hard-coded color values across components. The dark band (contact + footer) retunes text/secondary/muted/border/focus for the dark subtree.

## Typography (implemented)
Headings use **Manrope** and body/UI uses **Inter**, loaded self-hosted via `next/font` (`display: swap`). The scale is defined as tokens in `@theme` (`--text-display`, `--text-headline`, `--text-title`, `--text-lead`, `--text-label`, `--text-body-sm`). Keep font configuration centralized; preserve the logo’s own typography.

## Visual direction
Premium, polished technology-company website: clear hierarchy, generous spacing, strong hero, purposeful orange accents, quality cards, consistent icons, refined motion and responsive layouts.

Avoid generic AI clichés, excessive gradients/glow/glassmorphism, overloaded sections, distracting animation, fake metrics, invented testimonials and unsupported claims.

## 3D and motion
Explore one strong visual concept first. 3D is welcome where it adds value, but performance, readability, accessibility and mobile usability take priority. Respect `prefers-reduced-motion`, provide fallbacks, optimize assets and avoid blocking main content.

## Accessibility baseline
Semantic HTML, keyboard navigation, visible focus, labelled forms, sufficient contrast, readable text, meaningful alt text and reduced-motion support.
