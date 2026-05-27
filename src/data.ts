import { Project, WorkExperience, EducationCertification, SkillCategory } from './types';

export const PERSONAL_INFO = {
  name: "Timothy Stephen Mayor",
  title: "Backend & AI Software Engineer",
  tagline: "The AI Solutions Consultant",
  location: "Lagos, Nigeria",
  phone: "(+234) 805 343 6373",
  email: "tsmayorllc@gmail.com",
  portfolioUrl: "http://timothymayor.pro",
  githubUrl: "https://github.com/timothymayor",
  linkedinUrl: "https://linkedin.com/in/timothymayor",
  overview: [
    "Backend & AI Software Engineer with 12 years of experience in building production-grade software solutions, intelligent internal tools, and scalable backend systems using FastAPI, React, PostgreSQL, Redis, TensorFlow, and LangChain.",
    "My work combines robust backend architecture, security-first API design, AI-powered automation, comprehensive authentication systems, asynchronous workflows, and clean system design to deliver practical software responses that users and enterprises can absolutely depend on."
  ],
  coreCompetencies: [
    "REST API Architecture",
    "Authentication & RBAC",
    "Multi-Tenant SaaS Systems",
    "Background Job Processing",
    "PostgreSQL Data Modeling",
    "Redis Caching & Queues",
    "AI Integrations with LangChain",
    "TensorFlow-based ML Workflows",
    "Async Systems & Automation",
    "Scalable Backend Design",
    "Deployment & Production Reliability"
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "inteldesk",
    name: "IntelDesk",
    tagline: "Enterprise AI operational knowledge assistant",
    stack: ["FastAPI", "PostgreSQL", "Redis", "LangChain", "TensorFlow", "React"],
    keyFeatures: [
      "Semantic document search across SOPs, policies, internal docs, and knowledge articles",
      "AI-powered Q&A workflows with source-aware responses identifying precise references",
      "In-depth document ingestion, automatic parsing, chunking, and metadata indexing pipeline",
      "Permission-aware role retrieval designed specifically for teams, admins, and content owners",
      "Admin content management dashboard for maintaining knowledge assets and configurations",
      "Comprehensive search analytics and usage tracking mechanisms to measure team adoption"
    ],
    architectureHighlights: [
      "Built resilient retrieval workflows utilizing LangChain chain architectures",
      "Implemented and optimized high-performance vector-based search index pipelines",
      "Designed secure, metadata-driven multi-tenant document access controls",
      "Created highly responsive asynchronous chunk ingestion workflows for large sets",
      "Structured a highly modular, clean backend service architecture for seamless scalability"
    ],
    outcomeImpact: [
      "Vastly improved internal knowledge discoverability, cutting repetitive internal support requests",
      "Drastically accelerated response times for operational support teams with consistent answers"
    ],
    themeColor: "cyan"
  },
  {
    id: "doculens",
    name: "DocuLens",
    tagline: "Intelligent document classification, extraction & review system",
    stack: ["FastAPI", "TensorFlow", "PostgreSQL", "Redis", "React"],
    keyFeatures: [
      "AI document classification workflows to route, tag, and triage incoming streams",
      "Automated summary generation tools designed to speed up administrative manual review",
      "Fully searchable doc archives enabling discovery, filtering, and deep audit compliance",
      "Collaborative review queues utilizing background worker status-based priority routing",
      "Multi-stage approval pipelines integrated dynamically for final operational sign-offs"
    ],
    architectureHighlights: [
      "Built custom AI parsing and classification pipelines using TensorFlow models",
      "Integrated machine learning classification workflows into backend queues gracefully",
      "Implemented highly scalable asynchronous processing structures using Redis task brokers",
      "Designed efficient, indexing-optimized searchable metadata storage architectures",
      "Optimized object storage interfaces and multi-stage cache-aside retrieval schemas"
    ],
    outcomeImpact: [
      "Minimized manual review overhead by 65% and boosted extraction accuracy consistency",
      "Accelerated document processing and approval turnaround via automated queue-driven flows"
    ],
    themeColor: "purple"
  },
  {
    id: "worklinehq",
    name: "WorklineHQ",
    tagline: "Scalable business workflow orchestration & background job engine",
    stack: ["FastAPI", "PostgreSQL", "Redis", "React", "Docker"],
    keyFeatures: [
      "Custom approval workflows configured specifically for parallel and serial business operations",
      "Multi-stage task routing accompanied by automated deadline escalation triggers",
      "Flexible webhook systems allowing secure triggers from external third-party platforms",
      "Robust background job scheduling and orchestration for decoupled asynchronous tasks",
      "Integrated notification subsystems dispatching instant reminders, SMS, and alerts",
      "Rich operational dashboards providing visual activity logs and job queue telemetry"
    ],
    architectureHighlights: [
      "Engineered an event-driven backplane structure supporting pub/sub event routers",
      "Implemented reliable async processors yielding high throughput task parallelization",
      "Designed stable workflow state machine transitions avoiding race conditions in execution",
      "Optimized job processing reliability with custom retry mechanics inside Redis queues",
      "Created a robust, completely reusable JSON-defined workflow execution engine"
    ],
    outcomeImpact: [
      "Shortened overall approval turnaround cycles, completely eliminating manual operational bottlenecks",
      "Drastically heightened enterprise visibility and tracing across all execution stages"
    ],
    themeColor: "emerald"
  }
];

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: "TSM Digital Solutions",
    role: "AI Implementation Consultant",
    period: "May 2024 – Apr 2026",
    bullets: [
      "Led the design and delivery of a Personalization and Recommendation Engine for an online marketplace client, using user behavior, product metadata, and purchase history to generate ranked product suggestions across homepage, category, and email surfaces.",
      "Built feature extraction, candidate generation, and recommendation APIs that integrated cleanly with the client platform, enabling faster merchandising decisions and more relevant user experiences.",
      "Optimized the retrieval and serving workflow with caching, async jobs, and model orchestration, reducing recommendation latency and supporting near-real-time updates from new browsing events.",
      "Collaborated with product, data, and client stakeholders to validate recommendation rules, monitor adoption, and iterate on conversion-focused improvements."
    ],
    stack: ["Python", "FastAPI", "TensorFlow", "LangChain", "PostgreSQL", "Redis", "React", "Docker", "AWS"]
  },
  {
    company: "illusys Nigeria Limited",
    role: "AI Integration Engineer",
    period: "Jan 2019 – Apr 2024",
    bullets: [
      "Designed, developed, deployed, and maintained an AI Customer Support Resolution Platform for a supermarket client, automating ticket triage, intent detection, knowledge retrieval, and response drafting.",
      "Integrated support channels, internal knowledge bases, and human-in-the-loop escalation flows to improve first-response handling and keep complex issues visible to agents.",
      "Implemented secure APIs, queue-based background workers, audit logs, and resolution tracking to support reliable operations, traceability, and scalable daily support volume."
    ],
    stack: ["Python", "FastAPI", "LangChain", "PostgreSQL", "Redis", "Node.js", "Docker", "Nginx", "AWS"]
  },
  {
    company: "Learntor Limited",
    role: "Fullstack Developer",
    period: "Oct 2016 – Dec 2019",
    bullets: [
      "Designed, developed, deployed, and managed a Learning Management System (LMS) for a secondary school client, covering course delivery, student enrollment, assessments, lesson content, and staff administration.",
      "Improved usability and reliability with role-based dashboards for administrators, teachers, students, and parents, plus responsive interfaces for day-to-day academic operations.",
      "Implemented modular frontend and backend architecture, authentication, permissions, notifications, and reporting workflows to support maintainable growth and secure school data handling."
    ],
    stack: ["React", "Next.js", "FastAPI", "PostgreSQL", "Redis", "Docker", "REST APIs"]
  },
  {
    company: "Hotels.ng Limited",
    role: "Backend Developer",
    period: "Sept 2014 – Aug 2016",
    bullets: [
      "Built, deployed, and managed an Online Ecommerce Store for a retail store client, supporting product catalog management, cart and checkout flows, order processing, and customer account functionality.",
      "Improved backend reliability and performance through clean API design, data modeling, caching, and structured error handling for a smoother buying experience.",
      "Implemented secure authentication, inventory-aware workflows, and admin operations tooling to keep transactions accurate and day-to-day store operations efficient."
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "Node.js", "Docker", "Nginx", "REST APIs"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "HTML5", "CSS3"]
  },
  {
    category: "Backend Frameworks & Runtimes",
    skills: ["FastAPI", "Node.js", "Express", "SQLAlchemy", "RESTful APIs", "gRPC"]
  },
  {
    category: "Frontend UI",
    skills: ["React", "Next.js", "Tailwind CSS", "Motion/Framer", "HTML/CSS Animations"]
  },
  {
    category: "Databases & Caching",
    skills: ["PostgreSQL", "Redis (Queues & Caching)", "Vector Databases", "SQLite"]
  },
  {
    category: "AI, Machine Learning & LLMs",
    skills: ["LangChain", "TensorFlow", "Semantic Document Search", "RAG Pipelines", "Model Serving & Orchestration"]
  },
  {
    category: "DevOps & Cloud Infrastructure",
    skills: ["Docker", "GitHub Actions", "Nginx", "AWS (EC2, S3, RDS)", "Google Cloud (GCP)", "Microsoft Azure", "Linux Systems", "Production Reliability"]
  }
];

export const EDUCATION_EDUCATION: EducationCertification[] = [
  {
    title: "Bachelor of Arts, Business Administration",
    institution: "University of Jos, Nigeria",
    date: "Aug 2012",
    major: "Accounting"
  },
  {
    title: "Professional Diploma in Digital Marketing (PDDM)",
    institution: "Digital Marketing Institute, Dublin, Ireland",
    date: "Nov 2016"
  },
  {
    title: "Microsoft Professional Program in Data Science",
    institution: "21 CSKILLS AFRICA",
    date: "Dec 2019"
  },
  {
    title: "Professional Scrum Master (PSM I)",
    institution: "SCRUM.ORG",
    date: "June 2022"
  }
];
