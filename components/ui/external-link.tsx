import type { AnchorHTMLAttributes, ReactNode } from "react";

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

/**
 * Link to another origin. Opens in a new tab (the convention for social
 * profiles) with `rel="noopener noreferrer"` so the new page cannot
 * reach back into this one, plus a visually hidden "(opens in a new
 * tab)" suffix so screen-reader and keyboard users are told the context
 * will change. Same-origin and `mailto:` links should stay plain anchors.
 */
export function ExternalLink({
  href,
  className,
  children,
  ...rest
}: ExternalLinkProps) {
  return (
    <a
      {...rest}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
