import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  /** Optional line rendered directly beneath the `h2`, above the description. */
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
};

const delay70 = { "--reveal-delay": "70ms" } as CSSProperties;
const delay140 = { "--reveal-delay": "140ms" } as CSSProperties;

export function SectionHeading({
  index,
  label,
  title,
  subtitle,
  description,
  align = "left",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p
        data-reveal
        className={cn(
          "label flex items-center gap-3 text-label text-secondary",
          align === "center" && "justify-center",
        )}
      >
        <span aria-hidden="true" className="h-px w-8 bg-accent" />
        <span className="text-text">{index}</span>
        <span>{label}</span>
      </p>
      <h2
        id={id}
        data-reveal
        style={delay70}
        className="mt-5 text-headline text-text"
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          data-reveal
          style={delay140}
          className="mt-4 text-title text-secondary"
        >
          {subtitle}
        </p>
      ) : null}
      {description ? (
        <p data-reveal style={delay140} className="mt-5 max-w-2xl text-lead text-secondary">
          {description}
        </p>
      ) : null}
    </div>
  );
}
