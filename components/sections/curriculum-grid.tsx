"use client";

import { useState } from "react";

import { Bug } from "@phosphor-icons/react/dist/ssr/Bug";
import { ClipboardText } from "@phosphor-icons/react/dist/ssr/ClipboardText";
import { FileText } from "@phosphor-icons/react/dist/ssr/FileText";
import { FlowArrow } from "@phosphor-icons/react/dist/ssr/FlowArrow";
import { Hammer } from "@phosphor-icons/react/dist/ssr/Hammer";
import { Lightbulb } from "@phosphor-icons/react/dist/ssr/Lightbulb";
import { MagicWand } from "@phosphor-icons/react/dist/ssr/MagicWand";
import { Plus } from "@phosphor-icons/react/dist/ssr/Plus";
import { Presentation } from "@phosphor-icons/react/dist/ssr/Presentation";

import { Disclosure } from "@/components/ui/disclosure";
import type { CurriculumWeek } from "@/config/content";
import { cn, revealDelay } from "@/lib/utils";

/* One meaningful icon per week (Week 1 → Week 8). */
const WEEK_ICONS = [
  Lightbulb,
  MagicWand,
  ClipboardText,
  Hammer,
  FileText,
  Bug,
  FlowArrow,
  Presentation,
];

/**
 * `/courses` curriculum: eight premium cards in a responsive grid.
 *
 * Interaction model
 *   - The ENTIRE card face is one native `<button>`
 *     (`aria-expanded` + `aria-controls`), so mouse click, touch tap and
 *     keyboard ( Enter / Space ) all disclose the week.
 *   - Desktop hover ( fine pointers only, CSS media-gated — the markup
 *     never changes so hydration stays deterministic ) slides a preview
 *     overlay over the face showing the week label, the short week
 *     summary and the week title. Clicking pins the card open, which
 *     keeps the preview away while the real panel shows the detail.
 *   - Coarse-pointer devices never see the hover preview; they get a
 *     "Tap to explore" hint instead ( `.card-tap-hint` ).
 *   - The panel animates through a `grid-template-rows` transition
 *     ( neutralised under `prefers-reduced-motion` ) and stays
 *     `aria-hidden` + `inert` while closed, so its nested controls never
 *     sit in the tab order of a collapsed card. Multiple cards may be
 *     open at once.
 *   - Inside the panel each of the week's three classes is its own
 *     `Disclosure` row (the shared `components/ui/disclosure` component),
 *     so the detailed topic lists stay collapsed until a class is
 *     opened — a week never dumps 25–34 bullets on the visitor at once.
 *
 * Data: every string comes from `program.weeks` in `config/content.ts`
 * (the single curriculum source of truth) — this component only renders
 * it.
 *
 * Layout discipline: fixed header row ( icon · W-label · indicator ),
 * title, clamped outcome preview, then an `mt-auto` footer pinned to the
 * bottom of every card so assessment rows line up across each row.
 */
