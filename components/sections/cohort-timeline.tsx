"use client";

import { useEffect, useMemo, useState } from "react";

import { program } from "@/config/content";
import { cn } from "@/lib/utils";

/**
 * Homepage cohort schedule card — a LIGHT "launch instrument" design:
 * a white surface card with the fading accent ribbon shared with the
 * curriculum cards, carrying:
 *
 *   1. An identity block — Cohort 01 badge, a prominently scaled course
 *      title, and a two-weight start line (confirmed date in text
 *      colour, time zone in secondary) over the exact session cadence.
 *   2. A unified countdown panel — one inset instrument strip whose four
 *      units are divided by hairlines instead of separate boxes, with an
 *      accent gradient crown clipped by the panel's rounded corners and
 *      fixed `2ch` value slots so nothing shifts while ticking.
 *   3. An 8-week session rail — one continuous hairline rail spanning
 *      all eight week columns; each week sits on the rail as three
 *      session dots (Mon · Wed · Fri): solid accent for live sessions,
 *      dashed hollow for Week 1's two free sessions. Weeks 4 and 8 carry
 *      a diamond milestone callout ("Midterm" / "Final") and a restrained
 *      accent-soft tint. Under 768px the rail lives in a keyboard-
 *      focusable, labelled scroll region so 320–346px screens reach
 *      every week by scrolling sideways.
 *   4. A legend row on the same rail-and-dot language, keeping the exact
 *      confirmed phrases: "Live sessions (Mon · Wed · Fri)", "Week 1 —
 *      first two sessions free" and "Midterm Project (Week 4) · Final
 *      Project (Week 8)".
 *
 * Hydration-safe: server and first client render both draw `––`; ticking
 * values appear only after mount. After the start instant the boxes read
 * `00` and the heading switches to "Cohort started" — never a negative
 * countdown. No end date is derived or shown (not a confirmed fact).
 */

const START_MS = Date.parse(program.startsAt);

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

const SESSION_SLOTS = [0, 1, 2] as const;

type Ticks = Record<(typeof UNITS)[number]["key"], string>;

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function split(ms: number): Ticks {
  const total = Math.max(0, ms);
  return {
    days: pad(Math.floor(total / 86_400_000)),
    hours: pad(Math.floor(total / 3_600_000) % 24),
    minutes: pad(Math.floor(total / 60_000) % 60),
    seconds: pad(Math.floor(total / 1_000) % 60),
  };
}

