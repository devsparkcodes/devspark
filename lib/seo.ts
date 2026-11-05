import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

/**
 * Domain-aware SEO base URL.
 *
 * The production hostname is not known yet (the site will first deploy to
 * a free Vercel domain whose exact host cannot be invented ahead of time),
 * so the real origin is read from `NEXT_PUBLIC_SITE_URL` when it is set:
 *
 *   - Set on the deployment platform AFTER the first deploy, then
 *     redeploy → canonical URLs, Open Graph tags, sitemap and robots
 *     activate automatically. No code change is needed.
 *   - While unset (local dev, or a deployment that has not configured it
 *     yet) `siteUrl` is null and absolute-URL metadata is simply omitted.
 *     The site therefore never emits a `localhost` canonical on production
 *     and never advertises a domain that does not exist.
 *
 * `NEXT_PUBLIC_` is required because the value must be inlined into the
 * static build; it is a public value and must never contain secrets.
 */
const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim();

function normalizeBase(value: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.origin; // no trailing slash — routes are appended as paths
  } catch {
    return null;
  }
}

/** Absolute origin of the deployed site, or null when not configured. */
export const siteUrl: string | null = normalizeBase(raw);

/** Absolute URL for a public route, or null when the site URL is unknown. */
export function absoluteUrl(path: string): string | null {
  if (!siteUrl) return null;
  const route = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${route}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  /** Root-relative route, e.g. "/courses". */
  path: string;
  /**
   * Root-relative page-specific Open Graph screenshot, e.g.
   * "/og/courses.png". Static preview images live in `public/og/` and
   * are captured manually (see docs/05_TECHNICAL_SPECIFICATION.md —
   * they are point-in-time screenshots, not regenerated on share).
   */
  image: string;
  /** Alt text for the OG image. Defaults to the page title. */
  imageAlt?: string;
};

/**
 * Per-page metadata: unique title/description (always), plus canonical +
 * Open Graph + Twitter tags only when the deployed site URL is known.
 * 404 and other non-indexable routes should keep a plain metadata object.
 *
 * Every page passes its own `image` (`public/og/…`) so shared links show
 * a real screenshot of that page. There is no shared generic image: the
 * old root `app/opengraph-image.tsx` was removed because file-based
 * metadata and exported `openGraph.images` competed unpredictably.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  if (!url) return { title, description };
  const imageUrl = absoluteUrl(image) ?? image;
  const alt = imageAlt ?? title;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
