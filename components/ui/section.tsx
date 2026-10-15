import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  tone?: "background" | "surface" | "dark";
  className?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
};

const toneClasses: Record<NonNullable<SectionProps["tone"]>, string> = {
  background: "bg-background",
  surface: "bg-surface",
  dark: "band-dark",
};

export function Section({ id, tone = "background", className, children, ...rest }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-20 md:py-28", toneClasses[tone], className)}
      {...rest}
    >
      {children}
    </section>
  );
}
