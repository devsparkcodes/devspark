import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { HelpCenter } from "@/components/sections/help-center";
import { helpCenter } from "@/config/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Help Center",
  description:
    "Help using DevSpark: navigating the website, getting in touch, exploring solutions and requesting a project, and confirmed facts about courses and enrollment.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <main id="main">
      <PageHero
        label={helpCenter.label}
        title={helpCenter.title}
        lead={helpCenter.description}
      />

      <Section tone="surface">
        <Container>
          <HelpCenter categories={helpCenter.categories} />
        </Container>
      </Section>

      <Section>
        <Container>
          <div
            data-reveal
            className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 rounded-card border border-hairline bg-surface p-7 md:p-9"
          >
            <div className="max-w-xl">
              <h2 className="text-title">Still need help?</h2>
              <p className="mt-2 text-[0.975rem] leading-relaxed text-secondary">
                If a question is not answered here, the contact page is the
                place to ask — for support, or to discuss a project with
                DevSpark.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={helpCenter.solutionsCta.href} variant="outline">
                {helpCenter.solutionsCta.label}
              </Button>
              <Button href={helpCenter.programCta.href} variant="outline">
                {helpCenter.programCta.label}
              </Button>
              <Button href={helpCenter.contactCta.href} variant="primary" showArrow>
                {helpCenter.contactCta.label}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
