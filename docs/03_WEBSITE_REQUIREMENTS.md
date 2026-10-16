# Website Requirements

## Navigation
Logo → Home (`/`), then **Solutions · Courses · About · Help · Contact**, plus a "Discuss a Project" CTA. `Help` points to the Help Center at `/guides`; there are no separate Guides or FAQ navigation entries. The former `/faq` route permanently redirects (`308`) to `/guides`. Do not show Products or empty product cards in V1.

## Home
Establish DevSpark’s company identity and route visitors to Solutions, Courses or Contact. Suggested sections: hero/tagline, company statement, Solutions preview, current learning program, working principles, real guides/resources if available, FAQ preview, contact CTA and footer.

Draft hero copy (not locked): “We build intelligent software, AI-powered solutions and automation experiences to help solve real-world problems.” Final copy is TBD.

## Solutions
Help businesses contact DevSpark to discuss a problem or requirement. Possible categories to assess: AI-powered solutions, workflow automation and custom software. These are proposed categories, not proof that every service is currently available. Clearly distinguish available services from future capabilities. Include a “Discuss a Project” CTA. No invented clients, case studies, metrics or guarantees.

## Courses
Show **Generative AI Engineering — Level 01, Cohort 01**. Published facts: 8 weeks · 24 live sessions (2 free demos + 22 paid-course sessions), Monday/Wednesday/Friday 7:30–9:30 PM Pakistan Standard Time, starts Monday, November 30, 2026, first paid instructional class Friday, December 4, 2026, final scheduled session Friday, January 22, 2027 if the schedule runs uninterrupted, teaching platform Google Meet (confirmed; joining details shared privately with registered and confirmed students), standard fee PKR 4,000 one-time with Cohort 01 introductory early-bird PKR 3,000 (25% off, PKR 1,000 saving) for the first 20 verified paid enrollments — the interest form never reserves the offer or confirms payment — first two sessions free (November 30 + December 2, 2026), teaching language Urdu with English technical terminology, full 8-week curriculum and 100-point assessment. Assignment schedule (confirmed): assignments are released on Fridays in Weeks 1, 2, 3, 5, 6 and 7 and each of the six weekly assignments is due by Sunday at 11:59 PM Pakistan Standard Time (PKT); no extensions, zero marks for late weekly submissions; midterm and final project deadlines are announced in advance through the official course schedule. Registration runs through the Google Form (`https://forms.gle/xpjhjQgRXKfnbJds9`); paid enrollment and early-bird places are confirmed only after DevSpark verifies payment was received — a screenshot alone is not proof. Certificate of Completion confirmed for students who meet both minimums — at least 80% attendance (20 of 24 sessions, both free demos included in the denominator) and at least 60/100 overall — with all six assignments and the midterm and final project submitted (digital verification workflow belongs to the future LMS). Top-three awards confirmed: each winner receives 100% of the fee actually paid (PKR 3,000 or PKR 4,000) by verified bank transfer within 7 calendar days after the final verified winners announcement, plus LinkedIn recognition only with explicit permission; eligibility is strict — all 24 sessions including both demos, all submissions, ≥60/100; ranking by overall score with tie-breaks (final project, then midterm, then combined assignments) using standard competition ranking — ranks 1, 2 or 3 win, joint ranks can exceed three recipients; a student who misses either demo cannot qualify. Score review: request within 3 calendar days after the result is communicated; decision within 5 calendar days; winners announced only after the review window closes and valid requests are resolved. Cancellation (confirmed): email devspark.codes@gmail.com before 7:30 PM PKT Friday, December 4, 2026 for a full refund of the fee actually paid (effective on inbox receipt, evaluated in PKT); at or after that time generally non-refundable subject to applicable exceptions and legal requirements; approved refunds processed within 14 calendar days of approval (approval SLA not yet specified). If DevSpark cancels the course: full refund of the fee actually paid within 14 calendar days of the official notice. Significant-change refund: replacement of the lead instructor lets an affected paid student request a 100% refund (14 days after approval; request window and SLA not yet specified); ordinary schedule, tool or curriculum changes do not. Do not invent: midterm/final deadlines, approval SLAs, or the attendance-tracking method.

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
