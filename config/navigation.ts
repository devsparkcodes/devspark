export type NavItem = {
  label: string;
  href: string;
};

/**
 * Primary navigation (docs/03): Home is served by the logo → `/`.
 * "Help" points to the Help Center at `/guides` (the former standalone
 * FAQ page redirects there). Destinations are real routes.
 */
export const primaryNav: NavItem[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Help", href: "/guides" },
  { label: "Contact", href: "/contact" },
];

export const headerCta: NavItem = {
  label: "Discuss a Project",
  href: "/contact?topic=project#contact-form",
};
