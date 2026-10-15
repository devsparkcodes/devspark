import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { ExternalLink } from "@/components/ui/external-link";
import { Logo } from "@/components/ui/logo";
import { NavLink } from "@/components/ui/nav-link";
import { primaryNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

function ContactRow({
  label,
  wrap = false,
  children,
}: {
  label: string;
  /** Let the value drop to its own line when it cannot fit beside the
      label — only used for the email row (VIS-001). */
  wrap?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4",
        wrap && "flex-wrap"
      )}
    >
      {/* No `shrink-0`: in the narrow `lg:col-span-2` Contact column at
          1024px, the long "GitHub (projects)" label must be allowed to wrap
          or it overflows the viewport by ~11px (flex won't compress a
          shrink-0 item). Short labels ("Email", "Social") never shrink.
          `wrap` (VIS-001): "devspark.codes@" needs ~120px, more than the
          ~70–102px left beside the label at ≥1024px, so the email drops to
          its own full-width line and breaks after "@" instead of mid-token. */}
      <dt className="text-body-sm text-secondary">{label}</dt>
      <dd className="text-right text-body-sm text-text">{children}</dd>
    </div>
  );
}

export function SiteFooter() {
  const { contactEmail, social, github } = siteConfig.links;

  return (
    <footer className="band-dark border-t border-hairline">
      <Container className="py-14 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo onDark />
            <p className="mt-4 max-w-sm text-body-sm text-secondary">
              {siteConfig.tagline} — a technology company solving real-world
              problems, with education as one of its verticals.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="label text-label text-secondary">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href} className="text-body-sm">
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="label text-label text-secondary">Program</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <NavLink href="/courses" className="text-body-sm">
                  Generative AI Engineering
                </NavLink>
              </li>
              <li>
                <NavLink href="/courses#register" className="text-body-sm">
                  Registration is open
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="label text-label text-secondary">Contact</p>
            <dl className="mt-4 space-y-3">
              <ContactRow label="Email" wrap>
                {contactEmail ? (
                  <a
                    href={`mailto:${contactEmail}`}
                    className="link-underline cursor-pointer break-words text-text"
                  >
                    {contactEmail.slice(
                      0,
                      contactEmail.indexOf("@") + 1
                    )}
                    <wbr />
                    {contactEmail.slice(contactEmail.indexOf("@") + 1)}
                  </a>
                ) : (
                  <span className="text-muted">To be confirmed</span>
                )}
              </ContactRow>
              <ContactRow label="Social">
                {social.length > 0 ? (
                  <ul className="flex flex-wrap justify-end gap-x-3 gap-y-1">
                    {social.map((link) => (
                      <li key={link.href}>
                        <ExternalLink
                          href={link.href}
                          className="link-underline cursor-pointer text-text"
                        >
                          {link.label}
                        </ExternalLink>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-muted">Not yet published</span>
                )}
              </ContactRow>
              <ContactRow label="GitHub (projects)">
                {github ? (
                  <ExternalLink
                    href={github.href}
                    className="link-underline cursor-pointer text-text"
                  >
                    {github.label}
                  </ExternalLink>
                ) : (
                  <span className="text-muted">To be confirmed</span>
                )}
              </ContactRow>
            </dl>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-body-sm text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.name}
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
