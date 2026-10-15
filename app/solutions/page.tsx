import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { SolutionsGrid } from "@/components/sections/solutions";
import { solutions } from "@/config/content";
import { pageMetadata } from "@/lib/seo";
import { revealDelay } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Solutions",
  description:
    "Focus areas DevSpark works on with businesses - AI-powered solutions, workflow automation and custom software. Scope and availability are confirmed per project.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <main id="main">
      <PageHero
        label={solutions.label}
        title={solutions.title}
        lead={solutions.description}
      >
        <Button href={solutions.cta.href} variant="primary" showArrow>
          {solutions.cta.label}
        </Button>
      </PageHero>

      <Section tone="surface">
        <Container>
          <div className="max-w-xl">
            <p className="label flex items-center gap-3 text-label text-secondary">
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              Categories
            </p>
            <h2 className="mt-5 text-title">Three focus areas to assess</h2>
          </div>

          <SolutionsGrid className="mt-8" />

          <div
            data-reveal
            style={revealDelay(120)}
            className="mt-10 rounded-card border border-hairline bg-background p-7 md:p-8"
          >
            <h3 className="label text-label text-secondary">
              {solutions.availability.title}
            </h3>
            <p className="mt-3 max-w-3xl text-[0.975rem] leading-relaxed text-secondary">
              {solutions.availability.body}
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
