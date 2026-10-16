import { siteConfig } from "@/config/site";

export const hero = {
  eyebrow: siteConfig.tagline,
  title: "Intelligent systems for real-world problems.",
  lead:
    "DevSpark builds AI-powered solutions, workflow automation and custom software — and teaches the engineers behind them through the Generative AI Engineering program.",
  primaryCta: {
    label: "Discuss a Project",
    href: "/contact?topic=project#contact-form",
  },
  secondaryCta: { label: "Explore the Program", href: "/courses" },
};

export const solutions = {
  index: "01",
  label: "Solutions",
  title: "Where we can help",
  description:
    "Every engagement starts with your problem, not a preset service. The areas below are where DevSpark aims to work — what is in scope, and whether it is available, is confirmed with you before anything begins.",
  items: [
    {
      icon: "cpu",
      title: "AI-powered solutions",
      body: "Assessing where intelligence can genuinely improve a product, a service or an internal decision — and building it where it can help.",
    },
    {
      icon: "flowArrow",
      title: "Workflow automation",
      body: "Removing repetitive steps from the way teams already work, without forcing a new process on them.",
    },
    {
      icon: "terminal",
      title: "Custom software",
      body: "Software shaped around the problem at hand, engineered to be maintainable long after launch.",
    },
  ],
  availability: {
    title: "Availability",
    body: "These are proposed focus areas, not a claim that every service is currently open. Scope and availability are confirmed per project — anything not yet offered is presented as a future direction, never as a live service.",
  },
  cta: {
    label: "Discuss a Project",
    href: "/contact?topic=project#contact-form",
  },
};

