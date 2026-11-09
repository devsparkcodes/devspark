import { siteConfig } from "@/config/site";

export const hero = {
  eyebrow: siteConfig.tagline,
  title: "Intelligent systems for real-world problems.",
  lead:
    "DevSpark builds AI-powered solutions, workflow automation and custom software — and teaches the concepts behind them through the Generative AI Engineering program.",
  primaryCta: {
    label: "Discuss a project",
    href: "/contact?topic=project#contact-form",
  },
  secondaryCta: { label: "Explore the program", href: "/courses" },
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
    label: "Discuss a project",
    href: "/contact?topic=project#contact-form",
  },
};

/** One scheduled class inside a curriculum week (`program.weeks`). */
export type CurriculumClass = {
  /** Class number across the 24-session course, e.g. "01". */
  n: string;
  /** Published session date in the Mon/Wed/Fri schedule, e.g. "Mon, Nov 30, 2026". */
  date: string;
  title: string;
  /** Optional status chip — "Free demo", "First paid session". */
  badge?: string;
  /** Detailed topic list revealed when the class is expanded. */
  topics: string[];
  /** Optional practical activity shown under the class topics. */
  practical?: string;
};

/** One of the eight curriculum weeks rendered by `CurriculumGrid`. */
export type CurriculumWeek = {
  /** Week number as a zero-padded string, e.g. "01". */
  n: string;
  title: string;
  /** Short plain-English summary of what the week covers. */
  summary: string;
  /** Learning outcome — shown on the card face and in the panel. */
  outcome: string;
  /** Assessment chip, e.g. "Assignment 01 — 10 points". Milestone weeks
   *  must start with "Midterm" or "Final" (the homepage timeline reads
   *  that prefix to place its milestone callouts). */
  assessment: string;
  /** What the week's assignment or project involves. */
  assessmentDetail?: string;
  /** The three sessions of the week. */
  classes: CurriculumClass[];
};

/**
 * Canonical approved policy sentences (source of truth for wording, not
 * for the rules themselves — those live in `docs/04_COURSE_AND_ENROLLMENT.md`
 * and only change with owner approval). Every public place that states one
 * of these rules reads it from here, so a number, date or window can never
 * drift between the courses page, the FAQs and the Help Center.
 */
export const policies = {
  /** Applies to the six weekly assignments only. */
  weeklyDeadline:
    "Each of the six weekly assignments is due by Sunday at 11:59 PM Pakistan Standard Time (PKT).",
  /** The approved zero-mark rule — explicitly scoped to weekly assignments. */
  weeklyLateRule:
    "No deadline extensions: a weekly assignment submitted after that deadline receives zero marks for that assignment. This rule applies to the six weekly assignments only.",
  /** Project-specific dates are announced; the policy itself is final. */
  projectDeadlines:
    "Midterm and final-project submission deadlines will be announced in advance through the official course schedule.",
  /** Request within 3 calendar days; decision within 5 calendar days. */
  scoreReview:
    "Request a review of an assignment, midterm or final-project score within 3 calendar days after the result is communicated; DevSpark communicates the review decision within 5 calendar days of a valid request.",
  /** The verification feature is not live — eligibility rules are final. */
  certificateVerification: "Digital certificate verification is not currently available.",
  /** Student-initiated cancellation: official inbox, PKT deadline, 100% refund. */
  studentCancellation:
    "To cancel, email devspark.codes@gmail.com before 7:30 PM PKT on Friday, December 4, 2026 — the first paid session. The request counts from when it is received in that inbox, evaluated in Pakistan Standard Time, and should identify the student and enrollment; the contact form, WhatsApp and the Google Form are not cancellation channels, and no banking details should be sent through public forms. A request received by the deadline receives a full refund of the fee actually paid, processed within 14 calendar days of approval. At or after the deadline, student-initiated cancellation is generally non-refundable, subject to applicable exceptions and legal requirements.",
  /** DevSpark-initiated cancellation: 14 calendar days from the notice. */
  courseCancellation:
    "If DevSpark cancels the course, affected paid students receive a full refund of the fee actually paid within 14 calendar days of the official cancellation notice.",
  /**
   * Qualifying significant course change — replacement of the lead
   * instructor only. Requests are accepted at any time while the course
   * is ongoing; no approval-decision SLA is promised, only the
   * 14-calendar-day processing of approved refunds.
   */
  instructorReplacement:
    "If a qualifying significant lead-instructor replacement occurs, you may request a full refund of the course fee you actually paid by emailing devspark.codes@gmail.com at any time while the course is ongoing. New requests under this policy are not accepted after the course officially ends, subject to applicable legal rights. Approved refunds are processed within 14 calendar days after approval. Replacement of the lead instructor is the only qualifying change — ordinary schedule adjustments, tool changes and routine curriculum updates do not create this refund right, and nothing here limits any rights required by applicable law.",
} as const;

