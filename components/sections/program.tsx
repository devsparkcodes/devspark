import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CohortTimeline } from "@/components/sections/cohort-timeline";
import { program } from "@/config/content";
import { siteConfig } from "@/config/site";
import { cn, revealDelay } from "@/lib/utils";

const chips = [
  "Starts Nov 30, 2026",
  "8 weeks · 24 sessions",
  "Live online",
  "Two free demo classes",
];

type CtaProps = { variant?: "primary" | "outline"; className?: string };

/**
 * Safe new-tab behaviour for the external Google Form: `target="_blank"`
 * only with `rel="noopener noreferrer"`, plus an aria-label that tells
 * assistive technology the link opens the form in a new tab. The visible
 * label stays exactly the approved CTA text — the aria-label simply
 * prepends that same text so it is never replaced by something shorter.
 * Applied at the two central `config/site.ts` readers below, so every
 * registration link shares one definition.
 */
function formLinkProps(label: string) {
  return {
    target: "_blank" as const,
    rel: "noopener noreferrer",
    "aria-label": `${label} (opens the Google Form in a new tab)`,
  };
}

/**
 * Enrollment button: a real link the moment `enrollmentFormUrl` exists in
 * `config/site.ts`; until then a non-functional control that keyboard and
 * screen-reader users still encounter, with `EnrollStatus` explaining why.
 */
export function EnrollButton({ variant = "outline", className }: CtaProps) {
  const url = siteConfig.links.enrollmentFormUrl;
  if (url) {
    return (
      <Button
        href={url}
        variant={variant}
        showArrow
        className={className}
        {...formLinkProps(program.enrollCta)}
      >
        {program.enrollCta}
      </Button>
    );
  }
  return (
    <Button
      variant={variant}
      aria-disabled="true"
      aria-describedby="enroll-status"
      className={className}
    >
      {program.enrollCta}
    </Button>
  );
}

/** Pending note paired with `EnrollButton` — hidden once the form URL exists. */
export function EnrollStatus({ className }: { className?: string }) {
  if (siteConfig.links.enrollmentFormUrl) return null;
  return (
    <p
      id="enroll-status"
      className={cn(
        "mt-4 flex max-w-md items-start gap-2.5 text-body-sm text-secondary",
        className
      )}
    >
      <span className="label mt-0.5 shrink-0 rounded-full bg-accent px-2 py-0.5 text-[0.65rem] text-on-accent">
        Pending
      </span>
      <span>{program.enrollStatus}</span>
    </p>
  );
}

/** Free-demo registration button — same pending behaviour as `EnrollButton`. */
export function DemoButton({ variant = "primary", className }: CtaProps) {
  const url = siteConfig.links.demoFormUrl;
  if (url) {
    return (
      <Button
        href={url}
        variant={variant}
        showArrow
        className={className}
        {...formLinkProps(program.demoCta)}
      >
        {program.demoCta}
      </Button>
    );
  }
  return (
    <Button
      variant={variant}
      aria-disabled="true"
      aria-describedby="demo-status"
      className={className}
    >
      {program.demoCta}
    </Button>
  );
}

/** Pending note paired with `DemoButton` — hidden once the form URL exists. */
export function DemoStatus({ className }: { className?: string }) {
  if (siteConfig.links.demoFormUrl) return null;
  return (
    <p
      id="demo-status"
      className={cn(
        "mt-4 flex max-w-md items-start gap-2.5 text-body-sm text-secondary",
        className
      )}
    >
      <span className="label mt-0.5 shrink-0 rounded-full bg-accent px-2 py-0.5 text-[0.65rem] text-on-accent">
        Pending
      </span>
      <span>{program.demoStatus}</span>
    </p>
  );
}

/** Program facts table — shared by the homepage section and `/courses`. */
export function ProgramFacts({ className }: { className?: string }) {
  return (
    <dl
      className={cn(
        "rounded-card border border-hairline bg-surface p-2 md:p-3",
        className
      )}
    >
      {program.facts.map((fact, index) => (
        <div
          key={fact.term}
          className={
            "flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 " +
            (index < program.facts.length - 1 ? "border-b border-border" : "")
          }
        >
          <dt className="label shrink-0 text-label text-secondary">
            {fact.term}
          </dt>
          <dd className="text-[0.975rem] leading-snug text-text sm:text-right">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Program() {
  return (
    <Section id="courses" aria-labelledby="courses-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <SectionHeading
              id="courses-title"
              index={program.index}
              label={program.label}
              title={program.title}
              subtitle={program.subtitle}
              description={program.description}
            />

            <div data-reveal style={revealDelay(200)} className="mt-8 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-body-sm text-secondary"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div data-reveal style={revealDelay(280)} className="mt-9">
              <EnrollButton />
              <EnrollStatus />
            </div>
          </div>

          <div data-reveal style={revealDelay(160)} className="lg:col-span-6">
            <ProgramFacts />
          </div>
        </div>

        <div data-reveal style={revealDelay(360)} className="mt-12 lg:mt-14">
          <CohortTimeline />
        </div>
      </Container>
    </Section>
  );
}