export const program = {
  index: "02",
  label: "Courses",
  title: "Generative AI Engineering",
  subtitle: "Level 01 · Cohort 01",
  description:
    "A beginner-friendly, project-oriented course in practical Generative AI — taught in Urdu with English technical terminology. 8 weeks, 24 live online sessions, starting Monday, November 30, 2026, and the first two sessions are free to attend.",
  facts: [
    { term: "Starts", value: "Monday, November 30, 2026" },
    { term: "Duration", value: "8 weeks · 24 live sessions" },
    { term: "Schedule", value: "Monday, Wednesday and Friday" },
    { term: "Class time", value: "7:30 PM – 9:30 PM (Pakistan Standard Time, UTC+5)" },
    { term: "Format", value: "Live online — Google Meet" },
    {
      term: "Teaching language",
      value: "Urdu, with English technical terminology",
    },
    {
      term: "Fee",
      value:
        "PKR 4,000 one-time payment for the complete 8-week course — introductory early-bird fee PKR 3,000 for the first 20 confirmed paid enrollments",
    },
    {
      term: "Free demo classes",
      value:
        "The first two sessions — Monday, November 30, 2026 and Wednesday, December 2, 2026",
    },
    {
      term: "First paid class",
      value: "Friday, December 4, 2026, 7:30 PM PKT — after the two free demos",
    },
    {
      term: "Session breakdown",
      value: "2 free demo sessions + 22 paid-course sessions = 24 live sessions",
    },
    {
      term: "Final scheduled session",
      value: "Friday, January 22, 2027, if the schedule runs uninterrupted",
    },
    { term: "Level & cohort", value: "Level 01 · Cohort 01" },
    {
      term: "Registration",
      value: "Open — one Google Form for interest and the free demo",
    },
  ],
  startsAt: "2026-11-30T19:30:00+05:00",
  enrollCta: "Register Your Interest",
  enrollStatus:
    "The registration link is not available right now — please use the contact page if you have a question in the meantime.",
  demoCta: "Register for Free Demo",
  demoStatus:
    "Free-demo registration is not available right now — please use the contact page if you have a question in the meantime.",
  audience: {
    title: "Who this course is for",
    body: "This is a beginner-level course for absolute beginners, students, learners and anyone interested in practical AI applications. No prior AI or programming experience is assumed.",
    prerequisites: [
      "No prior AI knowledge required.",
      "No programming experience required.",
      "Basic computer and internet usage skills recommended.",
      "Access to a computer or laptop and stable internet recommended for hands-on project work.",
    ],
  },
  professions: {
    label: "Who it is for",
    title: "AI Skills for Every Profession",
    description:
      "Whether you're a student, working professional, business owner, educator, creator, or someone exploring a new skill, Generative AI can help you work smarter, solve problems, and turn ideas into practical solutions.",
    groups: [
      {
        title: "Students and fresh learners",
        body: "Research topics, understand study material, build presentations and move projects forward — while learning how to check what AI produces before trusting it.",
      },
      {
        title: "Working professionals",
        body: "Draft reports and communication, summarise long documents, cut through repetitive tasks and give everyday productivity a practical boost.",
      },
      {
        title: "Business owners and entrepreneurs",
        body: "Shape marketing ideas, streamline business workflows, improve customer communication and find real operational efficiency in day-to-day work.",
      },
      {
        title: "Teachers and educators",
        body: "Plan lessons, prepare educational resources and create stronger learning support for students — with verification habits built in from day one.",
      },
      {
        title: "Freelancers and content creators",
        body: "Plan content, shape creative workflows, prepare client deliverables and prototype ideas faster without giving up your own judgement.",
      },
      {
        title: "Aspiring developers and technical learners",
        body: "Use AI-assisted coding, debugging and documentation to start building practical applications — no prior programming experience required.",
      },
    ],
    whyTitle: "Why learn Generative AI?",
    whyDescription:
      "Practical, beginner-level value you can apply from the first week — in study, at work and in your own projects.",
    whyPoints: [
      "Understand how modern AI tools work and where they genuinely help.",
      "Improve day-to-day productivity with practical AI workflows.",
      "Write better prompts and evaluate outputs instead of trusting them blindly.",
      "Build useful digital solutions, documents, prototypes and projects.",
      "Automate selected repetitive workflows you already do by hand.",
      "Become more adaptable as technology keeps evolving.",
      "Learn to use AI responsibly and verify outputs before acting on them.",
      "Grow toward a clear learning pathway toward Level 02.",
    ],
    note: "This is Level 01 beginner training: it builds practical, verifiable skills and a completed project — not guaranteed employment, income or business results, and not advanced AI-engineer status after eight weeks.",
  },
  outcomes: [
    "Understand essential Generative AI and LLM concepts.",
    "Use AI tools effectively and responsibly.",
    "Write, evaluate and improve prompts.",
    "Understand common AI limitations and hallucinations.",
    "Identify real-world problems suitable for AI solutions.",
    "Plan practical AI-assisted projects.",
    "Create basic requirements and project documentation.",
    "Use AI tools to generate and improve a simple prototype.",
    "Understand the basic role of APIs, JSON and AI-generated code — without prior programming experience.",
    "Test and improve AI-assisted project outputs.",
    "Document, explain and demonstrate a practical beginner-level project.",
    "Understand a clear learning pathway toward Level 02.",
  ],
  outcomesNote:
    "An honest outcome list: the course builds real, practical skills and a documented project — it does not promise professional AI-engineer status, jobs or income after eight weeks.",
  weeks: [
    {
      n: "01",
      title: "Generative AI foundations",
      topics: [
        "Introduction to AI, Machine Learning and Generative AI.",
        "What LLMs are and how they are used.",
        "AI tools and real-world use cases.",
        "Tokens, context and hallucinations at a beginner level.",
        "Responsible usage and verification basics.",
      ],
      outcome:
        "Students understand the fundamentals and can perform simple AI-assisted tasks.",
      assessment: "Assignment 1 — 10 points",
    },
    {
      n: "02",
      title: "Prompt engineering and output quality",
      topics: [
        "Anatomy of an effective prompt.",
        "Tasks, context, constraints and desired output formats.",
        "Zero-shot and few-shot prompting.",
        "Prompt refinement and testing.",
        "Structured outputs and basic JSON awareness.",
        "Building a reusable prompt library.",
      ],
      outcome:
        "Students can design useful prompts and evaluate the quality of AI outputs.",
      assessment: "Assignment 2 — 10 points",
    },
    {
      n: "03",
      title: "Project planning and documentation",
      topics: [
        "Identifying and defining a problem.",
        "Understanding user requirements.",
        "Defining project goals, scope and features.",
        "Basic project lifecycle.",
        "Simple workflow diagrams.",
        "Project documentation: problem brief, PRD-lite, implementation plan, test checklist and README.",
        "Breaking large projects into manageable tasks.",
      ],
      outcome:
        "Students create a practical project plan and supporting documents.",
      assessment: "Assignment 3 — 10 points",
    },
    {
      n: "04",
      title: "Guided AI solution building",
      topics: [
        "Translating project requirements into implementation tasks.",
        "Using AI tools for project building.",
        "Understanding AI-generated solutions.",
        "Iterative development.",
        "Identifying and fixing errors with AI assistance.",
        "Demonstrating a simple working prototype.",
      ],
      outcome:
        "Students complete and demonstrate a guided beginner-level AI-assisted solution.",
      assessment: "Midterm Project — 15 points",
    },
    {
      n: "05",
      title: "AI for documents and real-world work",
      topics: [
        "AI-assisted research and document analysis.",
        "Summarization and extraction.",
        "Professional writing and productivity workflows.",
        "Tables, structured information and everyday business tasks.",
        "Verifying sources and AI-generated content.",
        "Privacy and safe handling of information.",
      ],
      outcome:
        "Students design a useful AI-supported workflow for a real-world task.",
      assessment: "Assignment 4 — 10 points",
    },
    {
      n: "06",
      title: "AI-assisted prototyping and debugging",
      topics: [
        "Understanding basic application components.",
        "What APIs and JSON are, conceptually.",
        "Understanding the role of AI-generated code.",
        "Giving clear implementation instructions to AI tools.",
        "Testing features and validating expected behavior.",
        "Debugging and making controlled improvements.",
        "Maintaining basic project documentation.",
      ],
      outcome:
        "Students can guide and verify a simple AI-assisted prototype without prior coding experience.",
      assessment: "Assignment 5 — 10 points",
    },
    {
      n: "07",
      title: "AI assistants, workflows and final project planning",
      topics: [
        "Difference between chatbots, AI assistants and AI agents.",
        "Simple automated workflows.",
        "Knowledge-based assistants and introductory RAG concepts.",
        "Limitations of AI-powered systems.",
        "Designing a practical final project.",
        "Preparing requirements, workflow and evaluation criteria.",
      ],
      outcome:
        "Students have a clearly planned final project and understand how basic AI workflows are organized.",
      assessment: "Assignment 6 — 10 points",
    },
    {
      n: "08",
      title: "Final project, testing and showcase",
      topics: [
        "Final project implementation and refinement.",
        "Reviewing requirements.",
        "Testing project functionality.",
        "Improving unreliable outputs.",
        "Completing the README and project documentation.",
        "Project demonstration and explanation.",
        "Learning reflection and Level 02 roadmap.",
      ],
      outcome:
        "Students can demonstrate a documented, tested beginner-level AI-assisted project.",
      assessment: "Final Project — 25 points",
    },
  ],
  methodology: {
    title: "How classes are taught",
    points: [
      "Beginner-friendly explanations.",
      "Live practical demonstrations.",
      "Visual explanations and diagrams using digital whiteboards such as Excalidraw.",
      "AI-assisted project development.",
      "Project planning and documentation.",
      "Practical exercises and problem-solving.",
      "Output verification and testing.",
      "Questions and discussion.",
    ],
    notes: [
      "No mandatory slide presentations.",
      "No requirement to manually write programming code.",
    ],
    delivery:
      "Classes are live online through Google Meet. Joining details will be shared with registered and confirmed students before their sessions.",
  },
  materials: {
    title: "Learning materials",
    items: [
      "Session recordings",
      "Class notes",
      "Supporting resources",
      "Assignments and project guidance",
    ],
    note: "These resources are planned for enrolled students. How they are shared will be confirmed before paid enrollment opens — no student portal exists yet.",
  },
  assessment: {
    title: "Assignments, projects and assessment",
    description:
      "The course is assessed on a 100-point system built from weekly work and two projects.",
    total: "100 points",
    items: [
      {
        label: "Six weekly assignments",
        detail: "10 points each — 60 points total",
      },
      { label: "Midterm project", detail: "Week 4 — 15 points" },
      { label: "Final project", detail: "Week 8 — 25 points" },
    ],
    published:
      "Assignments are released on Fridays in Weeks 1, 2, 3, 5, 6 and 7.",
    deadline:
      "Each of the six weekly assignments is due by Sunday at 11:59 PM Pakistan Standard Time (PKT).",
    late:
      "No deadline extensions: a weekly assignment submitted after that deadline receives zero marks for that assignment.",
    projectsDeadline:
      "The midterm and final project submission deadlines are announced in advance through the official course schedule; the weekly no-extension rule does not apply to them.",
    review:
      "Score review: request a review of an assignment, midterm or final-project score within 3 calendar days after the result is communicated; DevSpark communicates the review decision within 5 calendar days of a valid request.",
  },
  certificate: {
    title: "Certificate of completion",
    status: "Confirmed",
    body: "Students who successfully complete the course requirements will receive a DevSpark Certificate of Completion. The digital issuance and verification workflow — unique credential IDs and QR codes — is being developed with the upcoming LMS, so certificates cannot be verified online at launch.",
    requirements: [
      "Attend at least 20 of the 24 live sessions — the two free demos included — 80% attendance.",
      "Score at least 60 out of 100 on the 100-point assessment.",
      "Complete and submit all six assignments.",
      "Complete and submit the midterm project.",
      "Complete and submit the final project.",
    ],
    note: "Both minimums are required together: at least 80% attendance (counting both free demos in the 24 sessions) and at least 60 out of 100. Attendance problems are considered case by case, but a certificate is never guaranteed.",
  },
  awards: {
    title: "Top three student awards",
    status: "Confirmed",
    body: "The top three eligible students each receive a 100% refund of the course fee they actually paid — PKR 3,000 or PKR 4,000, whichever applied — settled by verified bank transfer within 7 calendar days after the final verified winners are announced, plus recognition on DevSpark's LinkedIn profile only with the student's explicit permission.",
    requirements: [
      "Attend all 24 live sessions — both free demos and all 22 paid sessions (100% attendance).",
      "Complete and submit all six assignments, the midterm project and the final project.",
      "Score at least 60 out of 100 — the certificate's minimum score.",
      "Place among the top three students under the 100-point assessment system.",
    ],
    ranking:
      "Ranking uses the overall score out of 100. Ties are resolved by the higher final-project score, then the higher midterm score, then the higher combined assignment score. If all remain equal the students share a joint rank under standard competition ranking (for example 1, 1, 3), and every eligible student occupying competition rank 1, 2 or 3 receives the award — which can mean more than three recipients.",
    rankingNote:
      "Winners are announced only after the score-review window has closed and all valid review requests have been resolved; the seven-day refund countdown begins at that final verified winners announcement.",
    note: "A student who enrolls after the free demos can still complete the course, but cannot meet the 24/24 attendance these awards require. Students' photos or personal profiles are never published without explicit consent.",
  },
  pricing: {
    badge: "Introductory offer",
    title: "Early-bird pricing",
    discount: "25% OFF",
    standardLabel: "Standard fee",
    standard: "PKR 4,000",
    earlyBirdLabel: "Early-bird fee",
    earlyBird: "PKR 3,000",
    saving: "You save PKR 1,000",
    oneline: "One-time payment for the complete eight-week course.",
    eligibility:
      "Early-bird pricing applies to the first 20 confirmed paid enrollments for Cohort 01.",
    note: "Submitting the interest form does not reserve a seat or confirm payment. Payment and seat-confirmation instructions will be shared separately — paid enrollment and each early-bird place are confirmed only after DevSpark verifies the payment was actually received; a payment screenshot alone is not proof.",
  },
  registration: {
    label: "Registration",
    title: "Registration is open",
    description:
      "Register for our first two free demo classes and express your interest in the full course through one simple form. No payment required. Paid enrollment is available both before and after the demos.",
    noPayment:
      "Submitting the form registers your interest and free-demo participation — it does not confirm paid enrollment.",
  },
  journey: [
    {
      step: "01",
      title: "Register your interest",
      body: "Open the Google Form from the button in this section, pick your registration interest — the free demo first, the full course or more information — and submit. It takes a couple of minutes.",
    },
    {
      step: "02",
      title: "Attend the two free demo classes",
      body: "The first two sessions — Monday, November 30 and Wednesday, December 2, 2026 — are free for everyone who registers, so you can experience the teaching live.",
    },
    {
      step: "03",
      title: "Enroll before or after the demos",
      body: "Paid enrollment is available both before and after the free demos. If you pay before the demos, your enrollment is confirmed once DevSpark verifies the payment; many learners also attend the demos first and then decide. Payment and seat-confirmation instructions are shared separately after you register.",
    },
    {
      step: "04",
      title: "Join Cohort 01",
      body: "Confirmation, Google Meet joining details and class instructions are shared with enrolled students before their classes begin.",
    },
  ],
  faqs: [
    {
      question: "Who is this course for?",
      answer:
        "Absolute beginners, students, learners and anyone interested in practical AI applications. No prior AI knowledge and no programming experience are required. Basic computer and internet skills are recommended, along with access to a computer or laptop and stable internet for the hands-on project work.",
    },
    {
      question: "When does the course start, and how long does it run?",
      answer:
        "Cohort 01 starts on Monday, November 30, 2026 and runs for 8 weeks: 24 live online sessions on Monday, Wednesday and Friday, from 7:30 PM to 9:30 PM Pakistan Standard Time (UTC+5). The first two sessions — November 30 and December 2 — are free demos; the first paid instructional class is Friday, December 4, 2026, and the final scheduled session is Friday, January 22, 2027 if the schedule runs uninterrupted.",
    },
    {
      question: "How much does the course cost?",
      answer:
        "The standard course fee is PKR 4,000 — a one-time payment for the complete 8-week course, not a monthly fee. Cohort 01 also has an introductory early-bird fee of PKR 3,000 (25% off, PKR 1,000 saving) for the first 20 confirmed paid enrollments. The Google Form does not reserve the offer or confirm payment — payment and seat-confirmation instructions are shared separately.",
    },
    {
      question: "Are the first classes free?",
      answer:
        "Yes. The first two sessions are free: Monday, November 30, 2026 and Wednesday, December 2, 2026, so learners can experience the teaching before deciding whether to continue.",
    },
    {
      question: "Will the course be taught in Urdu or English?",
      answer:
        "The course is taught in Urdu, with English technical terminology. If you would like to experience the class before deciding whether to continue, the first two sessions are free.",
    },
    {
      question: "How do I register or enroll?",
      answer:
        "Registration runs through a Google Form — use the Register button on this page to open it. Submitting the form registers your interest and free-demo participation; it does not confirm paid enrollment, and the website does not collect payments. Submitting the form does not reserve the early-bird offer — payment and seat-confirmation instructions are shared separately.",
    },
    {
      question: "Do I need to write code myself?",
      answer:
        "No. There is no requirement to manually write programming code. You will guide AI tools, plan projects, test outputs and document your work — understanding the role of APIs, JSON and AI-generated code at a beginner level.",
    },
    {
      question: "Is there a certificate?",
      answer:
        "Yes. A DevSpark Certificate of Completion requires both at least 20 of the 24 live sessions attended (80% attendance, counting the two free demos) and an overall score of at least 60 out of 100, with all six assignments, the midterm and the final project submitted. The digital verification workflow with unique IDs and QR codes is being developed with the upcoming LMS and is not available at launch.",
    },
    {
      question: "What happens if I submit an assignment late?",
      answer:
        "There are no deadline extensions. Each of the six weekly assignments is due by Sunday at 11:59 PM Pakistan Standard Time (PKT), and a weekly assignment submitted after that deadline receives zero marks for that assignment. That rule applies to the six weekly assignments only; the midterm and final project deadlines are announced in advance through the official course schedule.",
    },
    {
      question: "Can I enroll before or after the free demo classes?",
      answer:
        "Yes — paid enrollment is allowed both before and after the two free demo classes. You can pay and confirm enrollment before the demos (confirmed after DevSpark verifies the payment), or attend the free demos on November 30 and December 2 and then decide. One caveat: the Top Three Student Awards require attending all 24 sessions, including both free demos, so a student who enrolls after the demos cannot qualify for those awards.",
    },
    {
      question: "What platform will the classes use?",
      answer:
        "Classes are live online through Google Meet. Joining details will be shared with registered and confirmed students before their sessions — there is no public meeting link.",
    },
    {
      question: "Can I cancel and get a refund?",
      answer:
        "Cancel by emailing devspark.codes@gmail.com before 7:30 PM PKT on Friday, December 4, 2026 — the first paid class — and you receive a full refund of the fee you actually paid; the request counts from when it is received in that inbox, in Pakistan Standard Time. After that time, student-initiated cancellation is generally non-refundable, subject to applicable exceptions and legal requirements. Approved refunds are processed within 14 calendar days of approval. If DevSpark cancels the course, paid students receive a full refund of the fee actually paid within 14 calendar days of the cancellation notice, and replacement of the lead instructor lets an affected paid student request a 100% refund. Full terms are in the Help Center.",
    },
  ],
};

