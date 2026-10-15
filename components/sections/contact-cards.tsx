import type { CSSProperties, ReactNode } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle";

import { ExternalLink } from "@/components/ui/external-link";
import { contact } from "@/config/content";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

function channelValue(status: string, label: string): ReactNode {
  const { contactEmail, social, github } = siteConfig.links;

  if (label === "Email") {
    return contactEmail ? (
      <a
        href={`mailto:${contactEmail}`}
        className="link-underline cursor-pointer break-words text-text"
      >
        {contactEmail.slice(0, contactEmail.indexOf("@") + 1)}
        <wbr />
        {contactEmail.slice(contactEmail.indexOf("@") + 1)}
      </a>
    ) : (
      <span className="text-muted">{status}</span>
    );
  }

  if (label === "Social profiles" && social.length > 0) {
    return (
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
    );
  }

  if (label === "GitHub (projects)" && github) {
    return (
      <ExternalLink
        href={github.href}
        className="link-underline cursor-pointer text-text"
      >
        {github.label}
      </ExternalLink>
    );
  }

  return <span className="text-muted">{status}</span>;
}

/** "What to include" card — homepage contact section and `/contact`. */
export function ContactChecklist({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      data-reveal
      className={cn(
        "rounded-card border border-border p-7 md:p-8",
        className
      )}
    >
      <h3 className="text-title">{contact.checklist.title}</h3>
      <ul className="mt-5 space-y-3.5">
        {contact.checklist.items.map((item) => (
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
      {children}
    </div>
  );
}

/** Contact-channels card with live/pending logic — homepage and `/contact`. */
export function ContactChannels({
  className,
  revealStyle,
}: {
  className?: string;
  revealStyle?: CSSProperties;
}) {
  return (
    <div
      data-reveal
      style={revealStyle}
      className={cn("rounded-card border border-border p-7 md:p-8", className)}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-title">{contact.channels.title}</h3>
        <span className="label rounded-full bg-accent px-2.5 py-1 text-[0.65rem] text-on-accent">
          {contact.channels.badge}
        </span>
      </div>
      <p className="mt-3 text-body-sm text-secondary">
        {contact.channels.note}
      </p>
      <dl className="mt-5 border-t border-border">
        {contact.channels.items.map((item) => (
          <div
            key={item.label}
            className="flex items-baseline justify-between gap-4 border-b border-border py-3 last:border-b-0"
          >
            <dt className="text-body-sm text-secondary">{item.label}</dt>
            <dd className="text-right text-body-sm text-text">
              {channelValue(item.status, item.label)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
