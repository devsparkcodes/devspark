import Image from "next/image";
import Link from "next/link";

import darkFullLogo from "@/logos/Full logo/black-devspark.png";
import lightFullLogo from "@/logos/Full logo/white-devspark.png";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /**
   * Renders on the dark footer band: the official white-variant full logo
   * (white icon chevron + "Dev", orange bolt + "Spark") sits directly on the
   * dark background. Its 842×596 canvas includes the original transparent
   * padding, which is left intact — only a display width is chosen so the
   * visible ink matches the header logo's weight.
   */
  onDark?: boolean;
  /** Preload (header only — it is above the fold). */
  priority?: boolean;
};

/**
 * The official DevSpark full lockup (icon + wordmark), imported directly
 * from the approved originals in `logos/` — no copies, crops or recolors.
 *
 * - Light backgrounds: `logos/Full logo/black-devspark.png`
 *   (842×596 canvas with original transparent padding, black Dev + orange Spark).
 * - Dark backgrounds (`onDark`): `logos/Full logo/white-devspark.png`
 *   (842×596 canvas with the original transparent padding, white Dev +
 *   orange Spark). Displayed at its natural aspect ratio; the padding is
 *   part of the asset and is never cropped or compensated with transforms.
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
        sizes={onDark ? "(max-width: 768px) 145px, 165px" : "(max-width: 768px) 175px, 200px"}
        className={
          onDark
            ? "h-auto w-[145px] md:w-[165px]"
            : // The asset carries a padded 842×596 canvas (ink 616×137 at
              // (107,219)). These canvas heights make the visible wordmark
              // ~28px (mobile) / ~32px (desktop) tall; max-w-none defeats
              // preflight's img max-width clamp and the negative horizontal
              // margins cancel the canvas padding so the link's layout box
              // equals the ink width and the ink starts flush with the
              // container's content edge. Aspect ratio is never altered.
              "h-[102.7px] w-auto max-w-none -mx-[19.5px] md:h-[116.9px] md:-mx-[22.2px]"
        }
      />
    </Link>
  );
}