export const about = {
  index: "03",
  label: "About",
  title: "A tech company, not just an academy",
  paragraphs: [
    "DevSpark is being built as a technology company and product brand that solves real-world problems — across AI solutions, automation, software development and, in time, DevSpark-owned products.",
    "Education is one vertical of that company, not its entire identity. The Generative AI Engineering program is where this vertical currently sits.",
    "Anything not yet confirmed — services, products, dates, enrollment details — stays clearly marked on this site until it is real.",
  ],
  principles: [
    {
      title: "Real-world first",
      body: "Work starts from a genuine problem, not from a trend.",
    },
    {
      title: "Education is one vertical",
      body: "Learning sits alongside the company's engineering focus instead of replacing it.",
    },
    {
      title: "Room for future products",
      body: "Products appear here when — and only when — they actually exist.",
    },
  ],
};

/**
 * Homepage FAQ preview only. The full FAQ has been merged into the
 * Help Center (`helpCenter` below, shown at `/guides`); `/faq` redirects
 * there. Keep this list to the strongest homepage-sized answers.
 */
export const faq = {
  index: "04",
  label: "FAQ",
  title: "Q/A",
  description:
    "Only confirmed information is published here. Anything still undecided stays clearly marked as to be confirmed.",
  items: [
    {
      question: "Who can join the Generative AI Engineering program?",
      answer:
        "Absolute beginners, students and learners — no prior AI knowledge or programming experience required. Cohort 01 starts Monday, November 30, 2026; the full schedule and curriculum are published on the courses page.",
    },
    {
      question: "How does enrollment work?",
      answer:
        "Registration and free-demo participation run through a Google Form — open it from the Register button on the courses page. The website does not collect payments or create student accounts.",
    },
    {
      question: "Are the first classes free?",
      answer:
        "Yes — the first two sessions are free: Monday, November 30, 2026 and Wednesday, December 2, 2026, so learners can experience the teaching before deciding whether to continue.",
    },
    {
      question: "Can I contact DevSpark about a project?",
      answer:
        "Yes. Use the contact section below or email devspark.codes@gmail.com directly — either route reaches DevSpark, and we reply to the email address you provide.",
    },
  ],
};

