import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import {
  ContactChecklist,
  ContactChannels,
} from "@/components/sections/contact-cards";
import { ContactForm } from "@/components/sections/contact-form";
import { contact } from "@/config/content";
import { pageMetadata } from "@/lib/seo";
import { revealDelay } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact DevSpark: questions and support, or a project inquiry for custom software, AI solutions and workflow automation.",
  path: "/contact",
});

type ContactPageProps = {
  searchParams: Promise<{ topic?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { topic } = await searchParams;
  const defaultCategory = topic === "project" ? "project" : "general";

  return (
    <main id="main">
      <PageHero
        label={contact.label}
        title={contact.title}
        lead={contact.description}
      />

      <Section tone="dark">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {contact.paths.items.map((path, index) => (
              <div
                key={path.slug}
                data-reveal
                style={revealDelay(index * 80)}
                className="flex flex-col rounded-card border border-border p-7 md:p-8"
              >
                <h2 className="text-title">{path.title}</h2>
                <p className="mt-3 flex-1 text-[0.975rem] leading-relaxed text-secondary">
                  {path.body}
                </p>
                <div className="mt-6">
                  <Button
                    href={path.cta.href}
                    variant="onDark"
                    size="sm"
                    showArrow={path.slug === "project"}
                  >
                    {path.cta.label}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-12">
            <div
              id="contact-form"
              data-reveal
              className="scroll-mt-28 lg:col-span-7"
            >
              <ContactForm
                key={defaultCategory}
                defaultCategory={defaultCategory}
              />
            </div>

            <div className="grid content-start gap-5 lg:col-span-5">
              <ContactChannels revealStyle={revealDelay(90)} />
              <ContactChecklist />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
