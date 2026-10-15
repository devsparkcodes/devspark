"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { List } from "@phosphor-icons/react/dist/ssr/List";
import { X } from "@phosphor-icons/react/dist/ssr/X";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { NavLink } from "@/components/ui/nav-link";
import { headerCta, primaryNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

/**
 * Header. The desktop list and the mobile disclosure panel are two
 * `<nav>` landmarks with the same accessible name ("Primary") because
 * they are the same navigation: the desktop list is `hidden` below
 * `lg`, the mobile panel collapses to a zero-height track and carries
 * `inert` until opened, so only one is ever exposed to assistive
 * technology at a time — no duplicate landmarks. The panel animates
 * open/closed over 240ms (grid rows + fade) and the toggle crossfades
 * List ⇄ X; `inert` snaps instantly, so keyboard users never tab into
 * a closing panel.
 *
 * Without JavaScript the disclosure cannot open, so a `<noscript>`
 * fallback renders the same links as a plain list and hides the inert
 * toggle button.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6 md:h-20">
        <Logo priority />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-9">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  className="py-2 text-[0.95rem]"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href={headerCta.href} size="sm" variant="primary" showArrow>
            {headerCta.label}
          </Button>
        </div>

        <button
          ref={toggleRef}
          id="site-menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-xl border border-border bg-surface text-text transition-colors duration-200 lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block size-[21px]">
            <List
              size={21}
              className={cn(
                "absolute left-0 top-0 transition-[opacity,transform] duration-[240ms]",
                open
                  ? "-rotate-90 scale-75 opacity-0 ease-standard"
                  : "rotate-0 scale-100 opacity-100 ease-exit"
              )}
            />
            <X
              size={21}
              className={cn(
                "absolute left-0 top-0 transition-[opacity,transform] duration-[240ms]",
                open
                  ? "rotate-0 scale-100 opacity-100 ease-standard"
                  : "rotate-90 scale-75 opacity-0 ease-exit"
              )}
            />
          </span>
        </button>
      </Container>

      {/* Disclosure panel: collapses to a zero-height grid track when
          closed (with `inert` so it leaves the accessibility tree and the
          tab order instantly), opening over 240ms on the standard curve
          and closing on the in-out exit curve. */}
      <nav
        aria-label="Primary"
        id="mobile-nav"
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full bg-background shadow-panel lg:hidden",
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-[240ms]",
          open
            ? "grid-rows-[1fr] opacity-100 ease-standard"
            : "pointer-events-none grid-rows-[0fr] opacity-0 ease-exit"
        )}
      >
        {/* The track-sized child must carry no padding or border of its
            own — a `0fr` row bottoms out at the child's padding + border,
            so those live one level deeper where they clip to zero. The
            panel's closing hairline is absolute, so it rides the animated
            bottom edge without contributing height. */}
        <div className="min-h-0 overflow-hidden">
          <Container className="py-4">
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-border py-3.5 text-[1.02rem]"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Button
              href={headerCta.href}
              onClick={() => setOpen(false)}
              size="sm"
              variant="primary"
              showArrow
              className="mt-5 w-full"
            >
              {headerCta.label}
            </Button>
          </Container>
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border"
        />
      </nav>

      {/* No-JavaScript fallback: the disclosure above cannot open, so
          render the same destinations as a plain list and drop the
          now-inert toggle button. */}
      <noscript>
        <style>{`#site-menu-toggle{display:none}`}</style>
        <nav aria-label="Primary" className="border-b border-border bg-background lg:hidden">
          <Container className="py-4">
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between border-b border-border py-3.5 text-[1.02rem] font-medium text-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button
              href={headerCta.href}
              size="sm"
              variant="primary"
              showArrow
              className="mt-5 w-full"
            >
              {headerCta.label}
            </Button>
          </Container>
        </nav>
      </noscript>
    </header>
  );
}
