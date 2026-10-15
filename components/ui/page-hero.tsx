import type { CSSProperties, ReactNode } from "react";

import { Container } from "@/components/ui/container";

type PageHeroProps = {
  label: string;
  title: string;
  /** Optional line rendered directly beneath the `h1`, above the lead. */
  subtitle?: string;
  lead?: string;
  children?: ReactNode;
};

const delay70 = { "--reveal-delay": "70ms" } as CSSProperties;
const delay140 = { "--reveal-delay": "140ms" } as CSSProperties;
const delay210 = { "--reveal-delay": "210ms" } as CSSProperties;

/** Shared header for all subpages: eyebrow label, `h1`, optional lead + actions. */
export function PageHero({ label, title, subtitle, lead, children }: PageHeroProps) {
  return (
    <section className="border-b border-hairline bg-background pb-14 pt-14 md:pb-16 md:pt-20">
      <Container>
        <p
          data-reveal
          className="label flex items-center gap-3 text-label text-secondary"
        >
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          {label}
        </p>
        <h1
          data-reveal
          style={delay70}
          className="mt-5 max-w-4xl text-headline"
        >
          {title}
        </h1>
        {subtitle ? (
          <p
            data-reveal
            style={delay140}
            className="mt-4 text-title text-secondary"
          >
            {subtitle}
          </p>
        ) : null}
        {lead ? (
          <p
            data-reveal
            style={delay140}
            className="mt-5 max-w-2xl text-lead text-secondary"
          >
            {lead}
          </p>
        ) : null}
        {children ? (
          <div
            data-reveal
            style={delay210}
            className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3"
          >
            {children}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