export const contact = {
  index: "05",
  label: "Contact",
  title: "Have a problem worth solving?",
  description:
    "Questions, support requests and project inquiries all start here — tell us what you need and choose the category that fits.",
  paths: {
    title: "Choose the right path",
    items: [
      {
        slug: "support",
        title: "Questions and support",
        body: "For general questions, help using the website, or course and enrollment questions. Pick the matching category in the form below.",
        cta: { label: "Contact Us", href: "#contact-form" },
      },
      {
        slug: "project",
        title: "Project inquiries",
        body: "For businesses and clients seeking custom software, AI solutions or workflow automation — not for course enrollment or general support. This opens the form with the Project inquiry category selected.",
        cta: {
          label: "Discuss a Project",
          href: "/contact?topic=project#contact-form",
        },
      },
    ],
  },
  checklist: {
    title: "What to include in your message",
    items: [
      "The problem or requirement you are trying to solve",
      "The context around it — team, tools, constraints",
      "What a useful outcome would look like to you",
    ],
  },
  channels: {
    title: "Contact channels",
    badge: "Email available",
    note: "Email DevSpark directly at the address below, reach out through a social profile, or send a message with the form — whichever is easiest. We reply to the email address you provide.",
    items: [
      { label: "Email", status: "Available" },
      { label: "Contact form", status: "Available" },
      { label: "Social profiles", status: "Available" },
      { label: "GitHub (projects)", status: "Available" },
    ],
  },
  secondaryCta: { label: "Explore the Program", href: "/courses" },
  form: {
    title: "Send a message",
    badge: "Email available",
    note: "Send your inquiry through the form below and we'll reply to the email address you provide. Prefer to reach out directly? Email devspark.codes@gmail.com or contact us through a social profile.",
    fields: {
      name: "Name",
      email: "Email",
      category: "Category",
      message: "Message",
    },
    categories: [
      { value: "general", label: "General question" },
      { value: "support", label: "Website or technical help" },
      { value: "course", label: "Course & enrollment question" },
      { value: "project", label: "Project inquiry" },
    ],
    submit: "Send message",
    sending: "Sending…",
    successBody:
      "Your message has been submitted successfully. We'll reply to the email address you provided.",
    sendAnother: "Send another message",
    errors: {
      required: "Please fill in this field.",
      email: "Please enter a valid email address.",
      messageShort: "Please write at least 10 characters.",
      nameLong: "Please use 100 characters or fewer.",
      messageLong: "Please use 5000 characters or fewer.",
      invalid: "Please check this field.",
      category: "Please choose a category.",
      timeout:
        "The request took too long and was cancelled. Your message is still here — please try again.",
      network:
        "Something went wrong while sending. Your message is still here — please try again.",
    },
  },
};

