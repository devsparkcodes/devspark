"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChatsCircle } from "@phosphor-icons/react/dist/ssr/ChatsCircle";
import { Compass } from "@phosphor-icons/react/dist/ssr/Compass";
import { GraduationCap } from "@phosphor-icons/react/dist/ssr/GraduationCap";
import { Lightbulb } from "@phosphor-icons/react/dist/ssr/Lightbulb";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { X } from "@phosphor-icons/react/dist/ssr/X";

import { Disclosure } from "@/components/ui/disclosure";
import { cn } from "@/lib/utils";

type GuideSection = {
  heading: string;
  body: string;
};

export type HelpGuide = {
  slug: string;
  title: string;
  summary: string;
  keywords: string[];
  sections: GuideSection[];
  /**
   * Optional in-content link rendered after the guide's sections —
   * a single, styled internal anchor (no extra button), used for guides
   * whose next step lives on another page (e.g. the contact guide).
   */
  cta?: { label: string; href: string };
};

export type HelpCategory = {
  slug: string;
  icon: string;
  title: string;
  description: string;
  guides: HelpGuide[];
};

type HelpCenterProps = {
  categories: HelpCategory[];
};

/** Category glyphs — one per `categories[].icon` key in `config/content.ts`. */
const categoryIcons = {
  compass: Compass,
  chatsCircle: ChatsCircle,
  lightbulb: Lightbulb,
  graduationCap: GraduationCap,
} as const;

/**
 * Help Center browser: client-side search across guide titles, summaries
 * and keywords, plus single-select category filtering. Search and filter
 * combine; a reset clears both. Filterable items carry no `data-reveal`
 * (they mount/unmount with filtering) — only static chrome above and
 * below this component uses scroll-reveal. Each category opens with a
 * neutral header band (icon tile + "Help category" eyebrow + a heading
 * larger than the article titles) so the category level always reads as
 * distinct from the article rows beneath it.
 */
export function HelpCenter({ categories }: HelpCenterProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const normalizedQuery = query.trim().toLowerCase();
  const totalGuides = useMemo(
    () => categories.reduce((count, category) => count + category.guides.length, 0),
    [categories]
  );

  const visibleCategories = useMemo(() => {
    return categories
      .filter((category) => !activeCategory || category.slug === activeCategory)
      .map((category) => ({
        ...category,
        guides: category.guides.filter((guide) => {
          if (!normalizedQuery) return true;
          const haystack = [guide.title, guide.summary, ...guide.keywords, category.title]
            .join(" ")
            .toLowerCase();
          return haystack.includes(normalizedQuery);
        }),
      }))
      .filter((category) => category.guides.length > 0);
  }, [categories, activeCategory, normalizedQuery]);

  const visibleCount = visibleCategories.reduce(
    (count, category) => count + category.guides.length,
    0
  );
  const isFiltering = normalizedQuery.length > 0 || activeCategory !== null;

  function reset() {
    setQuery("");
    setActiveCategory(null);
  }

  return (
    <div className="mt-10">
      <div
        data-reveal
        className="rounded-card border border-hairline bg-surface p-5 md:p-6"
      >
        <label htmlFor="help-search" className="label block text-label text-secondary">
          Search help
        </label>
        <div className="relative mt-2">
          <MagnifyingGlass
            aria-hidden
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary"
          />
          <input
            id="help-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search help — e.g. enrollment, contact, navigation"
            className="input w-full pl-10 pr-10"
            autoComplete="off"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 inline-flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-secondary transition-colors duration-200 hover:text-text"
              aria-label="Clear search"
            >
              <X aria-hidden size={16} />
            </button>
          ) : null}
        </div>

        <div
          role="group"
          aria-label="Filter by category"
          data-reveal
          className="mt-4 flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            aria-pressed={activeCategory === null}
            onClick={() => setActiveCategory(null)}
            className={cn(
              "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
              activeCategory === null
                ? "border-primary bg-primary text-on-primary"
                : "border-border bg-background text-text hover:border-primary"
            )}
          >
            All topics
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              aria-pressed={activeCategory === category.slug}
              onClick={() =>
                setActiveCategory((current) =>
                  current === category.slug ? null : category.slug
                )
              }
              className={cn(
                "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
                activeCategory === category.slug
                  ? "border-primary bg-primary text-on-primary"
                  : "border-border bg-background text-text hover:border-primary"
              )}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      <p
        data-reveal
        role="status"
        aria-live="polite"
        className="mt-5 text-body-sm text-secondary"
      >
        {isFiltering
          ? `Showing ${visibleCount} of ${totalGuides} guides`
          : `${totalGuides} guides across ${categories.length} categories`}
      </p>

      {visibleCount === 0 ? (
        <div className="mt-8 rounded-card border border-hairline bg-surface p-8 text-center">
          <h2 className="text-title">No guides match your search</h2>
          <p className="mx-auto mt-3 max-w-md text-[0.975rem] leading-relaxed text-secondary">
            Try a different keyword, or reset the search and category filter
            to browse every guide.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 cursor-pointer rounded-xl bg-primary px-6 py-3 text-[0.95rem] font-semibold text-on-primary transition-colors duration-200 hover:bg-accent hover:text-on-accent"
          >
            Reset search and filters
          </button>
        </div>
      ) : (
        <div className="mt-10 space-y-12">
          {visibleCategories.map((category) => {
            const Icon =
              categoryIcons[category.icon as keyof typeof categoryIcons];

            return (
              <section key={category.slug} aria-labelledby={`cat-${category.slug}`}>
                {/* Category header: neutral surface + icon + eyebrow, so it
                    reads as a section title and never as an article row. */}
                <div className="rounded-card border border-hairline bg-background p-5 md:p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft md:size-11">
                      {Icon ? <Icon aria-hidden size={22} /> : null}
                    </span>
                    <p className="label flex items-center gap-3 text-label text-secondary">
                      <span aria-hidden="true" className="h-px w-6 bg-accent md:w-8" />
                      Help category
                    </p>
                  </div>
                  <h2
                    id={`cat-${category.slug}`}
                    className="mt-4 scroll-mt-28 text-[1.4rem] leading-[1.18] text-text md:mt-5 md:text-[1.7rem]"
                  >
                    {category.title}
                  </h2>
                  <p className="mt-2.5 max-w-2xl text-body-sm leading-relaxed text-secondary">
                    {category.description}
                  </p>
                </div>

                <ul className="mt-5 border-t border-hairline md:mt-6">
                  {category.guides.map((guide) => (
                    <li key={guide.slug} className="border-b border-hairline">
                      <Disclosure
                        contentClassName="pt-5"
                        trigger={
                          <>
                            <span className="text-title">{guide.title}</span>
                            <span className="mt-1.5 block max-w-2xl text-[0.975rem] leading-relaxed text-secondary">
                              {guide.summary}
                            </span>
                          </>
                        }
                      >
                        <div className="max-w-2xl space-y-5">
                          {guide.sections.map((section) => (
                            <div key={section.heading}>
                              <h3 className="font-heading text-[1.02rem] font-semibold text-text">
                                {section.heading}
                              </h3>
                              <p className="mt-1.5 text-[0.975rem] leading-relaxed text-secondary">
                                {section.body}
                              </p>
                            </div>
                          ))}
                          {guide.cta ? (
                            <p>
                              <Link
                                href={guide.cta.href}
                                className="link-underline cursor-pointer font-medium text-text"
                              >
                                {guide.cta.label}
                              </Link>
                            </p>
                          ) : null}
                        </div>
                      </Disclosure>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
