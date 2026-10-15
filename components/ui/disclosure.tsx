"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import { Plus } from "@phosphor-icons/react/dist/ssr/Plus";

import { cn } from "@/lib/utils";

type DisclosureProps = {
  /** Row content shown before the Plus icon (question, title + summary …). */
  trigger: ReactNode;
  /** Panel content revealed when open. */
  children: ReactNode;
  /** Replaces the panel's default `pt-3` spacing under the trigger. */
  contentClassName?: string;
  className?: string;
};

/**
 * Disclosure row built on the same `grid-template-rows 0fr/1fr` mechanism
 * as the curriculum cards and mobile nav (direction-aware timing via the
 * destination-state rule). Replaces the native `<details>` strategy whose
 * close stutter traced to two flaws: the close curve
 * `cubic-bezier(0.4, 0, 0.2, 1)` spends ~78% of the distance by t=50% and
 * crawls the last few percent over the remaining ~40% of the duration
 * (hesitation), then the UA pseudo-element's discrete
 * `content-visibility` flip at the very end forces a final layout
 * invalidation (the end-snap). The new collapse curve
 * `cubic-bezier(0.4, 0, 0.55, 1)` keeps distance accruing across the
 * full duration with a short soft landing; the content fade completes
 * early in the close so no clipped text lingers; everything animates on
 * real DOM elements (no `::details-content` / `interpolate-size`
 * dependency, consistent across engines). Closed state is inert +
 * aria-hidden so the accessibility tree and tab order stay clean, and
 * interruption reverses mid-flight via React state (same as the
 * approved curriculum cards).
 */
export function Disclosure({
  trigger,
  children,
  contentClassName,
  className,
}: DisclosureProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className={className}>
      <button
        type="button"
        id={`${id}-trigger`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full cursor-pointer items-start justify-between gap-6 pt-5 text-left"
      >
        <span className="min-w-0">{trigger}</span>
        <Plus
          aria-hidden
          size={20}
          className={cn(
            "mt-1 shrink-0 text-secondary transition-transform",
            open
              ? "rotate-45 duration-[340ms] ease-standard"
              : "duration-[260ms] ease-collapse"
          )}
        />
      </button>

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        inert={!open}
        aria-hidden={!open}
        className={cn(
          "grid pb-5 transition-[grid-template-rows]",
          open
            ? "grid-rows-[1fr] duration-[340ms] ease-standard"
            : "grid-rows-[0fr] duration-[260ms] ease-collapse"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              "transition-[opacity]",
              contentClassName ?? "pt-3",
              open
                ? "delay-[60ms] opacity-100 duration-[280ms] ease-standard"
                : "delay-0 opacity-0 duration-[180ms] ease-exit"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