export const program = {
  index: "02",
  label: "Courses",
  title: "Generative AI Engineering",
  subtitle: "Level 01 · Cohort 01",
  description:
    "A beginner-friendly course in practical Generative AI: strong foundations in Machine Learning, neural networks and language models, then guided activities and practical projects that apply them. 8 weeks, 24 live online sessions in Urdu with English technical terminology, starting Monday, November 30, 2026 — the first two sessions are free.",
  facts: [
    { term: "Starts", value: "Monday, November 30, 2026" },
    { term: "Duration", value: "8 weeks · 24 live sessions" },
    { term: "Schedule", value: "Monday, Wednesday and Friday" },
    { term: "Session time", value: "7:30 PM – 9:30 PM (Pakistan Standard Time, UTC+5)" },
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
      term: "Free demo sessions",
      value:
        "The first two sessions — Monday, November 30, 2026 and Wednesday, December 2, 2026",
    },
    {
      term: "First paid session",
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
  enrollCta: "Register your interest",
  enrollStatus:
    "The registration link is not available right now — please use the contact page if you have a question in the meantime.",
  demoCta: "Register for a free demo",
  demoStatus:
    "Free-demo registration is not available right now — please use the contact page if you have a question in the meantime.",
  audience: {
    title: "Who this course is for",
    body: "This is a beginner-level course for absolute beginners, students, learners and anyone who wants to understand how modern AI works and use it in practice. No prior AI or programming experience is assumed.",
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
        body: "Draft reports and communication, summarize long documents, cut through repetitive tasks and give everyday productivity a practical boost.",
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
        body: "Plan content, shape creative workflows, prepare client deliverables and prototype ideas faster without giving up your own judgment.",
      },
      {
        title: "Aspiring developers and technical learners",
        body: "Understand how software, APIs and AI models fit together, and how AI supports real applications — no prior programming experience required.",
      },
    ],
    whyTitle: "Why Learn AI?",
    whyDescription:
      "AI is changing how we learn, work, and solve everyday problems. Understanding how AI works helps you use these technologies with confidence, make better decisions, and explore new possibilities. With DevSpark, you'll build a foundation in AI concepts, practice with real examples, and learn how AI can support your studies, work, and future projects.",
    whyPoints: [
      "Understand how modern AI actually works and where it genuinely helps.",
      "Improve day-to-day productivity with practical AI workflows.",
      "Write better prompts and evaluate outputs instead of trusting them blindly.",
      "Create useful documents, workflows and guided AI projects.",
      "Automate selected repetitive workflows you already do by hand.",
      "Become more adaptable as technology keeps evolving.",
      "Learn to use AI responsibly and verify outputs before acting on them.",
      "Build a foundation for more advanced AI learning.",
    ],
    note: "This is Level 01 beginner training: it builds practical, verifiable skills and a completed project — not guaranteed employment, income or business results, and not advanced AI-engineer status after 8 weeks.",
  },
  outcomes: [
    "Explain the foundations of Artificial Intelligence and Machine Learning, including how data trains a model to make predictions.",
    "Describe how neural networks are structured and how they learn, from neurons and layers to the training cycle.",
    "Explain how modern Generative AI systems and Large Language Models process information and generate outputs.",
    "Understand tokens, context windows, Transformers and model limitations at a beginner level.",
    "Write, test, evaluate and improve prompts in English or Roman Urdu using practical techniques.",
    "Explain embeddings, semantic search and RAG, and how document-based AI workflows use relevant information.",
    "Understand how web applications work: frontend, backend, APIs, HTTP and data communication.",
    "Explain AI agents, tool calling and agentic workflows, including how MCP connects models to tools.",
    "Plan, demonstrate and evaluate a simple AI-assisted project, including basic testing and documentation.",
  ],
  outcomesNote:
    "An honest outcome list: the course builds real, practical skills and a documented project — it does not promise professional AI-engineer status, jobs or income after 8 weeks.",
  /**
   * Revised Level 01 curriculum — the single structured source of truth
   * for the eight-week outline. `/courses` (`CurriculumGrid`) and the
   * homepage cohort timeline both read this array, so weeks, classes,
   * topics and assessments are never duplicated inside components.
   *
   * Class dates follow the published Monday / Wednesday / Friday
   * schedule from the first free demo (2026-11-30) through the
   * published final session (Fri, 2027-01-22). The sessions that fall
   * on Fri 2026-12-25 and Fri 2027-01-01 are public-holiday dates that
   * remain on the schedule until explicitly directed otherwise.
   */
  weeks: [
    {
      n: "01",
      title: "Artificial Intelligence & Machine Learning Foundations",
      summary:
        "Where AI begins: what artificial intelligence and machine learning are, how models learn from data, and how their predictions are checked.",
      outcome:
        "Students understand AI and ML fundamentals and can explain how data is used to train models and generate predictions.",
      assessment: "Assignment 01 — 10 points",
      assessmentDetail:
        "Explain one real-world Machine Learning use case — the data involved, possible features and labels, the prediction it makes and its limitations.",
      classes: [
        {
          n: "01",
          date: "Mon, Nov 30, 2026",
          badge: "Free demo",
          title: "AI from Zero to First Win",
          // Free demo. This introductory class and its presentation are
          // already prepared — keep its scope introductory and do not
          // expand it into an advanced technical lesson.
          topics: [
            "Introduction to Artificial Intelligence",
            "AI in everyday life",
            "AI, Machine Learning, Deep Learning, Generative AI, and Agentic AI — introductory overview",
            "AI chatbots and simple practical examples",
            "Introduction to prompts",
            "Why AI-generated answers should be verified",
            "Responsible AI usage",
            "Beginner-friendly live demonstration",
          ],
        },
        {
          n: "02",
          date: "Wed, Dec 2, 2026",
          badge: "Free demo",
          title: "Artificial Intelligence & Machine Learning | Part 1",
          topics: [
            "Artificial Intelligence vs traditional programming",
            "What Machine Learning is",
            "How machines learn from data",
            "Data and datasets",
            "Features and labels",
            "Model training vs inference",
            "Introduction to supervised learning",
            "Introduction to unsupervised learning",
            "Introduction to reinforcement learning",
            "Everyday Machine Learning applications",
          ],
          practical:
            "Visual demonstration of a simple spam-email classification problem.",
        },
        {
          n: "03",
          date: "Fri, Dec 4, 2026",
          badge: "First paid session",
          title: "Artificial Intelligence & Machine Learning | Part 2",
          topics: [
            "Complete Machine Learning lifecycle",
            "Training, validation, and test datasets",
            "Classification vs regression",
            "Predictions and model evaluation",
            "Accuracy, precision, and recall — introductory intuition",
            "Underfitting and overfitting",
            "Generalization",
            "Data quality and bias",
            "Responsible use of predictive AI",
          ],
          practical:
            "Understanding why a trained model can make correct and incorrect predictions.",
        },
      ],
    },
    {
      n: "02",
      title: "Deep Learning & Neural Networks",
      summary:
        "How neural networks are structured and how they improve at a task through training — explained visually, with no maths or programming required.",
      outcome:
        "Students understand the structure of neural networks and how training improves predictions.",
      assessment: "Assignment 02 — 10 points",
      assessmentDetail:
        "Explain the neural network training cycle and compare selected neural network architectures with their applications.",
      classes: [
        {
          n: "04",
          date: "Mon, Dec 7, 2026",
          title: "Deep Learning & Neural Network Fundamentals",
          topics: [
            "Machine Learning vs Deep Learning",
            "Artificial neural networks",
            "Artificial neurons",
            "Inputs, weights, biases, and outputs",
            "Activation functions — conceptual introduction",
            "Input, hidden, and output layers",
            "Feedforward Neural Networks (FNNs)",
            "Real-world applications",
          ],
        },
        {
          n: "05",
          date: "Wed, Dec 9, 2026",
          title: "How Neural Networks Learn",
          // Learned through detailed visual diagrams — no calculus and
          // no programming are required.
          topics: [
            "Forward propagation",
            "Predictions and loss",
            "Loss functions — conceptual understanding",
            "Gradients — simple intuition",
            "Backpropagation",
            "Weight updates and optimizers",
            "Epochs and iterations",
            "The neural network training cycle",
          ],
        },
        {
          n: "06",
          date: "Fri, Dec 11, 2026",
          title: "Neural Network Architectures & Computer Vision",
          topics: [
            "FNN overview",
            "Convolutional Neural Networks (CNNs)",
            "Recurrent Neural Networks (RNNs)",
            "Introduction to Transformers",
            "Pixels and images",
            "Image classification",
            "Object detection",
            "Image segmentation",
            "Computer Vision applications",
          ],
        },
      ],
    },
    {
      n: "03",
      title: "Modern Generative AI",
      summary:
        "How modern language models read and produce language — from tokens and attention to text, image, audio and video generation.",
      outcome:
        "Students understand how modern language models process information and generate outputs.",
      assessment: "Assignment 03 — 10 points",
      assessmentDetail:
        "Explain an LLM's simplified response-generation process with a visual diagram, including examples of tokens, context and output limitations.",
      classes: [
        {
          n: "07",
          date: "Mon, Dec 14, 2026",
          title: "NLP, Language Models & Generative AI",
          topics: [
            "Natural Language Processing (NLP)",
            "NLP applications",
            "Traditional NLP vs modern language models",
            "What language models are",
            "Large Language Models (LLMs)",
            "Pretraining",
            "Self-supervised learning — introductory concept",
            "How language models generate text",
            "Generative AI vs traditional predictive systems",
          ],
        },
        {
          n: "08",
          date: "Wed, Dec 16, 2026",
          title: "Inside LLMs: Tokens, Context & Transformers",
          // Important core class — explained with a visual, step-by-step
          // walkthrough of how an LLM turns an input into a response.
          topics: [
            "Tokens",
            "Tokenization",
            "Token IDs — conceptual introduction",
            "Context",
            "Context windows",
            "Next-token prediction",
            "Attention mechanism",
            "Self-attention — visual intuition",
            "Transformers",
            "How an LLM processes an input and generates a response",
            "Model limitations",
          ],
        },
        {
          n: "09",
          date: "Fri, Dec 18, 2026",
          title: "Multimodal AI & Modern Model Capabilities",
          // Advanced model training and optimization stay outside the
          // required Level 01 scope.
          topics: [
            "Text generation",
            "Image generation",
            "Audio generation",
            "Video generation",
            "Multimodal models",
            "Reasoning models — conceptual introduction",
            "Large vs Small Language Models",
            "AI hallucinations",
            "Reliability and model evaluation",
            "Real-world Generative AI applications",
          ],
        },
      ],
    },
    {
      n: "04",
      title: "Prompt & Context Engineering",
      summary:
        "Writing clear instructions, adding the right examples and context, and judging whether the output is actually useful — in English or Roman Urdu.",
      outcome:
        "Students can design, evaluate, and improve useful prompts in English or Roman Urdu.",
      assessment: "Midterm Project — 15 points",
      assessmentDetail:
        "Create and demonstrate a reusable, no-code, prompt-based AI workflow with documented instructions, example outputs, verification and improvements.",
      classes: [
        {
          n: "10",
          date: "Mon, Dec 21, 2026",
          title: "Prompt Engineering Foundations",
          topics: [
            "What a prompt is",
            "Why instructions influence AI responses",
            "Task, context, constraints, and desired output",
            "System vs user instructions — beginner understanding",
            "Zero-shot prompting",
            "Clear vs unclear prompts",
            "Writing prompts in English and Roman Urdu",
          ],
        },
        {
          n: "11",
          date: "Wed, Dec 23, 2026",
          title: "Prompting Techniques & Output Quality",
          topics: [
            "Few-shot prompting",
            "Providing examples",
            "Prompt refinement",
            "Iterative prompting",
            "Prompt chaining",
            "Structured output requests",
            "JSON-format awareness",
            "Reusable prompt templates",
            "Testing output quality",
          ],
        },
        {
          n: "12",
          date: "Fri, Dec 25, 2026",
          title: "Context Engineering & Practical Workflows",
          topics: [
            "What context engineering means",
            "Relevant vs irrelevant information",
            "Supplying useful reference information",
            "Managing context",
            "Document-grounded prompting",
            "Multimodal instructions",
            "Designing reusable workflows",
            "Evaluating output quality",
            "Guided practical activity",
          ],
        },
      ],
    },
    {
      n: "05",
      title: "Embeddings, Semantic Search, RAG & Documents",
      summary:
        "How AI finds the right information — meaning-based search, retrieval from documents, and grounded answers that can be checked against sources.",
      outcome:
        "Students understand how AI applications use relevant external information to answer questions.",
      assessment: "Assignment 04 — 10 points",
      assessmentDetail:
        "Design a sample document-based AI assistant workflow, including retrieval, output verification and known limitations.",
      classes: [
        {
          n: "13",
          date: "Mon, Dec 28, 2026",
          title: "Vectors, Embeddings & Semantic Search",
          topics: [
            "Basic concept of vectors",
            "What embeddings are",
            "Embedding models",
            "Semantic similarity",
            "Keyword search vs semantic search",
            "Similarity-based retrieval",
            "Real-world applications",
          ],
        },
        {
          n: "14",
          date: "Wed, Dec 30, 2026",
          title: "Retrieval-Augmented Generation & Vector Databases",
          // Vector databases are presented as one retrieval option — do
          // not imply every RAG system must use one.
          topics: [
            "What RAG is",
            "Why RAG is useful",
            "RAG vs relying only on model training",
            "Document chunking",
            "Embeddings and retrieval",
            "Vector databases",
            "Retrieval pipelines",
            "Supplying retrieved context to language models",
            "Grounded answer generation",
            "RAG limitations and verification",
          ],
        },
        {
          n: "15",
          date: "Fri, Jan 1, 2027",
          title: "AI for Documents & Research",
          topics: [
            "Document understanding",
            "AI-assisted research",
            "Summarization",
            "Information extraction",
            "Document question answering",
            "Source references and verification",
            "Reliable research workflows",
            "Privacy and confidential documents",
          ],
        },
      ],
    },
    {
      n: "06",
      title: "Software & Backend Foundations for AI Applications",
      summary:
        "How websites and apps work behind the scenes, and how an AI model is connected to a real product through APIs — described conceptually.",
      outcome:
        "Students understand how modern software applications operate and how AI models connect to applications.",
      assessment: "Assignment 05 — 10 points",
      // No mandatory backend coding in Level 01 — this week is
      // conceptual, not a coding requirement.
      assessmentDetail:
        "Explain an AI-powered application's architecture with a diagram and simple request-response examples.",
      classes: [
        {
          n: "16",
          date: "Mon, Jan 4, 2027",
          title: "How Modern Applications Work",
          topics: [
            "Websites and web applications",
            "Frontend",
            "Backend",
            "Databases",
            "Clients and servers",
            "Local vs hosted applications",
            "Cloud hosting",
            "Domains and deployment",
            "Static vs dynamic applications",
            "Software as a Service (SaaS)",
            "AI-powered SaaS architecture",
          ],
        },
        {
          n: "17",
          date: "Wed, Jan 6, 2027",
          title: "APIs, HTTP & Data Communication",
          topics: [
            "APIs",
            "API endpoints",
            "URLs",
            "HTTP vs HTTPS",
            "Client requests and server responses",
            "HTTP methods: GET, POST, PUT, PATCH, DELETE",
            "CRUD operations",
            "JSON structure",
            "Common HTTP status codes",
            "API keys",
            "Authentication — conceptual introduction",
          ],
        },
        {
          n: "18",
          date: "Fri, Jan 8, 2027",
          title: "Connecting AI Models to Applications",
          topics: [
            "How frontend and backend communicate",
            "How backend services connect to LLM APIs",
            "AI API requests and responses",
            "JSON payload examples",
            "Data processing",
            "API usage and cost",
            "Latency",
            "Rate limits",
            "Error handling",
            "Security basics",
            "Simple AI application architecture",
          ],
        },
      ],
    },
    {
      n: "07",
      title: "AI Agents, Agentic AI, Tools & MCP",
      summary:
        "What AI agents are, how they call tools and follow protocols such as MCP, and how to plan a simple agentic workflow step by step.",
      outcome:
        "Students understand the basic architecture of AI agents and can design a simple agentic workflow.",
      assessment: "Assignment 06 — 10 points",
      assessmentDetail:
        "Design a beginner-level agentic workflow covering goals, tools, actions, permissions and testing criteria.",
      classes: [
        {
          n: "19",
          date: "Mon, Jan 11, 2027",
          title: "AI Agents & Agentic AI",
          topics: [
            "Chatbots vs AI assistants vs AI agents",
            "Agentic AI",
            "Goals and tasks",
            "Planning",
            "Actions and observations",
            "Agent workflows",
            "Autonomy and human supervision",
            "Single-agent vs multi-agent overview",
            "Reliability and limitations",
          ],
        },
        {
          n: "20",
          date: "Wed, Jan 13, 2027",
          title: "Tools, Plugins, Skills & MCP",
          // "Plugin", "connector" and "skill" are platform-dependent
          // terms — explain the variation rather than one fixed meaning.
          topics: [
            "AI tool calling",
            "External tools and APIs",
            "Plugins and connectors",
            "Reusable AI skills",
            "Model Context Protocol (MCP)",
            "MCP clients and servers",
            "MCP tools, resources, and prompts",
            "Permissions and access control",
            "Tool security and prompt injection — basic awareness",
          ],
        },
        {
          n: "21",
          date: "Fri, Jan 15, 2027",
          title: "Designing an Agentic Workflow",
          topics: [
            "Problem definition",
            "Goal decomposition",
            "Planning steps",
            "Selecting tools",
            "Executing actions",
            "Checking intermediate results",
            "Human-in-the-loop approvals",
            "Handling failures",
            "Workflow testing",
            "Evaluation and improvement",
            "Guided agentic workflow demonstration",
          ],
        },
      ],
    },
    {
      n: "08",
      title: "Final Project, Testing & Showcase",
      summary:
        "Building, testing, documenting and presenting a beginner-level AI-assisted solution — and reflecting on what to learn next.",
      outcome:
        "Students demonstrate a documented, tested, beginner-level AI-assisted solution.",
      assessment: "Final Project — 25 points",
      assessmentDetail:
        "Present a documented, tested, beginner-level AI-assisted solution: the problem it solves, the workflow used, the test results and its limitations.",
      classes: [
        {
          n: "22",
          date: "Mon, Jan 18, 2027",
          title: "Guided Final Project Development",
          topics: [
            "Implementing the selected project",
            "Reviewing requirements",
            "Building or connecting workflow components",
            "Evaluating generated outputs",
            "Troubleshooting",
            "Guided improvements",
          ],
        },
        {
          n: "23",
          date: "Wed, Jan 20, 2027",
          title: "Testing, Documentation & Refinement",
          topics: [
            "Functional testing",
            "Identifying incorrect outputs",
            "Limitations and edge cases",
            "Privacy checks",
            "Quality improvements",
            "Test checklists",
            "README documentation",
            "Demonstration preparation",
          ],
        },
        {
          n: "24",
          date: "Fri, Jan 22, 2027",
          title: "Final Project Showcase",
          topics: [
            "Student project demonstrations",
            "Explaining the problem and solution",
            "Showing practical workflows",
            "Discussing limitations",
            "Instructor feedback",
            "Learning reflection",
            "Possible Level 02 learning pathways",
          ],
        },
      ],
    },
  ],
  methodology: {
    title: "How sessions are taught",
    points: [
      "Conceptual understanding: complex AI concepts explained in simple language while keeping the technical terms accurate.",
      "Visual learning: diagrams, flowcharts, real-world examples and comparisons that show how systems work.",
      "Interactive teaching: questions, discussion and knowledge checks that keep everyone involved.",
      "Live demonstrations: how AI tools, models and applications behave in realistic situations.",
      "Guided practice: manageable exercises, weekly assignments and structured projects that apply each concept.",
      "Critical thinking: verifying AI outputs, recognizing limitations and considering privacy before trusting a result.",
    ],
    notes: [
      "Students do not need to create or give slide presentations.",
      "No requirement to manually write programming code.",
      "Downloadable slide or PDF files are not provided.",
      "Advanced technologies are explained conceptually — implementing them independently belongs to later learning stages.",
    ],
    delivery:
      "Sessions are delivered live on Google Meet using structured presentations, practical demonstrations, guided exercises and interactive discussions. When helpful, the instructor also uses visual diagrams and workflows through Excalidraw to explain concepts more clearly. Joining details will be shared with registered and confirmed students before their sessions.",
  },
  materials: {
    title: "Learning materials",
    items: [
      "Session recordings",
      "Session notes",
      "Supporting resources",
      "Assignments and project guidance",
    ],
    note: "Session recordings are provided to enrolled students — a student who misses a live session can review the recording and catch up on the covered material. How recordings and the other materials are shared is confirmed directly with enrolled students; there is no student portal yet.",
  },
  assessment: {
    title: "Assignments and projects",
    description:
      "The course is assessed on a 100-point system built from weekly work and two projects.",
    total: "100 points",
    formula: "6 × 10 + 15 + 25 = 100",
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
    deadline: policies.weeklyDeadline,
    late: policies.weeklyLateRule,
    projectsDeadline: policies.projectDeadlines,
    review: `Score review: ${policies.scoreReview}`,
  },
  certificate: {
    title: "Certificate of completion",
    status: "Confirmed",
    body: `Students who successfully complete the requirements below receive a DevSpark Certificate of Completion, issued by DevSpark. ${policies.certificateVerification}`,
    requirements: [
      "Attend at least 20 of the 24 live sessions — the two free demos included — 80% attendance.",
      "Score at least 60 out of 100 on the 100-point assessment.",
      "Complete and submit all six assignments.",
      "Complete and submit the midterm project.",
      "Complete and submit the final project.",
      "Submitted work must meaningfully meet the assignment and project requirements — an empty submission alone does not count as completed work.",
    ],
    note: "Both minimums are required together: at least 80% attendance (counting both free demos in the 24 sessions) and at least 60 out of 100. Attendance exceptions, if permitted, are considered case by case and never guarantee a certificate.",
  },
  awards: {
    title: "Top Three Student Awards",
    status: "Confirmed",
    body: "The top three eligible students each receive a 100% refund of the course fee they actually paid — PKR 3,000 or PKR 4,000, whichever applied — settled by verified bank transfer within 7 calendar days after the final verified winners are announced, plus recognition on DevSpark's LinkedIn profile only with the student's explicit permission.",
    requirements: [
      "Attend all 24 live sessions — both free demos and all 22 paid sessions (100% attendance).",
      "Complete and submit all six assignments, the midterm project and the final project.",
      "Score at least 60 out of 100 — the certificate's minimum score.",
      "Place among the top three students under the 100-point assessment system.",
      "Have all course fees settled.",
      "Have no verified academic-integrity violation.",
    ],
    ranking:
      "Ranking uses the overall score out of 100. Ties are resolved by the higher final-project score, then the higher midterm score, then the higher combined assignment score. If all remain equal the students share a joint rank under standard competition ranking (for example 1, 1, 3), and every eligible student occupying competition rank 1, 2 or 3 receives the award — which can mean more than three recipients.",
    rankingNote:
      "Winners are announced only after the score-review window has closed and all valid review requests have been resolved; the seven-day refund countdown begins at that final verified winners announcement.",
    note: "Certificate and award eligibility are not the same: 20 of 24 sessions can earn a certificate, but these awards require all 24 — so a student who enrolls after the free demos can still complete the course and earn a certificate, yet cannot qualify for an award, and watching a recording does not restore that attendance. Students' photos or personal profiles are never published without explicit permission.",
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
    oneline: "One-time payment for the complete 8-week course.",
    eligibility:
      "Early-bird pricing applies to the first 20 confirmed paid enrollments for Cohort 01.",
    note: "Submitting the interest form does not reserve a seat or confirm payment. Payment and seat-confirmation instructions will be shared separately — paid enrollment and each early-bird place are confirmed only after DevSpark verifies the payment was actually received; a payment screenshot alone is not proof.",
  },
  registration: {
    label: "Registration",
    title: "How registration works",
    description:
      "Register for our first two free demo sessions and express your interest in the full course through one simple form. No payment required. Paid enrollment is available both before and after the demos.",
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
      title: "Attend the two free demo sessions",
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
      body: "Confirmation, Google Meet joining details and session instructions are shared with enrolled students before their sessions begin.",
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
        "Cohort 01 starts on Monday, November 30, 2026 and runs for 8 weeks: 24 live online sessions on Monday, Wednesday and Friday, from 7:30 PM to 9:30 PM Pakistan Standard Time (UTC+5). The first two sessions — November 30 and December 2 — are free demos; the first paid instructional session is Friday, December 4, 2026, and the final scheduled session is Friday, January 22, 2027 if the schedule runs uninterrupted.",
    },
    {
      question: "How much does the course cost?",
      answer:
        "The standard course fee is PKR 4,000 — a one-time payment for the complete 8-week course, not a monthly fee. Cohort 01 also has an introductory early-bird fee of PKR 3,000 (25% off, PKR 1,000 saving) for the first 20 confirmed paid enrollments. The Google Form does not reserve the offer or confirm payment — payment and seat-confirmation instructions are shared separately.",
    },
    {
      question: "Are the first sessions free?",
      answer:
        "Yes. The first two sessions are free: Monday, November 30, 2026 and Wednesday, December 2, 2026, so learners can experience the teaching before deciding whether to continue.",
    },
    {
      question: "Will the course be taught in Urdu or English?",
      answer:
        "The course is taught in Urdu, with English technical terminology. If you would like to experience a session before deciding whether to continue, the first two sessions are free.",
    },
    {
      question: "How do I register or enroll?",
      answer:
        "Registration runs through a Google Form — use the Register button on this page to open it. Submitting the form registers your interest and free-demo participation; it does not confirm paid enrollment, and the website does not collect payments. Submitting the form does not reserve the early-bird offer — payment and seat-confirmation instructions are shared separately.",
    },
    {
      question: "Do I need to write code myself?",
      answer:
        "No previous programming experience is required. Level 01 focuses on strong conceptual understanding: you will learn how software, backends, APIs and JSON work in basic terms, and sessions may demonstrate short code examples or AI-assisted workflows to illustrate a concept. You are not expected to build a full application from scratch using traditional programming — guided activities, assignments and the projects are designed for beginners, while advanced coding and engineering belong to later learning stages.",
    },
    {
      question: "Is there a certificate?",
      answer:
        `Yes. A DevSpark Certificate of Completion requires both at least 20 of the 24 live sessions attended (80% attendance, counting the two free demos) and an overall score of at least 60 out of 100, with all six assignments, the midterm and the final project submitted. ${policies.certificateVerification}`,
    },
    {
      question: "What happens if I submit an assignment late?",
      answer: `${policies.weeklyDeadline} ${policies.weeklyLateRule} ${policies.projectDeadlines}`,
    },
    {
      question: "Can I enroll before or after the free demo sessions?",
      answer:
        "Yes — paid enrollment is allowed both before and after the two free demo sessions. You can pay and confirm enrollment before the demos (confirmed after DevSpark verifies the payment), or attend the free demos on November 30 and December 2 and then decide. One caveat: the Top Three Student Awards require attending all 24 sessions, including both free demos, so a student who enrolls after the demos cannot qualify for those awards.",
    },
    {
      question: "How are sessions taught?",
      answer:
        "Sessions are live online through Google Meet, delivered primarily with structured presentations, practical demonstrations, guided activities and interactive discussions. When helpful, the instructor also uses visual diagrams and workflows through Excalidraw to explain concepts more clearly. Joining details will be shared with registered and confirmed students before their sessions — there is no public meeting link.",
    },
    {
      question: "What happens if I miss a live session?",
      answer:
        "Session recordings are provided to enrolled students, so a missed lesson can be reviewed and the covered material caught up on. Recordings do not replace live attendance: the certificate still requires attending at least 20 of the 24 live sessions.",
    },
    {
      question: "Can I cancel and get a refund?",
      answer: `${policies.studentCancellation} ${policies.courseCancellation} Full terms are in the Help Center.`,
    },
    {
      question: "What if the lead instructor is replaced?",
      answer: policies.instructorReplacement,
    },
  ],
};

