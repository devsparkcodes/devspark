import { Cpu } from "@phosphor-icons/react/dist/ssr/Cpu";
import { FlowArrow } from "@phosphor-icons/react/dist/ssr/FlowArrow";
import { TerminalWindow } from "@phosphor-icons/react/dist/ssr/TerminalWindow";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { solutions } from "@/config/content";
import { cn, revealDelay } from "@/lib/utils";

const icons = {
  cpu: Cpu,
  flowArrow: FlowArrow,
  terminal: TerminalWindow,
} as const;

/** The three focus-area cards — shared by the homepage section and `/solutions`. */
export function SolutionsGrid({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {solutions.items.map((item, index) => {
        const Icon = icons[item.icon as keyof typeof icons];

        return (
          <article
            key={item.title}
            data-reveal
            style={revealDelay(index * 90)}
            className={cn(
              "flex h-full flex-col rounded-card border border-hairline bg-background p-7",
              "transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-panel",
            )}
          >
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-soft">
              {Icon ? <Icon aria-hidden size={22} /> : null}
            </span>
            <h3 className="mt-6 text-title">{item.title}</h3>
            <p className="mt-3 text-[0.975rem] leading-relaxed text-secondary">
              {item.body}
            </p>
          </article>
        );
      })}
    </div>
  );
}

export function Solutions() {
  return (
    <Section id="solutions" tone="surface" aria-labelledby="solutions-title">
      <Container>
        <SectionHeading
          id="solutions-title"
          index={solutions.index}
          label={solutions.label}
          title={solutions.title}
          description={solutions.description}
        />

        <SolutionsGrid className="mt-12" />

        <div
          data-reveal
          style={revealDelay(120)}
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <Button href={solutions.cta.href} variant="outline" showArrow>
            {solutions.cta.label}
          </Button>
          <p className="text-body-sm text-secondary">
            Scope and availability are confirmed per project.
          </p>
        </div>
      </Container>
    </Section>
  );
}
