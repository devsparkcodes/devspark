import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";

import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "quiet" | "onDark";
type Size = "md" | "sm";

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-accent hover:text-on-accent",
  accent: "bg-accent text-on-accent hover:bg-primary hover:text-on-primary",
  outline: "border border-primary text-primary hover:bg-primary hover:text-on-primary",
  quiet: "text-primary hover:bg-primary/5",
  onDark:
    "border border-on-primary/40 text-on-primary hover:bg-on-primary hover:text-primary",
};

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-3 text-[0.95rem]",
  sm: "px-4 py-2 text-sm",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-200 cursor-pointer select-none disabled:pointer-events-none disabled:opacity-60 aria-disabled:pointer-events-none aria-disabled:opacity-60 aria-disabled:cursor-not-allowed";

type ButtonOwnProps = {
  variant?: Variant;
  size?: Size;
  showArrow?: boolean;
  className?: string;
  children: ReactNode;
  href?: string;
};

export type ButtonProps = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type AnchorRest = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "children" | "href"
>;

export function Button({
  variant = "primary",
  size = "md",
  showArrow = false,
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
  const arrow = showArrow ? (
    <ArrowRight aria-hidden size={17} weight="bold" className="shrink-0" />
  ) : null;

  if (href !== undefined) {
    // Internal routes use <Link> (also required by @next/next/no-html-link-for-pages);
    // in-page anchors (#…) and external URLs stay plain anchors.
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes} {...(rest as AnchorRest)}>
          {children}
          {arrow}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...(rest as AnchorRest)}>
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <button {...rest} type={rest.type ?? "button"} className={classes}>
      {children}
      {arrow}
    </button>
  );
}
