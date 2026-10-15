import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Disclosure } from "@/components/ui/disclosure";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { faq } from "@/config/content";
import { revealDelay } from "@/lib/utils";

export function Faq() {
  return (
    <Section id="faq" aria-labelledby="faq-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading
              id="faq-title"
              index={faq.index}
              label={faq.label}
              title={faq.title}
              description={faq.description}
            />
          </div>

          <div className="lg:col-span-8">
            <ul className="border-t border-hairline">
              {faq.items.map((item, index) => (
                <li
                  key={item.question}
                  data-reveal
                  style={revealDelay(index * 80)}
                  className="border-b border-hairline"
                >
                  <Disclosure
                    trigger={<span className="text-title">{item.question}</span>}
                  >
                    <p className="max-w-2xl text-[0.975rem] leading-relaxed text-secondary">
                      {item.answer}
                    </p>
                  </Disclosure>
                </li>
              ))}
            </ul>
            <div data-reveal className="mt-7">
              <Button href="/guides" variant="outline" size="sm">
                Browse the Help Center
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
