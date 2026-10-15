import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

/**
 * Production robots rules: the whole public site is crawlable — this file
 * must never block indexing. Only the contact API is disallowed (it is
 * not content and crawlers should not POST to it).
 *
 * The sitemap line is included only when `NEXT_PUBLIC_SITE_URL` is
 * configured, so robots.txt never advertises a wrong or unknown host
 * (see `lib/seo.ts`).
 */
export default function robots(): MetadataRoute.Robots {
  const rules = {
    userAgent: "*",
    allow: "/",
    disallow: ["/api/"],
  };
  const sitemap = absoluteUrl("/sitemap.xml");
  return sitemap ? { rules, sitemap } : { rules };
}
