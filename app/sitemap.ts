import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

/**
 * Public, indexable routes only. API routes, the /faq → /guides redirect
 * and the 404 page are intentionally excluded.
 *
 * Returns an empty sitemap while `NEXT_PUBLIC_SITE_URL` is unset (local
 * dev, or deployment before the real URL is configured) — an empty sitemap
 * is safe; a wrong domain would not be. See `lib/seo.ts`.
 */
const PUBLIC_ROUTES = [
  "/",
  "/courses",
  "/guides",
  "/solutions",
  "/about",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = absoluteUrl("/");
  if (!base) return [];
  return PUBLIC_ROUTES.map((route) => ({
    // Next normalizes the home canonical to the bare origin (no trailing
    // slash) — the sitemap must match so crawlers see one canonical form.
    url: route === "/" ? base.replace(/\/$/, "") : (absoluteUrl(route) as string),
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));
}
