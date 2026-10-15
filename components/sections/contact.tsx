import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  ContactChecklist,
  ContactChannels,
} from "@/components/sections/contact-cards";
import { contact } from "@/config/content";
import { revealDelay } from "@/lib/utils";

export function Contact() {
  return (
    <Section id="contact" tone="dark" aria-labelledby="contact-title">
      <Container>
        <SectionHeading
          id="contact-title"
          index={contact.index}
          label={contact.label}
          title={contact.title}
          description={contact.description}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <ContactChecklist>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="accent" size="sm" showArrow>
                Contact Us
              </Button>
              <Button
                href={contact.secondaryCta.href}
                variant="onDark"
                size="sm"
              >
                {contact.secondaryCta.label}
              </Button>
              <span className="text-body-sm text-secondary">
                Enrollment questions start there too.
              </span>
            </div>
          </ContactChecklist>

          <ContactChannels revealStyle={revealDelay(110)} />
        </div>
      </Container>
    </Section>
  );
}
