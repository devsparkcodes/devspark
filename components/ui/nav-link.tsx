"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  className?: string;
};

/**
 * Internal route link with an active state: `aria-current="page"` plus a
 * persistent orange underline (`.link-underline[data-active]` in globals).
 * `usePathname()` returns the same value on server and client, so the
 * attribute is hydration-safe.
 */
export function NavLink({ href, className, children, ...rest }: NavLinkProps) {
  const pathname = usePathname();
  const target = typeof href === "string" ? href : href.pathname ?? "";
  const active =
    target === "/"
      ? pathname === "/"
      : pathname === target || pathname.startsWith(`${target}/`);

  return (
    <Link
      {...rest}
      href={href}
      aria-current={active ? "page" : undefined}
      data-active={active ? "" : undefined}
      className={cn(
        "link-underline cursor-pointer font-medium text-text",
        className
      )}
    >
      {children}
    </Link>
  );
}
