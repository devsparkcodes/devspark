import Image from "next/image";
import Link from "next/link";

import darkFullLogo from "@/logos/trimmed/black-devspark.png";
import lightFullLogo from "@/logos/trimmed/white-devspark.png";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /**
   * Renders on the dark footer band: the official white-variant full logo
   * (white icon chevron + "Dev", orange bolt + "Spark") sits directly on the
   * dark background. Same trimmed asset geometry and display size as the
   * header logo, so the lockup keeps identical proportions everywhere.
   */
  onDark?: boolean;
  /** Preload (header only — it is above the fold). */
  priority?: boolean;
};

/**
 * The official DevSpark full lockup (icon + wordmark).
 *
 * Displayed assets are ink-tight derivatives of the approved originals in
 * `logos/Full logo/` (which remain untouched): a lossless crop to the exact
 * alpha bounds — 616×137, i.e. the transparent 842×596 export padding
 * removed, zero artwork pixels changed. Because the image box now equals
 * the visible ink, the flex `items-center` alignment in the header centers
 * the actual wordmark against the menu control at every breakpoint, with no
 * negative-margin or canvas-height compensation.
 *
 * Display height matches the previously approved visible size:
 * ~23.6px (mobile) / ~26.9px (desktop) of wordmark ink.
 */
export function Logo({ className, onDark = false, priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="DevSpark — home"
      className={cn(
        "group inline-flex cursor-pointer items-center transition-opacity duration-200 hover:opacity-80",
        className
      )}
    >
      <Image
        src={onDark ? lightFullLogo : darkFullLogo}
        alt=""
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 768px) 106px, 121px"
        className="h-[23.6px] w-auto max-w-none md:h-[26.9px]"
      />
    </Link>
  );
}
