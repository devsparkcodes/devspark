import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroBlueprint } from "@/components/sections/hero-blueprint";
import { HeroNetwork } from "@/components/sections/hero-network";
import { hero } from "@/config/content";
import { revealDelay } from "@/lib/utils";

const focusAreas = ["AI solutions", "Workflow automation", "Custom software"];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-background pb-16 pt-12 md:pb-24 md:pt-16"
    >
      <HeroNetwork />
      <div
        aria-hidden="true"
        className="grid-fade pointer-events-none absolute inset-0"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p
              data-reveal
              className="label flex items-center gap-3 text-label text-secondary"
            >
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              {hero.eyebrow}
            </p>

            <h1 data-reveal style={revealDelay(70)} className="mt-7 text-display">
              {hero.title}
            </h1>

            <p
              data-reveal
              style={revealDelay(150)}
              className="mt-7 max-w-xl text-lead text-secondary"
            >
              {hero.lead}
            </p>

            <div
              data-reveal
              style={revealDelay(230)}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button href={hero.primaryCta.href} variant="primary" showArrow>
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="outline">
                {hero.secondaryCta.label}
              </Button>
            </div>

            <p
              data-reveal
              style={revealDelay(310)}
              className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-body-sm text-secondary"
            >
              <span className="label text-label">Proposed focus areas</span>
              {focusAreas.map((area) => (
                <span key={area} className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="size-1 rounded-full bg-accent" />
                  {area}
                </span>
              ))}
            </p>
          </div>

          <div
            data-reveal
            style={revealDelay(200)}
            className="pr-3 sm:pr-4 lg:col-span-5"
          >
            <HeroBlueprint />
          </div>
        </div>
      </Container>
    </section>
  );
}
