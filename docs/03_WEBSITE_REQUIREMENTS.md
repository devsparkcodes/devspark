# Website Requirements

## Navigation
Logo → Home (`/`), then **Solutions · Courses · About · Help · Contact**, plus a "Discuss a Project" CTA. `Help` points to the Help Center at `/guides`; there are no separate Guides or FAQ navigation entries. The former `/faq` route permanently redirects (`308`) to `/guides`. Do not show Products or empty product cards in V1.

## Home
Establish DevSpark’s company identity and route visitors to Solutions, Courses or Contact. Suggested sections: hero/tagline, company statement, Solutions preview, current learning program, working principles, real guides/resources if available, FAQ preview, contact CTA and footer.

Draft hero copy (not locked): “We build intelligent software, AI-powered solutions and automation experiences to help solve real-world problems.” Final copy is TBD.

## Solutions
Help businesses contact DevSpark to discuss a problem or requirement. Possible categories to assess: AI-powered solutions, workflow automation and custom software. These are proposed categories, not proof that every service is currently available. Clearly distinguish available services from future capabilities. Include a “Discuss a Project” CTA. No invented clients, case studies, metrics or guarantees.

## Courses
Show **Generative AI Engineering — Level 01, Cohort 01**. Published facts: 8 weeks · 24 live sessions, Monday/Wednesday/Friday 7:30–9:30 PM Pakistan Standard Time, starts Monday, November 30, 2026, teaching platform Google Meet (confirmed; joining details shared privately with registered and confirmed students), standard fee PKR 4,000 one-time with Cohort 01 introductory early-bird PKR 3,000 (25% off, PKR 1,000 saving) for the first 20 confirmed paid enrollments — the interest form never reserves the offer or confirms payment — first two sessions free (November 30 + December 2, 2026), teaching language Urdu, full 8-week curriculum and 100-point assessment. Assignment schedule (confirmed): assignments are released on Fridays in Weeks 1, 2, 3, 5, 6 and 7 and each of the six weekly assignments is due by Sunday at 11:59 PM Pakistan Standard Time (PKT). Registration runs through the Google Form (`https://forms.gle/xpjhjQgRXKfnbJds9`). Certificate of Completion confirmed for students who meet the course requirements (digital verification workflow belongs to the future LMS). Top-three award terms and certificate minimum passing criteria remain marked as pending — do not invent them.

## About
Tell DevSpark’s company story; keep the company as the focus. Founder photo may appear as supporting content. No dedicated Founder page.

## Guides (Help Center)
Implemented at `/guides` as a client-side Help Center: search across guide titles/summaries/keywords, single-select category filters, and React `Disclosure` accordions (`components/ui/disclosure.tsx`). It ships with four categories and twelve guides covering the website, getting help, solutions/projects, and courses/enrollment. Content answers only from confirmed information; nothing is filler.

## FAQ
There is no standalone FAQ page. The former `/faq` route permanently redirects to the Help Center at `/guides`.

## Contact
Implemented. Contact form posts to `POST /api/contact`, which validates input, rate-limits, deduplicates, and forwards accepted messages to Resend; email and social links provide alternatives. Success is only shown after the provider confirms acceptance (never faked), and an unconfigured deployment honestly returns a 503 notice. Note: the form has passed mocked tests but real email delivery is not yet verified (see `docs/05` and `.env.example`).

## Journeys
- Business: Home → Solutions → Discuss a Project → Contact.
- Student: Home/Courses → Program details → Register for Free Demo → Google Form.
- Resource visitor: Home → Guides → Read a real resource → next relevant action.

## Integrity
Never invent company history, testimonials, accreditation, client results, pricing, dates or partnerships. Do not claim government accreditation. Do not present future services as currently available.
