import type { Metadata } from "next";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Disclosure } from "@/components/ui/disclosure";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { DemoButton, DemoStatus, ProgramFacts } from "@/components/sections/program";
import { CurriculumGrid } from "@/components/sections/curriculum-grid";
import { program } from "@/config/content";
import { pageMetadata } from "@/lib/seo";
import { revealDelay } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Generative AI Engineering - Level 01, Cohort 01",
  description:
    "A live online Generative AI course for beginners, taught in Urdu: 8 weeks, 24 sessions, starting Monday, November 30, 2026. PKR 4,000 one-time fee - the first two sessions are free.",
  path: "/courses",
});

/** Subpage section heading: eyebrow label + h2 + optional intro (no index). */
function CourseHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="label flex items-center gap-3 text-label text-secondary">
        <span aria-hidden="true" className="h-px w-8 bg-accent" />
        {label}
      </p>
      <h2 className="mt-5 text-title">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-[0.975rem] leading-relaxed text-secondary">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-[0.975rem] leading-relaxed text-secondary"
        >
          <CheckCircle
            aria-hidden
            size={18}
            className="mt-0.5 shrink-0 text-accent"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CoursesPage() {
  return (
    <main id="main">
      <PageHero
        label={program.label}
        title="Generative AI Engineering"
        subtitle="Level 01 · Cohort 01"
        lead={program.description}
      >
        <Button href="#register" variant="primary" showArrow>
          How to register
        </Button>
        <span
          id="hero-status"
          className="flex max-w-md items-start gap-2.5 text-body-sm text-secondary"
        >
          <span className="label mt-0.5 shrink-0 rounded-full bg-accent px-2 py-0.5 text-[0.65rem] text-on-accent">
            Open
          </span>
          <span>
            Registration is open through a Google Form — the first two
            sessions are free to attend.
          </span>
        </span>
      </PageHero>

      {/* 1 — Key information */}
      <Section tone="surface">
        <Container>
          <CourseHeading
            label="Key information"
            title="Course at a glance"
            description="The core details below are confirmed for Cohort 01 — dates, schedule, time, fee and the free demo classes."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div data-reveal className="lg:col-span-7">
              <ProgramFacts />
            </div>
            <div
              data-reveal
              style={revealDelay(120)}
              className="rounded-card border border-hairline bg-background p-7 md:p-8 lg:col-span-5"
            >
              <span className="label inline-flex rounded-full bg-accent px-2.5 py-1 text-[0.65rem] text-on-accent">
                Free
              </span>
              <h3 className="mt-4 font-heading text-[1.15rem] font-semibold">
                First two sessions free
              </h3>
              <ul className="mt-4 space-y-3">
                <li className="flex gap-3 text-[0.975rem] leading-relaxed text-text">
                  <CheckCircle
                    aria-hidden
                    size={18}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <span>Monday, November 30, 2026</span>
                </li>
                <li className="flex gap-3 text-[0.975rem] leading-relaxed text-text">
                  <CheckCircle
                    aria-hidden
                    size={18}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <span>Wednesday, December 2, 2026</span>
                </li>
              </ul>
              <p className="mt-5 text-body-sm leading-relaxed text-secondary">
                Both sessions run 7:30 PM – 9:30 PM (Pakistan Standard Time,
                UTC+5). Free-demo registration is open — see the registration
                section below.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2 — Audience and learning outcomes */}
      <Section>
        <Container>
          <CourseHeading
            label="Suitability"
            title="Who it is for — and what you will learn"
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div data-reveal className="lg:col-span-5">
              <h3 className="font-heading text-[1.15rem] font-semibold">
                {program.audience.title}
              </h3>
              <p className="mt-3 text-[0.975rem] leading-relaxed text-secondary">
                {program.audience.body}
              </p>
              <p className="label mt-6 text-label text-secondary">
                Recommended prerequisites
              </p>
              <CheckList items={program.audience.prerequisites} />
            </div>

            <div data-reveal style={revealDelay(120)} className="lg:col-span-7">
              <h3 className="font-heading text-[1.15rem] font-semibold">
                What you will be able to do
              </h3>
              <ol className="mt-5 space-y-3.5">
                {program.outcomes.map((outcome, index) => (
                  <li
                    key={outcome}
                    className="flex gap-4 text-[0.975rem] leading-relaxed"
                  >
                    <span className="label mt-0.5 shrink-0 text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-secondary">{outcome}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-7 border-l-2 border-accent pl-4 text-body-sm leading-relaxed text-secondary">
                {program.outcomesNote}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3 — Eight-week curriculum */}
      <Section id="curriculum" tone="surface">
        <Container>
          <CourseHeading
            label="Curriculum"
            title="Eight-week course outline"
            description="Each card lists its topics, a practical outcome and its assessment. Hover to preview a week, then click or tap to pin it open."
          />
          <CurriculumGrid weeks={program.weeks} />
        </Container>
      </Section>

      {/* 4 — Teaching methodology and materials */}
      <Section>
        <Container>
          <CourseHeading
            label="Methodology"
            title="How classes are taught"
            description={program.methodology.delivery}
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div data-reveal className="lg:col-span-7">
              <CheckList items={program.methodology.points} />
              <ul className="mt-6 space-y-2">
                {program.methodology.notes.map((note) => (
                  <li
                    key={note}
                    className="text-[0.975rem] leading-relaxed text-text"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </div>
            <div
              data-reveal
              style={revealDelay(120)}
              className="rounded-card border border-hairline bg-surface p-7 md:p-8 lg:col-span-5"
            >
              <h3 className="font-heading text-[1.15rem] font-semibold">
                {program.materials.title}
              </h3>
              <CheckList items={program.materials.items} />
              <p className="mt-5 border-t border-hairline pt-4 text-body-sm leading-relaxed text-secondary">
                {program.materials.note}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5 — Assessment */}
      <Section id="assessment" tone="surface">
        <Container>
          <CourseHeading
            label="Assessment"
            title={program.assessment.title}
            description={program.assessment.description}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {program.assessment.items.map((item, index) => (
              <div
                key={item.label}
                data-reveal
                style={revealDelay(index * 80)}
                className="rounded-card border border-hairline bg-background p-6"
              >
                <h3 className="font-heading text-[1.05rem] font-semibold">
                  {item.label}
                </h3>
                <p className="mt-2 text-[0.975rem] leading-relaxed text-secondary">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
          <div
            data-reveal
            className="mt-6 rounded-card border border-hairline bg-background p-6 md:p-7"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <p className="text-title">Total: {program.assessment.total}</p>
              <p className="label text-accent">6 × 10 + 15 + 25 = 100</p>
            </div>
            <p className="mt-3 text-[0.975rem] leading-relaxed text-secondary">
              {program.assessment.published}
            </p>
            <p className="mt-2 text-body-sm text-secondary">
              {program.assessment.deadline}
            </p>
          </div>
        </Container>
      </Section>

      {/* 6 — Certificate and awards */}
      <Section>
        <Container>
          <CourseHeading
            label="Recognition"
            title="Certificate and top-student awards"
            description="Both are planned course benefits. The complete terms are published before paid enrollment opens."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div
              data-reveal
              className="rounded-card border border-hairline bg-surface p-7 md:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-heading text-[1.15rem] font-semibold">
                  {program.certificate.title}
                </h3>
                <span className="label inline-flex shrink-0 whitespace-nowrap rounded-full bg-accent px-2.5 py-1 text-[0.65rem] text-on-accent">
                  {program.certificate.status}
                </span>
              </div>
              <p className="mt-3 text-[0.975rem] leading-relaxed text-secondary">
                {program.certificate.body}
              </p>
              <p className="label mt-5 text-label text-secondary">
                Eligibility requirements
              </p>
              <CheckList items={program.certificate.requirements} />
            </div>
            <div
              data-reveal
              style={revealDelay(120)}
              className="rounded-card border border-hairline bg-surface p-7 md:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-heading text-[1.15rem] font-semibold">
                  {program.awards.title}
                </h3>
                <span className="label inline-flex shrink-0 whitespace-nowrap rounded-full bg-accent px-2.5 py-1 text-[0.65rem] text-on-accent">
                  {program.awards.status}
                </span>
              </div>
              <p className="mt-3 text-[0.975rem] leading-relaxed text-secondary">
                {program.awards.pending}
              </p>
              <p className="mt-3 text-[0.975rem] leading-relaxed text-secondary">
                {program.awards.body}
              </p>
              <p className="label mt-5 text-label text-secondary">
                Eligibility requirements
              </p>
              <CheckList items={program.awards.requirements} />
              <p className="mt-5 border-t border-hairline pt-4 text-body-sm leading-relaxed text-secondary">
                {program.awards.note}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7 — Registration CTA area */}
      <Section id="register" tone="surface">
        <Container>
          <CourseHeading
            label={program.registration.label}
            title={program.registration.title}
            description={program.registration.description}
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div data-reveal className="lg:col-span-6">
              <div className="rounded-card border border-hairline bg-background p-7 md:p-8">
                <DemoButton variant="primary" className="w-full sm:w-auto" />
                <DemoStatus />
                <p className="mt-6 border-t border-hairline pt-5 text-body-sm leading-relaxed text-secondary">
                  {program.registration.noPayment}
                </p>
              </div>
            </div>

            <div data-reveal style={revealDelay(120)} className="lg:col-span-6">
              <h3 className="font-heading text-[1.15rem] font-semibold">
                How enrollment works
              </h3>
              <ol className="mt-5 border-t border-hairline">
                {program.journey.map((step) => (
                  <li
                    key={step.step}
                    className="grid gap-3 border-b border-hairline py-5 sm:grid-cols-[3.5rem_1fr] sm:gap-5"
                  >
                    <span
                      aria-hidden="true"
                      className="font-heading text-[1.4rem] font-semibold leading-none tracking-tight text-text"
                    >
                      {step.step}
                    </span>
                    <div>
                      <h4 className="text-[1.02rem] font-semibold">
                        {step.title}
                      </h4>
                      <p className="mt-2 text-[0.975rem] leading-relaxed text-secondary">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      {/* 8 — Course FAQs */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <CourseHeading
                label="FAQ"
                title="Course questions and answers"
                description="Only confirmed information is published here — anything still undecided stays clearly marked as pending."
              />
            </div>
            <div className="lg:col-span-8">
              <ul className="border-t border-hairline">
                {program.faqs.map((item, index) => (
                  <li
                    key={item.question}
                    data-reveal
                    style={revealDelay(index * 60)}
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

      {/* Closing CTA */}
      <Section>
        <Container>
          <div
            data-reveal
            className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 rounded-card border border-hairline bg-surface p-7 md:p-9"
          >
            <div className="max-w-xl">
              <h2 className="text-title">Still deciding?</h2>
              <p className="mt-2 text-[0.975rem] leading-relaxed text-secondary">
                The Help Center covers enrollment, the free demo classes and
                everything that is still to be confirmed.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/guides" variant="outline">
                Browse the Help Center
              </Button>
              <Button
                href="/contact?topic=project#contact-form"
                variant="primary"
                showArrow
              >
                Discuss a Project
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