export function CohortTimeline() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    // First tick is deferred one macrotask so hydration finishes with the
    // server's placeholder render; from then on the interval keeps time.
    const kick = window.setTimeout(() => setNow(Date.now()), 0);
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => {
      window.clearTimeout(kick);
      window.clearInterval(id);
    };
  }, []);

  const valid = Number.isFinite(START_MS);
  const started = valid && now !== null && now >= START_MS;
  const ticks = useMemo<Ticks | null>(
    () => (valid && now !== null ? split(START_MS - now) : null),
    [now, valid]
  );

  const milestoneLabels = program.weeks
    .filter((week) => /^(Midterm|Final)/.test(week.assessment))
    .map(
      (week) =>
        `${week.assessment.split(" — ")[0]} (Week ${parseInt(week.n, 10)})`
    )
    .join(" · ");

  return (
    <article className="cohort-card relative overflow-hidden rounded-card border border-hairline bg-surface shadow-panel">
      {/* Fading accent ribbon crowning the card — the light-theme motif
          shared with the curriculum cards' top accent bar. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-accent/45 to-transparent"
      />

      <div className="p-5 sm:p-6 md:p-8">
        {/* Identity + launch clock — title hierarchy on the left, the
            countdown instrument on the right; stacks on small screens. */}
        <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-7">
          <div className="min-w-0 basis-[300px] flex-1">
            <span className="label inline-flex rounded-full bg-accent px-2.5 py-1 text-[0.65rem] text-on-accent">
              Cohort 01
            </span>
            <h3 className="mt-4 font-heading text-[1.35rem] font-semibold leading-[1.14] tracking-[-0.015em] text-text sm:text-[1.55rem] md:text-[1.7rem]">
              Generative AI Engineering — Level 01
            </h3>
            <p className="mt-3 text-[0.94rem] leading-relaxed">
              <span className="font-medium text-text">
                Starts {program.facts[0].value}
              </span>
              <span className="text-muted"> · </span>
              <span className="text-secondary">
                7:30 PM Pakistan Standard Time (UTC+5)
              </span>
            </p>
            <p className="mt-1.5 text-body-sm leading-relaxed text-secondary">
              8 weeks · 24 live sessions · Monday, Wednesday and Friday
            </p>
          </div>

          <div className="w-full min-w-0 sm:w-auto">
            <p
              className={cn(
                "label text-[0.65rem]",
                started ? "text-accent" : "text-secondary"
              )}
            >
              {started ? "Cohort started" : "Time until start"}
            </p>
            <div
              role="timer"
              aria-label={
                started
                  ? "Cohort 01 has started — the countdown has reached zero"
                  : "Countdown to the Cohort 01 start on Monday, November 30, 2026 at 7:30 PM Pakistan Standard Time (UTC+5), shown in days, hours, minutes and seconds"
              }
              className="relative mt-3 grid grid-cols-4 overflow-hidden rounded-xl border border-hairline bg-background"
            >
              {/* Accent crown clipped by the panel's rounded corners —
                  the same ribbon language as the card it sits in. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 z-[1] h-[3px] bg-gradient-to-r from-accent/80 via-accent/35 to-transparent"
              />
              {UNITS.map((unit, index) => (
                <div
                  key={unit.key}
                  className={cn(
                    "px-1 py-3 text-center transition-colors duration-300 sm:px-2.5",
                    index > 0 && "border-l border-hairline",
                    started ? "bg-accent/25" : "bg-transparent"
                  )}
                >
                  <span className="inline-block min-w-[2ch] font-heading text-[1.45rem] font-semibold leading-none tabular-nums text-text sm:text-[1.7rem] md:text-[2rem]">
                    {ticks ? ticks[unit.key] : "––"}
                  </span>
                  <span className="label mt-1.5 block text-[0.45rem] tracking-[0.06em] text-secondary sm:text-[0.5rem] sm:tracking-[0.1em]">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Session rail — one continuous hairline through all eight week
            columns, with milestone callouts hanging off Weeks 4 and 8. */}
        <div className="mt-6 border-t border-hairline pt-5 md:mt-7">
          <div className="flex items-center justify-between gap-4">
            <p className="label text-[0.58rem] text-secondary">
              Session timeline
            </p>
            <p className="hidden text-[0.7rem] text-secondary sm:block">
              24 sessions · three per week
            </p>
          </div>

          <div className="relative mt-3.5">
            <div
              role="region"
              aria-label="Eight-week session chart — scroll sideways to see every week"
              tabIndex={0}
              className="overflow-x-auto pb-1"
            >
              <ol
                aria-label="Eight-week cohort timeline, Week 1 to Week 8"
                className="flex min-w-[560px] overflow-hidden rounded-xl border border-hairline"
              >
                {program.weeks.map((week, index) => {
                  const n = parseInt(week.n, 10);
                  const milestone = /^(Midterm|Final)/.test(week.assessment);
                  const free = week.n === "01";
                  const milestoneName = milestone
                    ? week.assessment.split(" — ")[0].split(" ")[0]
                    : null;
                  return (
                    <li
                      key={week.n}
                      data-week={n}
                      data-milestone={milestone ? "true" : undefined}
                      className={cn(
                        "chart-week relative flex flex-1 flex-col pb-2.5 pt-2.5",
                        milestone ? "bg-accent-soft" : "bg-surface",
                        index < program.weeks.length - 1 &&
                          "border-r border-hairline"
                      )}
                    >
                      <span
                        className={cn(
                          "block text-center text-[0.6rem] font-semibold tabular-nums tracking-[0.08em]",
                          milestone ? "text-accent" : "text-secondary"
                        )}
                      >
                        W{n}
                      </span>
                      <span
                        aria-hidden="true"
                        className="relative mt-2.5 flex h-2 items-center justify-center gap-1.5"
                      >
                        {/* Rail segment spans the full column width, so
                            adjacent segments join into one continuous
                            line across the whole track. */}
                        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-hairline" />
                        {SESSION_SLOTS.map((slot) => {
                          const isFree = free && slot < 2;
                          return (
                            <span
                              key={slot}
                              data-session={isFree ? "free" : "live"}
                              className={cn(
                                "relative size-2 rounded-full",
                                isFree
                                  ? "border border-dashed border-accent/70 bg-surface"
                                  : "bg-accent"
                              )}
                            />
                          );
                        })}
                      </span>
                      <span
                        aria-hidden="true"
                        className="mt-2 flex h-4 items-center justify-center gap-1"
                      >
                        {milestone && milestoneName ? (
                          <>
                            <span className="size-1.5 shrink-0 rotate-45 bg-accent" />
                            <span className="text-[0.58rem] font-semibold leading-none text-accent">
                              {milestoneName}
                            </span>
                          </>
                        ) : null}
                      </span>
                      <span className="sr-only">
                        Week {n} of 8
                        {milestone
                          ? ` — assessment milestone: ${week.assessment}`
                          : free
                            ? " — live sessions, includes the first two free sessions"
                            : " — live sessions"}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-surface to-transparent md:hidden"
            />
          </div>
          <p className="mt-1.5 text-[0.68rem] text-muted md:hidden">
            Scroll sideways to see all eight weeks →
          </p>

          {/* Legend — same rail-and-dot language as the track above. */}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-hairline pt-4 text-[0.72rem] leading-snug text-secondary">
            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="relative flex w-7 shrink-0 items-center justify-center"
              >
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-hairline" />
                <span className="relative size-2 rounded-full bg-accent" />
              </span>
              Live sessions (Mon · Wed · Fri)
            </span>
            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="relative flex w-7 shrink-0 items-center justify-center"
              >
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-hairline" />
                <span className="relative size-2 rounded-full border border-dashed border-accent/70 bg-surface" />
              </span>
              Week 1 — first two sessions free
            </span>
            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="size-1.5 shrink-0 rotate-45 bg-accent"
              />
              {milestoneLabels}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