const programFact = (term: string): string => {
  const found = program.facts.find((f) => f.term === term);
  if (!found) throw new Error(`programDisplay: missing fact "${term}"`);
  return found.value;
};

const programMatch = (
  re: RegExp,
  text: string,
  what: string
): RegExpMatchArray => {
  const m = text.match(re);
  if (!m) throw new Error(`programDisplay: unexpected ${what} format`);
  return m;
};

/**
 * Compact course display strings derived from `program` — the single
 * place components read these labels from, so no course fact is ever
 * restated inside a UI file. Every value is computed from the published
 * `facts` (and the curriculum weeks) above and fails the build with a
 * clear message if a fact's format ever changes.
 */
export const programDisplay = (() => {
  const starts = programFact("Starts");
  const duration = programFact("Duration");
  const schedule = programFact("Schedule");
  const sessionTime = programFact("Session time");
  const format = programFact("Format");
  const freeDemo = programFact("Free demo sessions");

  const [, weeks, sessions] = programMatch(
    /^(\d+) weeks · (\d+) live sessions$/,
    duration,
    "Duration"
  );
  const [, clock, tzName, tzOffset] = programMatch(
    /^(.+?) – [^(]+ \((.+), (.+)\)$/,
    sessionTime,
    "Session time"
  );
  const [, demoCount] = programMatch(
    /The first (\w+) sessions/,
    freeDemo,
    "Free demo sessions"
  );
  const demoDatesPart = freeDemo.split(" — ")[1];
  const demoDates = demoDatesPart ? demoDatesPart.split(" and ") : [];
  if (demoDates.length !== 2) {
    throw new Error("programDisplay: unexpected Free demo sessions dates");
  }

  const scheduleDays = schedule.split(/, | and /);
  if (scheduleDays.length !== 3) {
    throw new Error("programDisplay: unexpected Schedule format");
  }

  const noCodePrereq = program.audience.prerequisites.find((p) =>
    p.startsWith("No programming experience")
  );
  if (!noCodePrereq) {
    throw new Error("programDisplay: missing programming prerequisite");
  }

  const curriculumWeeks: CurriculumWeek[] = program.weeks;
  const freeWeek = curriculumWeeks.find((w) =>
    w.classes.some((c) => c.badge === "Free demo")
  );
  if (!freeWeek) {
    throw new Error("programDisplay: missing free-demo curriculum week");
  }

  const startMs = Date.parse(program.startsAt);
  if (Number.isNaN(startMs)) {
    throw new Error("programDisplay: unparseable program.startsAt");
  }
  const startsShort = new Date(startMs).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Karachi",
  });

  const [level, cohort] = program.subtitle.split(" · ");
  if (!level || !cohort) {
    throw new Error("programDisplay: unexpected program.subtitle format");
  }

  const demoCountLabel =
    demoCount.charAt(0).toUpperCase() + demoCount.slice(1);

  return {
    level,
    cohort,
    courseHeading: `${program.title} — ${level}`,
    starts,
    startsShort,
    startClock: `${clock} ${tzName} (${tzOffset})`,
    sessionTime,
    scheduleLine: `${duration} · ${schedule}`,
    sessionsPerWeek: `${sessions} sessions · three per week`,
    daysShort: scheduleDays.map((day) => day.slice(0, 3)).join(" · "),
    freeWeekLegend: `Week ${parseInt(freeWeek.n, 10)} — first ${demoCount} sessions free`,
    demoDates,
    chips: [
      `Starts ${startsShort}`,
      `${weeks} weeks · ${sessions} sessions`,
      format.split(" — ")[0],
      `${demoCountLabel} free demo sessions`,
      noCodePrereq.replace(/\.$/, ""),
    ],
  };
})();

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
  title: "Common questions",
  description:
    "Only confirmed information is published here. Unresolved details are explained in the relevant section.",
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
      question: "Are the first sessions free?",
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
        cta: { label: "Write your message", href: "#contact-form" },
      },
      {
        slug: "project",
        title: "Project inquiries",
        body: "For businesses and clients seeking custom software, AI solutions or workflow automation — not for course enrollment or general support. This opens the form with the Project inquiry category selected.",
        cta: {
          label: "Discuss a project",
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
    note: "Email us directly at the address below, reach out through a social profile, or send a message with the form — whichever is easiest. We reply to the email address you provide.",
    items: [
      { label: "Email", status: "Available" },
      { label: "Contact form", status: "Available" },
      { label: "Social profiles", status: "Available" },
      { label: "GitHub (projects)", status: "Available" },
    ],
  },
  secondaryCta: { label: "Explore the program", href: "/courses" },
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
        "The request took too long and was canceled. Your message is still here — please try again.",
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
          slug: "official-course-information",
          title: "Where to find official course information",
          summary:
            "The schedule, deadlines, attendance rules, certificate criteria and refund instructions are all published — this guide points to where each one lives.",
          keywords: [
            "schedule",
            "deadline",
            "course information",
            "official",
            "policy",
            "policies",
            "updates",
            "attendance",
            "certificate",
            "refund",
            "review",
          ],
          sections: [
            {
              heading: "Where the official schedule is published",
              body: "The complete Cohort 01 schedule — all 24 class dates, the Monday, Wednesday and Friday 7:30 PM to 9:30 PM Pakistan Standard Time slot, the topics for each class and the assessment for each week — is published on the courses page, together with the course-at-a-glance facts: start date, fees, free demo dates and the session breakdown. That page is the single public source for the schedule.",
              link: { label: "See the class-by-class schedule", href: "/courses#curriculum" },
            },
            {
              heading: "Which course policies are already confirmed",
              body: "Fees and the early-bird offer, the 100-point assessment, certificate eligibility, the Top Three Student Awards, the score-review windows and the cancellation and refund rules are all settled and published — none of them is waiting on a decision. The courses page carries the full wording, and the guides in this Help Center summarize it in shorter form.",
            },
            {
              heading: "Deadlines for assignments and projects",
              body: `${policies.weeklyDeadline} ${policies.weeklyLateRule} ${policies.projectDeadlines}`,
              link: { label: "Open the assessment section", href: "/courses#assessment" },
            },
            {
              heading: "Attendance, certificate and awards",
              body: `The certificate requires at least 20 of the 24 live sessions attended — both free demos count — plus at least 60 out of 100 overall and all six assignments, the midterm and the final project submitted. The Top Three Student Awards are stricter: they require all 24 sessions, every assignment and project submitted, fees settled and no verified academic-integrity violation, ranked by assessment score. Session recordings are provided to enrolled students for revision, but watching a recording does not count as live attendance. ${policies.certificateVerification}`,
              link: { label: "Read the certificate and awards rules", href: "/courses#recognition" },
            },
            {
              heading: "Requesting a score review",
              body: `${policies.scoreReview} Send the request through the contact page with the Course & enrollment question category, or by emailing devspark.codes@gmail.com. Top Three Student Awards winners are announced only after the review window has closed and every valid review request has been resolved.`,
              link: { label: "Open the contact page", href: "/contact" },
            },
            {
              heading: "Cancellations and refunds",
              body: `${policies.studentCancellation} ${policies.courseCancellation} A qualifying significant lead-instructor replacement gives an affected paid student the same full-refund right — the request may be sent to devspark.codes@gmail.com at any time while the course is ongoing, but not after the course officially ends, subject to applicable legal rights. Top Three Student Awards refunds follow their own timeline: 100% of the fee actually paid, within 7 calendar days after the final verified winners announcement.`,
              link: { label: "Read the refund FAQs", href: "/courses#faq" },
            },
            {
              heading: "Official channels for specific actions",
              body: "Registration and free-demo sign-up: the Google Form linked from the courses page. Cancellation and refund requests: devspark.codes@gmail.com. Score-review requests: the contact page or devspark.codes@gmail.com. General questions: the contact page. Published schedules and policies: the courses page and this Help Center. Payment instructions are shared individually after registration — the website does not take payments.",
              link: { label: "Open the contact page", href: "/contact" },
            },
          ],
          cta: { label: "Open the courses page", href: "/courses" },
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
              body: "Type into the Search help box to match guide titles, summaries, keywords and section content as you type. Results update immediately.",
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
              body: "Use the Contact us button in the Help Center or the Contact link in the menu. Both open the same page.",
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
              body: "Use the Solutions link in the menu, or the Explore our solutions button at the end of this Help Center, to see the three proposed focus areas: AI-powered solutions, workflow automation and custom software.",
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
              body: "Use any Discuss a project button on the site. It opens the contact page with the Project inquiry category already selected. That button is for potential clients seeking a solution — not for course enrollment or general support.",
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
              body: "Basic computer and internet usage skills are recommended, along with access to a computer or laptop and a stable internet connection for the hands-on project work. The schedule, fee and full 8-week curriculum are published on the courses page.",
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
            "refund",
            "cancellation",
            "money back",
            "payment",
          ],
          sections: [
            {
              heading: "The registration form",
              body: "Free-demo registration and course registration of interest both run through one Google Form. Open it from the Register button on the courses page and complete it — there is no other registration route. Submitting the form does not confirm paid enrollment.",
            },
            {
              heading: "Before you enroll",
              body: "The first two sessions are free — Monday, November 30, 2026 and Wednesday, December 2, 2026 — so learners can experience the teaching live. Paid enrollment is available both before and after these demos: pay early to confirm your seat before the course starts, or attend the demos first and then decide. A student who enrolls after the demos cannot meet the Top Three Student Awards' strict 24/24 attendance requirement.",
            },
            {
              heading: "After the form",
              body: "Confirmation, Google Meet joining details and session instructions are shared with enrolled students before their sessions begin. Paid enrollment — including early-bird eligibility and payment instructions — is confirmed separately and only after DevSpark verifies that the payment was actually received; a payment screenshot alone is not proof. The website does not collect payments, create student accounts or issue student IDs.",
            },
            {
              heading: "Cancellations and refunds",
              body: policies.studentCancellation,
            },
            {
              heading: "If DevSpark cancels the course",
              body: `${policies.courseCancellation} This is separate from the seven-day Top Three Student Awards refund timeline.`,
            },
            {
              heading: "If the lead instructor is replaced",
              body: policies.instructorReplacement,
            },
          ],
        },
        {
          slug: "free-introductory-classes",
          title: "Are the first sessions free?",
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
            "Start date, schedule, teaching platform, fee and the 8-week curriculum are now published on the courses page.",
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
              body: "Cohort 01 starts Monday, November 30, 2026 and runs for 8 weeks — 24 live online sessions on Google Meet, Monday, Wednesday and Friday, 7:30 PM to 9:30 PM Pakistan Standard Time (UTC+5). The first two sessions — November 30 and December 2 — are free demos; the remaining 22 sessions are the paid course, with the first paid instructional session on Friday, December 4, 2026. The standard fee is PKR 4,000, a one-time payment for the complete course, with an introductory early-bird fee of PKR 3,000 for the first 20 confirmed paid enrollments. The complete 8-week curriculum and the 100-point assessment system are published on the courses page.",
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
            "8 weeks of beginner-friendly topics, a 100-point assessment system, and a confirmed certificate of completion for eligible students.",
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
            "recordings",
            "recorded",
            "catch up",
            "attendance",
            "deadline",
          ],
          sections: [
            {
              heading: "8-week curriculum",
              body: "The course runs across 8 weeks — from artificial intelligence and machine learning foundations, through deep learning, modern generative AI, prompt and context engineering, embeddings and RAG, software and API fundamentals, and agentic AI, to a guided final project. Every week lists its classes, detailed topics, a practical outcome and its assessment on the courses page.",
            },
            {
              heading: "Session recordings",
              body: "Session recordings are provided to enrolled students, so a missed lesson can be reviewed and the covered material caught up on. Recordings do not replace live attendance — the certificate still requires at least 20 of the 24 live sessions attended. Course details are published on the courses page.",
            },
            {
              heading: "100-point assessment system",
              body: `Six weekly assignments worth 10 points each (60), a midterm project in Week 4 (15) and a final project in Week 8 (25) add up to 100 points. Assignments are released on Fridays in Weeks 1, 2, 3, 5, 6 and 7. ${policies.weeklyDeadline} ${policies.weeklyLateRule} ${policies.projectDeadlines}`,
            },
            {
              heading: "Score review",
              body: `${policies.scoreReview} Send the request through the contact page or by emailing devspark.codes@gmail.com. Top Three Student Awards winners are announced only after the review window has closed and all valid review requests are resolved.`,
            },
            {
              heading: "Certificate of completion",
              body: `Students who successfully complete the course requirements receive a DevSpark Certificate of Completion: at least 20 of the 24 live sessions attended (80% attendance, counting both free demos) and at least 60 out of 100 overall, with all six assignments, the midterm and the final project submitted, and submitted work that meaningfully meets the requirements. Attendance exceptions, if permitted, are considered case by case and never guarantee a certificate. ${policies.certificateVerification}`,
            },
            {
              heading: "Top Three Student Awards",
              body: `The top three eligible students each receive a 100% refund of the course fee they actually paid — PKR 3,000 or PKR 4,000, whichever applied — by verified bank transfer within 7 calendar days after the final verified winners are announced, plus LinkedIn recognition only with the student's explicit permission. Eligibility requires attending all 24 live sessions — both free demos and all 22 paid sessions — submitting all six assignments, the midterm and the final project, at least 60 out of 100 overall, fees settled and no verified academic-integrity violation; the certificate's case-by-case attendance exception does not apply to these awards. Ranking uses the overall score; ties go to the higher final project, then the higher midterm, then the higher combined assignments, with equal students sharing a joint rank under standard competition ranking (for example 1, 1, 3) — every eligible student at competition rank 1, 2 or 3 wins, so a complete tie can produce more than three recipients. A student who enrolls after the free demos can still complete the course but cannot meet the 24/24 award attendance, and watching a recording does not restore it.`,
            },
          ],
          cta: { label: "Open the courses page", href: "/courses" },
        },
      ],
    },
  ],
  contactCta: { label: "Contact us", href: "/contact" },
  solutionsCta: { label: "Explore our solutions", href: "/solutions" },
  programCta: { label: "Explore the program", href: "/courses" },
};
