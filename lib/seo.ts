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
};

/**
 * Per-page metadata: unique title/description (always), plus canonical +
 * Open Graph + Twitter tags only when the deployed site URL is known.
 * 404 and other non-indexable routes should keep a plain metadata object.
 */
export function pageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  if (!url) return { title, description };
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
    },
    twitter: { card: "summary", title, description },
  };
}