/**
 * Help Center content, shown at `/guides` (the former `/faq` page
 * redirects here). Categories and guides describe how to use DevSpark
 * and the confirmed processes only — no speculative workflows, prices,
 * timelines or policies.
 */
export const helpCenter = {
  label: "Help Center",
  title: "Help using DevSpark",
  description:
    "Find practical guidance for exploring DevSpark, getting in touch, understanding what DevSpark is working on, and getting help when something goes wrong.",
  categories: [
    {
      slug: "using-devspark",
      icon: "compass",
      title: "Using the DevSpark website",
      description:
        "Find your way around the site and understand what each part is for.",
      guides: [
        {
          slug: "navigate-the-website",
          title: "Find your way around the website",
          summary:
            "Where everything lives — the main pages, the menu, and how to get back to the homepage.",
          keywords: [
            "navigation",
            "menu",
            "homepage",
            "pages",
            "header",
            "mobile",
          ],
          sections: [
            {
              heading: "Main pages",
              body: "The header links to Solutions (what DevSpark can build), Courses (the Generative AI Engineering program), About (what DevSpark is), Help (this Help Center) and Contact. Every other page keeps the same menu.",
            },
            {
              heading: "Getting back to the homepage",
              body: "Click the DevSpark logo in the header or the footer at any time — it always returns to the homepage. On phones and tablets, the logo works the same way next to the menu button.",
            },
            {
              heading: "On a phone or tablet",
              body: "Tap the menu button (three lines, top right) to open the navigation, then tap a link — the menu closes automatically. Tap the same button (now an X) or press Escape to close it without navigating.",
            },
          ],
        },
        {
          slug: "understanding-site-status",
          title: "Understand the “to be confirmed” markers",
          summary:
            "A few details on this site are deliberately marked as pending or under development. Here is what those markers mean and where they appear.",
          keywords: [
            "pending",
            "confirmed",
            "placeholders",
            "status",
            "badge",
            "honest",
          ],
          sections: [
            {
              heading: "Why details are marked",
              body: "DevSpark only presents facts that are confirmed. Anything still undecided — such as the midterm and final project deadlines or the request window for instructor-replacement refunds — is clearly marked as pending instead of being invented, and features that exist in a later phase are named honestly rather than shown as live.",
            },
            {
              heading: "Where markers appear",
              body: "Confirmed and published: course dates, schedule, the Google Meet teaching platform, the first paid class date (December 4, 2026), the standard fee and the Cohort 01 early-bird offer, the free demo dates, the 2 free + 22 paid session breakdown, curriculum, the assignment deadline and the late-submission rule, the 100-point assessment, the certificate criteria (80% attendance counting both demos, and 60/100), the top-three award terms including competition ranking, the 3-day score-review window and 5-day review decision, the cancellation and refund terms (student cancellation, course cancellation and lead-instructor replacement), the Google Form registration link and the contact form. Marked as pending or in development: the midterm and final project deadlines, approval turnaround times for reviews and refund requests, the request window for instructor-replacement refunds, the attendance-tracking method, the certificate's digital verification workflow, and paid-enrollment processing on the website.",
            },
            {
              heading: "What this means for you",
              body: "You can rely on everything that is unmarked: it reflects the current state of the business. Treat a pending marker as a promise to publish — not as a date, a price or a commitment.",
            },
          ],
        },
        {
          slug: "using-help-center",
          title: "Search and filter the Help Center",
          summary:
            "Use the search box and category filters on this page to find the right guide quickly.",
          keywords: [
            "search",
            "filter",
            "categories",
            "help center",
            "find",
            "guides",
          ],
          sections: [
            {
              heading: "Search by keyword",
              body: "Type into the Search help box to match guide titles, summaries and keywords as you type. Results update immediately.",
            },
            {
              heading: "Filter by category",
              body: "Select a category — such as Courses and enrollment — to show only the guides in that area. Search and category filters combine, so you can search within one category.",
            },
            {
              heading: "Resetting the view",
              body: "If nothing matches, the page shows a clear empty state with a “Reset search and filters” button that clears both the search box and the category filter, returning you to the full list.",
            },
          ],
        },
        {
          slug: "understanding-devspark",
          title: "Understand what DevSpark is",
          summary:
            "DevSpark is a technology company with education as one of its verticals — not a standalone online academy.",
          keywords: [
            "company",
            "academy",
            "products",
            "identity",
            "about",
            "product",
          ],
          sections: [
            {
              heading: "A technology company",
              body: "DevSpark is being built as a technology company that solves real-world problems across AI solutions, automation and software development. Education — the Generative AI Engineering program — is one vertical of that company, not its entire identity.",
            },
            {
              heading: "Products",
              body: "There are no published products in this first version of the site. A products area will appear when — and only when — real products exist.",
            },
          ],
        },
      ],
    },
    {
      slug: "getting-help",
      icon: "chatsCircle",
      title: "Getting help and contacting DevSpark",
      description:
        "How to reach DevSpark with a question, a problem, or a request.",
      guides: [
        {
          slug: "contact-devspark",
          title: "Contact DevSpark with a question",
          summary:
            "The contact page is the main way to reach DevSpark. Choose the right category and send a message.",
          keywords: [
            "contact",
            "email",
            "support",
            "help",
            "question",
            "message",
            "reply",
          ],
          sections: [
            {
              heading: "Open the contact page",
              body: "Use the Contact Us button in the Help Center or the Contact link in the menu. Both open the same page.",
            },
            {
              heading: "Choose a category and write your message",
              body: "Fill in your name and email address, pick the category that matches your question (general, website help, course question, or project inquiry) and describe what you need. The more context you give, the more useful the reply can be.",
            },
            {
              heading: "What happens after you send",
              body: "Send your message through the form and DevSpark replies to the email address you provided. If something goes wrong, the form shows a clear notice on screen and your text stays in the form so you can retry — or email devspark.codes@gmail.com directly.",
            },
            {
              heading: "Direct email and social profiles",
              body: "Email devspark.codes@gmail.com directly at any time. LinkedIn and Instagram profiles are linked from the contact page and the footer, and the GitHub profile is listed there as a technical and project profile rather than a support channel.",
            },
          ],
          cta: { label: "Open the contact page", href: "/contact" },
        },
      ],
    },
    {
      slug: "solutions-projects",
      icon: "lightbulb",
      title: "Exploring solutions and requesting a project",
      description:
        "For businesses and individuals who want DevSpark to build or automate something.",
      guides: [
        {
          slug: "explore-solutions",
          title: "Explore what DevSpark offers",
          summary:
            "The Solutions page explains the focus areas — AI-powered solutions, workflow automation and custom software — and how availability works.",
          keywords: [
            "solutions",
            "services",
            "AI",
            "automation",
            "software",
            "availability",
            "offer",
          ],
          sections: [
            {
              heading: "Open the Solutions page",
              body: "Use the Solutions link in the menu, or the Explore Our Solutions button at the end of this Help Center, to see the three proposed focus areas: AI-powered solutions, workflow automation and custom software.",
            },
            {
              heading: "How availability works",
              body: "The focus areas describe where DevSpark aims to work — they are not a claim that every service is currently open. Scope and availability are confirmed with you per project before anything begins.",
            },
          ],
        },
        {
          slug: "request-a-project",
          title: "Request a project or solution",
          summary:
            "Businesses and clients can start a project conversation through the contact page's Project inquiry category.",
          keywords: [
            "project",
            "inquiry",
            "request",
            "business",
            "client",
            "custom",
            "quote",
            "discuss",
          ],
          sections: [
            {
              heading: "Start the inquiry",
              body: "Use any Discuss a Project button on the site. It opens the contact page with the Project inquiry category already selected. That button is for potential clients seeking a solution — not for course enrollment or general support.",
            },
            {
              heading: "What to include",
              body: "Describe the problem or requirement, the context around it (team, tools, constraints), and what a useful outcome would look like. Screenshots or examples of the current process help.",
            },
            {
              heading: "What happens next",
              body: "A project inquiry goes through the same contact form and shows a confirmation on screen when it is accepted; if sending fails, a clear notice appears and your text stays in the form. Scope and availability are discussed before any work is agreed — sending an inquiry does not commit either side.",
            },
          ],
        },
      ],
    },
    {
      slug: "courses-enrollment",
      icon: "graduationCap",
      title: "Courses and enrollment",
      description:
        "Confirmed facts about the Generative AI Engineering program and how registration and enrollment work.",
      guides: [
        {
          slug: "who-can-join",
          title: "Who can join the Generative AI Engineering program",
          summary:
            "Built for absolute beginners — no prior AI or programming experience required. Course facts are now published on the courses page.",
          keywords: [
            "prerequisites",
            "age",
            "join",
            "eligibility",
            "requirements",
            "who",
            "beginners",
            "students",
          ],
          sections: [
            {
              heading: "Who it is for",
              body: "The course targets absolute beginners, students, learners and people interested in practical AI applications. There is no defined age restriction. No prior AI knowledge and no programming experience are required. The teaching language is Urdu.",
            },
            {
              heading: "Recommended setup",
              body: "Basic computer and internet usage skills are recommended, along with access to a computer or laptop and a stable internet connection for the hands-on project work. The schedule, fee and full eight-week curriculum are published on the courses page.",
            },
          ],
        },
        {
          slug: "how-enrollment-works",
          title: "How enrollment works",
          summary:
            "Registration runs through a published Google Form — the link is on the courses page.",
          keywords: [
            "enrollment",
            "google form",
            "sign up",
            "register",
            "apply",
            "form",
            "registration",
          ],
          sections: [
            {
              heading: "The registration form",
              body: "Free-demo registration and course registration of interest both run through one Google Form. Open it from the Register button on the courses page and complete it — there is no other registration route. Submitting the form does not confirm paid enrollment.",
            },
            {
              heading: "Before you enroll",
              body: "The first two sessions are free — Monday, November 30, 2026 and Wednesday, December 2, 2026 — so learners can experience the teaching live. Paid enrollment is available both before and after these demos: pay early to confirm your seat before the course starts, or attend the demos first and then decide. A student who enrolls after the demos cannot meet the Top Three Awards' strict 24/24 attendance requirement.",
            },
            {
              heading: "After the form",
              body: "Confirmation, Google Meet joining details and class instructions are shared with enrolled students before their classes begin. Paid enrollment — including early-bird eligibility and payment instructions — is confirmed separately and only after DevSpark verifies that the payment was actually received; a payment screenshot alone is not proof. The website does not collect payments, create student accounts or issue student IDs.",
            },
            {
              heading: "Cancellations and refunds",
              body: "Student cancellation: email devspark.codes@gmail.com before 7:30 PM PKT on Friday, December 4, 2026 — the first paid class — for a full refund of the fee actually paid. The effective time is when the request is received in that inbox, evaluated in Pakistan Standard Time; the request should identify the student and enrollment. The contact form, WhatsApp and the Google Form are not authorized cancellation channels, and no banking details should be sent through public forms. At or after that time, student-initiated cancellation is generally non-refundable, subject to applicable exceptions and legal requirements. A valid approved refund is processed within 14 calendar days of approval; the approval turnaround itself is not yet specified.",
            },
            {
              heading: "If DevSpark cancels the course",
              body: "Every affected paid student receives a full refund of the fee actually paid within 14 calendar days of the official course cancellation notice. This is separate from the seven-day Top Three Award refund timeline.",
            },
            {
              heading: "If the lead instructor is replaced",
              body: "Replacement of the lead instructor is the defined significant course change for refunds: an affected paid student may request a 100% refund of the fee actually paid through devspark.codes@gmail.com, and a valid approved request is refunded within 14 calendar days of approval. The request window and approval turnaround are not yet specified. Ordinary schedule adjustments, tool changes and routine curriculum updates do not create this refund right, and nothing here limits any rights required by applicable law.",
            },
          ],
        },
        {
          slug: "free-introductory-classes",
          title: "Are the first classes free?",
          summary:
            "The first two sessions are free: Monday, November 30, 2026 and Wednesday, December 2, 2026.",
          keywords: ["free", "classes", "trial", "introductory", "demo", "price"],
          sections: [
            {
              heading: "The two free sessions",
              body: "Yes — the first two sessions of Cohort 01 are free: Monday, November 30, 2026 and Wednesday, December 2, 2026. Learners can experience the teaching before deciding whether to continue. Any changes will be published on the courses page.",
            },
          ],
        },
        {
          slug: "dates-price-syllabus",
          title: "Course dates, fee and curriculum",
          summary:
            "Start date, schedule, teaching platform, fee and the eight-week curriculum are now published on the courses page.",
          keywords: [
            "dates",
            "price",
            "fee",
            "schedule",
            "curriculum",
            "syllabus",
            "cost",
            "duration",
            "when",
            "november",
            "early",
            "bird",
            "discount",
          ],
          sections: [
            {
              heading: "What is confirmed",
              body: "Cohort 01 starts Monday, November 30, 2026 and runs for 8 weeks — 24 live online sessions on Google Meet, Monday, Wednesday and Friday, 7:30 PM to 9:30 PM Pakistan Standard Time (UTC+5). The first two sessions — November 30 and December 2 — are free demos; the remaining 22 sessions are the paid course, with the first paid instructional class on Friday, December 4, 2026. The standard fee is PKR 4,000, a one-time payment for the complete course, with an introductory early-bird fee of PKR 3,000 for the first 20 confirmed paid enrollments. The complete eight-week curriculum and the 100-point assessment system are published on the courses page.",
            },
            {
              heading: "What is shared separately",
              body: "Google Meet joining details go directly to registered and confirmed students before their sessions — no public meeting link exists yet. Early-bird eligibility is confirmed with a verified payment, counted only from payments DevSpark has confirmed as received: submitting the interest form does not reserve a seat or the discount, and payment and seat-confirmation instructions are shared separately.",
            },
          ],
        },
        {
          slug: "curriculum-and-assessment",
          title: "Curriculum, assessment and certificate",
          summary:
            "Eight weeks of beginner-friendly topics, a 100-point assessment system, and a confirmed certificate of completion for eligible students.",
          keywords: [
            "curriculum",
            "syllabus",
            "weeks",
            "assignments",
            "assessment",
            "points",
            "certificate",
            "award",
            "projects",
            "midterm",
            "final",
          ],
          sections: [
            {
              heading: "Eight-week curriculum",
              body: "The course runs across eight weeks — from Generative AI foundations and prompt engineering, through project planning and guided building, to documents, prototyping, AI assistants and a final project. Every week lists its topics, a practical outcome and its assessment on the courses page.",
            },
            {
              heading: "100-point assessment system",
              body: "Six weekly assignments worth 10 points each (60), a midterm project in Week 4 (15) and a final project in Week 8 (25) add up to 100 points. Assignments are released on Fridays in Weeks 1, 2, 3, 5, 6 and 7; each of the six weekly assignments is due by Sunday at 11:59 PM Pakistan Standard Time (PKT). There are no deadline extensions: a weekly assignment submitted after that deadline receives zero marks for that assignment. The midterm and final project deadlines are announced in advance through the official course schedule and are not covered by the weekly-assignment late rule.",
            },
            {
              heading: "Score review",
              body: "You can request a review of an assignment, midterm or final-project score within 3 calendar days after the result is communicated, through the contact page or by emailing devspark.codes@gmail.com. DevSpark communicates the review decision within 5 calendar days of a valid request. Top-student winners are announced only after the review window has closed and all valid review requests are resolved.",
            },
            {
              heading: "Certificate of completion",
              body: "Students who successfully complete the course requirements will receive a DevSpark Certificate of Completion: at least 20 of the 24 live sessions attended (80% attendance, counting both free demos) and at least 60 out of 100 overall, with all six assignments, the midterm and the final project submitted. Attendance problems are considered case by case, but a certificate is never guaranteed. The digital verification workflow (unique credential IDs and QR codes) is being developed with the upcoming LMS.",
            },
            {
              heading: "Top three student awards",
              body: "The top three eligible students each receive a 100% refund of the course fee they actually paid — PKR 3,000 or PKR 4,000, whichever applied — by verified bank transfer within 7 calendar days after the final verified winners are announced, plus LinkedIn recognition only with the student's permission. Eligibility requires attending all 24 live sessions — both free demos and all 22 paid sessions — submitting all six assignments, the midterm and the final project, and at least 60 out of 100 overall; the certificate's case-by-case attendance exception does not apply to these awards. Ranking uses the overall score; ties go to the higher final project, then the higher midterm, then the higher combined assignments, with equal students sharing a joint rank under standard competition ranking (for example 1, 1, 3) — every eligible student at competition rank 1, 2 or 3 wins, so a complete tie can produce more than three recipients. A student who enrolls after the free demos can still complete the course but cannot meet the 24/24 award attendance.",
            },
          ],
        },
      ],
    },
  ],
  contactCta: { label: "Contact Us", href: "/contact" },
  solutionsCta: { label: "Explore Our Solutions", href: "/solutions" },
  programCta: { label: "Explore the Program", href: "/courses" },
};
