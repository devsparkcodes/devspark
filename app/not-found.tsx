import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you are looking for could not be found on the DevSpark website.",
};

/**
 * Branded 404. Replaces the framework default, which injected its own
 * `body` colours (breaking the light theme) and rendered no `<main id="main">`
 * for the layout's skip link to target.
 */
export default function NotFound() {
  return (
    <main id="main">
      <PageHero
        label="404"
        title="This page could not be found"
        lead="The address may be incorrect, or the page may have moved. Nothing has been lost — the links below take you back in."
      >
        <Button href="/" variant="primary" showArrow>
          Back to the homepage
        </Button>
        <Button href="/guides" variant="outline">
          Browse the Help Center
        </Button>
      </PageHero>
    </main>
  );
}
