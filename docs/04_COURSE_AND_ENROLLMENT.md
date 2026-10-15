# Course and Enrollment

## Current program
- Program: Generative AI Engineering
- Level: Level 01
- Batch: Cohort 01
- Duration: 8 weeks · 24 live online sessions (confirmed).
- Schedule: Monday, Wednesday and Friday, 7:30–9:30 PM Pakistan Standard Time (UTC+5).
- Start: Monday, November 30, 2026.
- Fee: standard PKR 4,000, one-time payment for the complete course. Cohort 01 introductory offer: early-bird PKR 3,000 (25% off — PKR 1,000 saving) for the first 20 confirmed paid enrollments. This is an introductory discount, not a change to the standard fee; submitting the interest form never reserves the offer.
- Format: live online on Google Meet (confirmed). Meeting link and joining instructions are shared privately with registered and confirmed students before sessions — no public link is published.
- Certificate: DevSpark Certificate of Completion confirmed for students who meet the course requirements (six assignments, midterm project, final project). Digital issuance and verification (credential IDs, QR codes) belong to the future LMS; minimum passing criteria are not formally set yet.
- Teaching language: Urdu.
- Age restriction: none defined; no prior AI or programming experience required.
- Enrollment: Google Form — `https://forms.gle/xpjhjQgRXKfnbJds9` (registration of interest + free-demo participation; submitting it does not confirm paid enrollment).
- Free sessions: the first two sessions — Monday, November 30, 2026 and Wednesday, December 2, 2026 — are free so learners can experience the teaching before deciding whether to continue.
- Assessment: six weekly assignments (10 points each, released on Fridays in Weeks 1, 2, 3, 5, 6 and 7), midterm project (15) and final project (25) — 100 points total.
- Assignment deadline (confirmed): each of the six weekly assignments is due by Sunday at 11:59 PM Pakistan Standard Time (PKT). This rule applies to the six weekly assignments only; midterm and final project deadlines are not yet confirmed.

Use the public-facing naming **Generative AI Engineering — Level 01, Cohort 01** unless the user later changes it.

## Registration workflow
1. Student opens the course page and selects **Register for Free Demo** (the single registration CTA).
2. Website opens the published Google Form.
3. Student submits the form (interest/free-demo registration) and attends the two free sessions.
4. Interested students decide whether to continue and pay.
5. Instructor privately shares payment account details and confirms whether the student is within the first 20 confirmed paid enrollments (early-bird fee PKR 3,000, otherwise standard PKR 4,000).
6. Student sends payment proof by personal WhatsApp with name/email and requested details.
7. A separate spreadsheet tracks paid students — it is the current source of truth for payment-confirmed seats until the LMS exists.
8. Future class links (Google Meet) go only to paid students.

No custom payment automation or student accounts in V1. The Google Form never counts as a paid enrollment and never reserves early-bird pricing.

## Upcoming LMS (planned — not built)
The LMS will replace the manual spreadsheet workflow with:
- Payment-confirmed seat tracking (early-bird eligibility counted by confirmed payment, not form responses).
- Student workflows: enrolled-student access to Google Meet joining details, session recordings, class notes, assignments, grades and certificate status.
- Instructor workflows: roster and payment status, assignment/project submission review, 100-point grading, announcements and materials distribution.
- Certificate issuance and verification: completion rules, generated certificates with unique credential IDs and QR verification.
Do not implement any of this during website work; the LMS is a separate phase.

## Website constraints
Keep the Google Form URL in one central config location (`config/site.ts` — `links.enrollmentFormUrl` and `links.demoFormUrl`); components activate the links and hide the pending notes automatically, so no broken link can be published. Do not collect payment details on the website or expose a personal WhatsApp number unless explicitly approved.

## TBD
Class/materials distribution process, payment proof process refinements, midterm/final project submission deadlines, certificate minimum passing criteria and online verification, refund/cancellation policy and top-three award terms.
