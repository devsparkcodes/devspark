import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/config/content";
import { revealDelay } from "@/lib/utils";

export function About() {
  const [opening, ...rest] = about.paragraphs;

  return (
    <Section id="about" tone="surface" aria-labelledby="about-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="about-title"
              index={about.index}
              label={about.label}
              title={about.title}
            />

            <div className="mt-6 space-y-4">
              <p data-reveal style={revealDelay(140)} className="text-lead text-secondary">
                {opening}
              </p>
              {rest.map((paragraph, index) => (
                <p
                  key={paragraph}
                  data-reveal
                  style={revealDelay(200 + index * 70)}
                  className="text-[0.975rem] leading-relaxed text-text/85"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="border-t border-hairline">
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
  );
}
