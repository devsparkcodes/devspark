import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionReveal } from "@/components/motion-reveal";
import { siteConfig } from "@/config/site";
import { siteUrl } from "@/lib/seo";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  // Absolute-URL SEO tags (metadataBase, home canonical, default Open
  // Graph) appear only once NEXT_PUBLIC_SITE_URL is configured with the
  // real deployment origin — never for localhost and never for an
  // invented domain. Child pages add their own canonical/OG through
  // `pageMetadata` in `lib/seo.ts`. HSTS intentionally stays unset in
  // next.config.ts until the hostname and HTTPS behaviour are verified.
  ...(siteUrl
    ? {
        metadataBase: new URL(siteUrl),
        alternates: { canonical: "/" },
        openGraph: {
          title: `${siteConfig.name} — ${siteConfig.tagline}`,
          description: siteConfig.description,
          url: `${siteUrl}/`,
          siteName: siteConfig.name,
          type: "website",
          locale: "en_US",
        },
        twitter: {
          card: "summary",
          title: `${siteConfig.name} — ${siteConfig.tagline}`,
          description: siteConfig.description,
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${inter.variable}`}
    >
      <body>
        <noscript>
          <div className="border-b border-accent/30 bg-accent-soft px-4 py-3 text-center text-sm text-text">
            JavaScript is disabled in your browser. Interactive curriculum details, Help Center search, and contact form submission require JavaScript. You can reach DevSpark directly at{" "}
            <a
              href="mailto:devspark.codes@gmail.com"
              className="font-medium underline underline-offset-4"
            >
              devspark.codes@gmail.com
            </a>
            .
          </div>
        </noscript>
        <MotionReveal />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-on-primary"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
