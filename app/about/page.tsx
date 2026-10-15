import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { about } from "@/config/content";
import { pageMetadata } from "@/lib/seo";
import { revealDelay } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "DevSpark is a technology company solving real-world problems across AI solutions, automation and software development - with education as one of its verticals.",
  path: "/about",
});

export default function AboutPage() {
  const [, ...paragraphs] = about.paragraphs;

  return (
    <main id="main">
      <PageHero
        label={about.label}
        title={about.title}
        lead={about.paragraphs[0]}
      >
        <Button href="/courses" variant="outline">
          Explore the Program
        </Button>
        <Button
          href="/contact?topic=project#contact-form"
          variant="primary"
          showArrow
        >
          Discuss a Project
        </Button>
      </PageHero>

      <Section tone="surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="space-y-4">
                {paragraphs.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    data-reveal
                    style={revealDelay(index * 70)}
                    className="text-[0.975rem] leading-relaxed text-text/85"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="max-w-xl">
                <p className="label flex items-center gap-3 text-label text-secondary">
                  <span aria-hidden="true" className="h-px w-8 bg-accent" />
                  Principles
                </p>
                <h2 className="mt-5 text-title">What guides the work</h2>
              </div>
              <ol className="mt-7 border-t border-hairline">
                {about.principles.map((principle, index) => (
                  <li
                    key={principle.title}
                    data-reveal
                    style={revealDelay(index * 110)}
                    className="grid gap-3 border-b border-hairline py-7 sm:grid-cols-[4.5rem_1fr] sm:gap-6"
                  >
                    <span
                      aria-hidden="true"
                      className="font-heading text-[2rem] font-semibold leading-none tracking-tight text-text"
                    >
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-title">{principle.title}</h3>
                      <p className="mt-2 text-[0.975rem] leading-relaxed text-secondary">
                        {principle.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
