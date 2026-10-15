import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/**
 * Content Security Policy.
 *
 * Next.js App Router serialises the RSC payload into inline `<script>`
 * tags, so `script-src` cannot drop `'unsafe-inline'` without breaking
 * hydration. `'unsafe-eval'` is required by the dev server's HMR runtime
 * only and is removed from the production policy. Inline `style`
 * attributes are used for staggered reveal delays (`lib/utils`), so
 * `style-src` keeps `'unsafe-inline'`.
 *
 * Fonts are self-hosted by `next/font` from `/_next/static/media`, so
 * `font-src 'self'` is sufficient and no third-party origin is needed.
 * The site loads no remote images or scripts.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isProd ? "" : " ws: wss:"}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  // Only meaningful once the site is served over HTTPS in production.
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

/**
 * Baseline security headers for every route (QA-004, QA-005).
 *
 * HSTS is deliberately NOT set here: the production domain is not
 * confirmed yet (docs/01), and sending `Strict-Transport-Security` from
 * an unverified host can pin browsers to HTTPS for a hostname that does
 * not serve it. Add it (or rely on the platform edge) once the domain
 * and HTTPS deployment are confirmed.
 */
const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), interest-cohort=()",
  },
  // Clickjacking: belt and braces — CSP `frame-ancestors 'none'` for
  // modern agents, `X-Frame-Options` for older ones.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    // The standalone FAQ was merged into the Help Center at /guides.
    return [
      {
        source: "/faq",
        destination: "/guides",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
