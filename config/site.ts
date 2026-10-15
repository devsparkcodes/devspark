export type SocialLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  /**
   * Contact and profile links. `contactEmail` and the two social profiles
   * are confirmed and published; `github` is a technical/project profile
   * only (not a customer-support channel). `enrollmentFormUrl` and
   * `demoFormUrl` both point at the single published Google Form (interest
   * registration + free-demo participation); every component that reads
   * them renders a live link and the pending notes hide automatically.
   */
  links: {
    enrollmentFormUrl: string | null;
    demoFormUrl: string | null;
    contactEmail: string | null;
    social: SocialLink[];
    github: SocialLink | null;
  };
  copyrightYear: number;
};

export const siteConfig: SiteConfig = {
  name: "DevSpark",
  tagline: "Building AI Solutions",
  description:
    "DevSpark is a technology company building AI-powered solutions, workflow automation and custom software for real-world problems — and teaching the engineers behind them through the Generative AI Engineering program.",
  links: {
    enrollmentFormUrl: "https://forms.gle/xpjhjQgRXKfnbJds9",
    demoFormUrl: "https://forms.gle/xpjhjQgRXKfnbJds9",
    contactEmail: "devspark.codes@gmail.com",
    social: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/devsparkcodes/" },
      { label: "Instagram", href: "https://www.instagram.com/devsparkcodes/" },
    ],
    github: { label: "GitHub", href: "https://github.com/devsparkcodes" },
  },
  copyrightYear: 2026,
};
