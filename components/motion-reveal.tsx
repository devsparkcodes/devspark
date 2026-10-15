"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll-reveal controller.
 *
 * React 19 diffs every attribute of every rendered element during
 * hydration, so DOM writes made BEFORE hydration (the old inline boot script
 * added `motion-ok` and `is-revealed` classes) raised "some attributes of
 * the server rendered HTML didn't match the client properties" errors in
 * dev. Running from an effect guarantees every write happens after
 * hydration has completed, so no mismatch can occur.
 *
 * The effect depends on the pathname: Next.js keeps the root layout (and
 * this component) mounted across client-side navigations, so a mount-only
 * effect would observe the first page's `[data-reveal]` elements and never
 * the ones rendered by later routes — leaving them at `opacity: 0` (a
 * blank-looking page until a hard refresh). Re-running on every route
 * change re-queries the current document and re-observes everything that
 * is not yet revealed.
 *
 * The hidden initial state lives purely in CSS (globals.css), gated by
 * `prefers-reduced-motion: no-preference` and `scripting: enabled`, which
 * preserves the hidden-at-first-paint state, the no-JavaScript fallback and
 * reduced-motion support without touching the DOM early.
 */
export function MotionReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.setAttribute("data-revealed", ""));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