export function CurriculumGrid({ weeks }: { weeks: CurriculumWeek[] }) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (n: string) =>
    setOpenIds((prev) =>
      prev.includes(n) ? prev.filter((id) => id !== n) : [...prev, n]
    );

  return (
    <ol className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {weeks.map((week, index) => {
        const Icon = WEEK_ICONS[index] ?? Lightbulb;
        const open = openIds.includes(week.n);
        const panelId = `week-${week.n}-panel`;
        const weekLabel = `W${week.n}`;
        const topicCount = week.classes.reduce(
          (total, cls) => total + cls.topics.length,
          0
        );
        return (
          <li
            key={week.n}
            data-reveal
            style={revealDelay(index * 60)}
            className="flex flex-col"
          >
            <div
              data-pinned={open ? "" : undefined}
              className="card-chrome relative flex flex-1 flex-col rounded-card bg-background"
            >
              {/* Top accent ribbon — grows in on hover / pin, echoing the
                  homepage timeline card's crowning ribbon. The bar sits in
                  an internal decorative clip layer (rounded-card +
                  overflow-hidden) so its ends follow the card's corner
                  curve instead of protruding past the rounded border;
                  pointer-events-none keeps the whole-face button and the
                  focus ring untouched. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[3] overflow-hidden rounded-card"
              >
                <span className="card-topbar absolute inset-x-0 top-0 h-[3px] bg-accent" />
              </span>

              {/* Desktop hover preview — decorative duplicate, always in
                  the SSR markup, visible only via .card-chrome:hover on
                  fine pointers while the card is not pinned open. It
                  shows the short week summary; the detailed per-class
                  topics live in the pinned panel below the face. */}
              <div aria-hidden="true" className="card-preview">
                <span className="flex shrink-0 items-baseline justify-between gap-3">
                  <span className="label text-[0.6rem] text-accent">
                    {weekLabel}
                  </span>
                  <span className="label text-[0.48rem] text-secondary">
                    {week.classes.length} classes · {topicCount} topics ·
                    pin open
                  </span>
                </span>
                <p className="mt-3 shrink-0 text-[0.7rem] leading-[1.45] text-secondary">
                  {week.summary}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-auto block h-px shrink-0 bg-hairline"
                />
                <span className="block shrink-0 pt-2 text-[0.62rem] font-medium leading-snug text-text">
                  {weekLabel} · {week.title}
                </span>
              </div>

              {/* Whole-face button: the complete collapsed surface. */}
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(week.n)}
                className="flex min-h-[260px] flex-1 flex-col p-5 text-left sm:min-h-[264px] md:min-h-[276px] lg:min-h-[276px] md:p-6 xl:min-h-[280px]"
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="card-icon flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/35 bg-accent-soft text-primary"
                  >
                    <Icon size={20} weight="duotone" />
                  </span>
                  <span className="label text-label text-accent">
                    {weekLabel}
                  </span>
                  <Plus
                    aria-hidden
                    size={18}
                    className={cn(
                      "ml-auto shrink-0 transition-transform",
                      open
                        ? "rotate-45 text-accent duration-[360ms] ease-standard"
                        : "text-secondary duration-[280ms] ease-exit"
                    )}
                  />
                </span>
                <span className="mt-3 block font-heading text-[1.06rem] font-semibold leading-snug text-text md:text-[1.1rem]">
                  {week.title}
                </span>
                <span className="mt-2 line-clamp-3 text-[0.88rem] leading-relaxed text-secondary">
                  {week.outcome}
                </span>
                <span className="mt-auto flex flex-wrap items-start justify-between gap-x-3 gap-y-2 border-t border-hairline pt-3.5">
                  <span className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-hairline bg-background px-2.5 py-1 text-[0.72rem] leading-snug text-secondary">
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 rotate-45 bg-accent"
                    />
                    <span>{week.assessment}</span>
                  </span>
                  <span className="card-tap-hint label shrink-0 self-center text-[0.5rem] text-accent">
                    Tap to explore
                  </span>
                </span>
              </button>

              {/* Disclosure panel — padding lives INSIDE the 0fr wrapper
                  so a closed card carries no stray bottom padding. Opens
                  over 360ms on the standard decelerating curve and closes
                  over 280ms on the in-out exit curve (no end-crawl, no
                  end-snap); the inner content arrives behind the row
                  expansion and is gone before the close's final settle.
                  `inert` keeps the nested class disclosures out of the
                  tab order and the accessibility tree while the card is
                  collapsed (same rule as `components/ui/disclosure`). */}
              <div
                id={panelId}
                aria-hidden={!open}
                inert={!open}
                className={cn(
                  "grid px-5 transition-[grid-template-rows] md:px-6",
                  open
                    ? "grid-rows-[1fr] duration-[360ms] ease-standard"
                    : "grid-rows-[0fr] duration-[280ms] ease-exit"
                )}
              >
                <div className="overflow-hidden">
                  <div
                    className={cn(
                      "border-t border-hairline pb-5 pt-4 transition-[opacity,transform] md:pb-6",
                      open
                        ? "delay-[80ms] translate-y-0 opacity-100 duration-[300ms] ease-standard"
                        : "delay-0 -translate-y-2 opacity-0 duration-[260ms] ease-exit"
                    )}
                  >
                    <p className="label text-label text-secondary">
                      What this week covers
                    </p>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-text">
                      {week.summary}
                    </p>

                    <p className="label mt-5 text-label text-secondary">
                      Classes
                    </p>
                    <ol className="mt-1">
                      {week.classes.map((cls) => (
                        <li
                          key={cls.n}
                          className="border-b border-hairline last:border-b-0"
                        >
                          <Disclosure
                            trigger={
                              <span className="min-w-0">
                                <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                                  <span className="label text-[0.6rem] text-accent">
                                    Class {cls.n}
                                  </span>
                                  <span className="text-[0.72rem] text-secondary">
                                    {cls.date}
                                  </span>
                                  {cls.badge ? (
                                    <span className="label rounded-full bg-accent px-2 py-0.5 text-[0.6rem] text-on-accent">
                                      {cls.badge}
                                    </span>
                                  ) : null}
                                </span>
                                <span className="mt-1.5 block text-[0.92rem] font-semibold leading-snug text-text">
                                  {cls.title}
                                </span>
                              </span>
                            }
                            contentClassName="pt-3"
                          >
                            <ul className="space-y-2.5">
                              {cls.topics.map((topic) => (
                                <li
                                  key={topic}
                                  className="flex gap-3 text-[0.9rem] leading-relaxed text-secondary"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                                  />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                            {cls.practical ? (
                              <div className="mt-4 rounded-xl border border-accent/25 bg-accent/[0.07] p-3.5">
                                <p className="label text-label text-secondary">
                                  Practical learning
                                </p>
                                <p className="mt-1.5 text-[0.88rem] leading-relaxed text-text">
                                  {cls.practical}
                                </p>
                              </div>
                            ) : null}
                          </Disclosure>
                        </li>
                      ))}
                    </ol>

                    <div className="mt-5 rounded-xl border border-accent/25 bg-accent/[0.07] p-4">
                      <p className="label text-label text-secondary">
                        Practical outcome
                      </p>
                      <p className="mt-2 text-[0.9rem] leading-relaxed text-text">
                        {week.outcome}
                      </p>
                    </div>

                    {week.assessmentDetail ? (
                      <div className="mt-3 rounded-xl border border-hairline bg-surface p-4">
                        <p className="label text-label text-secondary">
                          {/^(Midterm|Final)/.test(week.assessment)
                            ? "Project brief"
                            : "Assignment brief"}
                        </p>
                        <p className="mt-2 text-[0.9rem] leading-relaxed text-secondary">
                          {week.assessmentDetail}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
