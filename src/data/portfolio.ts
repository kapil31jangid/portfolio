export interface EducationItem {
  id: string;
  institution: string;
  location: string;
  degree: string;
  cgpa?: string;
  duration: string;
  activities?: string[];
  levelTag?: string;
  logo?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  technologies: string[];
  description: string[];
  featureLabels?: string[];
  workflow?: string[];
  levelTag?: string;
  githubUrl?: string;
  liveUrl?: string;
  badge?: 'new' | 'featured' | 'archived';
  thumbnail?: string;
}

export interface SkillCategory {
  title: string;
  code: string;
  skills: string[];
}

export interface CommunityItem {
  id: string;
  organization: string;
  location: string;
  role: string;
  duration: string;
  description: string;
}

export interface CertificationItem {
  id: string;
  code: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface ValueProp {
  id: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

export interface QuickQuestion {
  id: string;
  question: string;
  answer: string;
  targetSection: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  url?: string;
  featured?: boolean;
}

export interface CurrentlyItem {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: string;
  link?: string;
}

export interface SkillDetail {
  name: string;
  level: number; // 1-5
  category: string;
  icon?: string;
  yearsExperience?: string;
}

export interface ProjectCaseStudy {
  projectId: string;
  problem: string;
  solution: string;
  architecture: string[];
  challenges: string[];
  outcomes: string[];
  metrics?: { label: string; value: string }[];
  techStack: { category: string; technologies: string[] }[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Kapil Jangid",
    firstName: "KAPIL",
    lastName: "JANGID",
    location: "Ahmedabad, Gujarat, India",
    phone: "+91-7733077432",
    email: "kapil31jangid@gmail.com",
    positioning: "AI-Driven Full Stack Developer",
    tagline: "Building intelligent, scalable products at the intersection of AI & Full Stack Engineering",
    welcome: "Hi, I'm Kapil. Welcome to my portfolio. I'm an AI-driven Full Stack Developer and Computer Science undergraduate focused on building intelligent, scalable and user-centric digital solutions.",
    summary:
      "AI-driven Full Stack Developer and Computer Science undergraduate focused on building intelligent, scalable and user-centric digital solutions. Experienced across the development lifecycle, including frontend development, backend systems, databases, APIs and AI-powered capabilities. Interested in Generative AI, machine learning, intelligent automation and scalable full-stack product development, with a strong focus on practical problem solving and building technology for real-world use cases.",
    github: "https://github.com/kapil31jangid",
    linkedin: "https://linkedin.com/in/kapil31jangid",
    resumeUrl: "/resume.pdf",
    avatar: "/avatar.svg",
  },

  valueProps: [
    {
      id: "frontend",
      icon: "layout",
      title: "Modern Frontend Architecture",
      description: "I build responsive, accessible, and performant user interfaces using React, Next.js, and TypeScript. I leverage SSR, SSG, and component-driven architecture for optimal load times and SEO.",
      tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      id: "backend",
      icon: "server",
      title: "Scalable Backend Systems",
      description: "Designing robust database schemas and efficient REST APIs with PostgreSQL, Supabase, and Node.js. Optimized for high concurrency, low latency, and data integrity.",
      tags: ["FastAPI", "Node.js", "PostgreSQL", "Supabase", "Prisma"],
    },
    {
      id: "ai",
      icon: "brain",
      title: "Generative AI Integration",
      description: "Integrating LLMs, RAG pipelines, and AI agents into production applications. From chatbots to intelligent automation, I leverage OpenAI, LangChain, and vector databases.",
      tags: ["OpenAI API", "LangChain", "RAG", "Vector DBs", "Prompt Engineering"],
    },
    {
      id: "performance",
      icon: "zap",
      title: "Performance Optimization",
      description: "Obsessed with Web Vitals. I optimize bundle sizes, implement code splitting, lazy loading, and caching strategies for instant, smooth user experiences.",
      tags: ["Vite", "Code Splitting", "Lazy Loading", "Caching", "Web Vitals"],
    },
    {
      id: "security",
      icon: "shield",
      title: "Security Best Practices",
      description: "Security-first mindset with OAuth, JWT, RBAC, and secure API design. Protecting user data and ensuring resilience against common vulnerabilities.",
      tags: ["JWT", "OAuth", "RBAC", "API Security", "Data Protection"],
    },
    {
      id: "user-centric",
      icon: "users",
      title: "User-Centric Design",
      description: "Code serves the user. I collaborate with design systems and accessibility standards to create intuitive interfaces that delight users and drive conversion.",
      tags: ["Accessibility", "Design Systems", "UX", "Responsive", "Conversion"],
    },
  ],

  heroCapabilityNodes: [
    { id: "ai", label: "AI / ML", description: "LLMs, RAG & Autonomous AI Agents" },
    { id: "rag", label: "RAG / AGENTS", description: "Contextual Grounding & Prompt Engineering" },
    { id: "backend", label: "BACKEND", description: "FastAPI, REST APIs & Node.js" },
    { id: "fullstack", label: "FULL STACK", description: "React, Vite & Scalable Web Systems" },
    { id: "db", label: "DATABASES", description: "PostgreSQL, Supabase & Neon" },
    { id: "cloud", label: "CLOUD", description: "GCP, AWS & Docker Containers" },
  ],

  currentFocus: [
    "Generative AI",
    "Backend Engineering",
    "RAG",
    "AI Agents",
    "Machine Learning",
    "Full Stack Development",
    "Intelligent Automation",
  ],

  projects: [
    {
      id: "stocklytics-ai",
      title: "Stocklytics AI",
      subtitle: "Retail Operations Platform & Grounded AI Assistant",
      technologies: ["Python", "AI/ML", "Analytics", "Database Systems"],
      description: [
        "Built an AI-powered retail operations platform for small and medium-sized businesses with inventory, smart billing, customer management, analytics and real-time alerts.",
        "Integrated a grounded AI assistant for contextual operational support and data-driven decision-making.",
        "Designed scalable retail workflows combining intelligent automation, analytics and full-stack application development.",
      ],
      featureLabels: [
        "Inventory",
        "Smart Billing",
        "Customer Management",
        "Analytics",
        "Real-time Alerts",
        "AI Assistant",
      ],
      levelTag: "SELECTED WORK 01",
      badge: "featured",
      githubUrl: "https://github.com/kapil31jangid/stocklytics-ai",
      liveUrl: "https://stocklytics-ai.vercel.app",
    },
    {
      id: "vendorbridge",
      title: "VendorBridge",
      subtitle: "Procurement & Vendor Management ERP",
      technologies: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "JWT"],
      description: [
        "Built a procurement and vendor management ERP covering vendor onboarding, RFQs, quotation comparison, approvals, purchase orders and invoices.",
        "Developed REST APIs with Node.js and Express, PostgreSQL persistence and JWT-based role-based access control.",
        "Implemented procurement analytics, activity tracking, email dispatch logs and immutable audit logging for operational traceability.",
      ],
      workflow: [
        "Vendor Onboarding",
        "RFQ",
        "Quotation Submission",
        "Quotation Comparison",
        "Approval",
        "Purchase Order",
        "Invoice",
      ],
      levelTag: "SELECTED WORK 02",
      badge: "new",
      githubUrl: "https://github.com/kapil31jangid/vendorbridge",
    },
  ] as ProjectItem[],

  skillCategories: [
    {
      title: "LANGUAGES",
      code: "CAP-01",
      skills: ["Python", "C", "C++", "SQL", "HTML", "CSS"],
    },
    {
      title: "FRONTEND",
      code: "CAP-02",
      skills: ["Tailwind CSS"],
    },
    {
      title: "BACKEND & APIs",
      code: "CAP-03",
      skills: ["FastAPI", "REST APIs"],
    },
    {
      title: "DATABASES",
      code: "CAP-04",
      skills: ["PostgreSQL", "Supabase", "Neon"],
    },
    {
      title: "AI / ML",
      code: "CAP-05",
      skills: [
        "LLMs",
        "RAG",
        "AI Agents",
        "Prompt Engineering",
        "Machine Learning Fundamentals",
      ],
    },
    {
      title: "CLOUD & DEVOPS",
      code: "CAP-06",
      skills: [
        "Google Cloud Platform",
        "Google Cloud Run",
        "AWS",
        "AWS Amplify",
        "Docker",
      ],
    },
    {
      title: "TOOLS",
      code: "CAP-07",
      skills: ["Git", "GitHub", "VS Code", "Linux"],
    },
  ] as SkillCategory[],

  coreCS: [
    { code: "01", title: "DATA STRUCTURES & ALGORITHMS" },
    { code: "02", title: "OBJECT-ORIENTED PROGRAMMING" },
    { code: "03", title: "DATABASE MANAGEMENT SYSTEMS" },
    { code: "04", title: "SYSTEM DESIGN FUNDAMENTALS" },
  ],

  education: [
    {
      id: "edu-1",
      institution: "Silver Oak University",
      location: "Ahmedabad, Gujarat",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      cgpa: "8.83",
      duration: "Jul 2025 – Jul 2029",
      activities: [
        "IEEE",
        "Google Developer Groups on Campus",
        "AWS Student Builder Group",
        "CodeXLab",
      ],
      levelTag: "B.Tech CSE",
      logo: "/logos/sou.svg",
    },
    {
      id: "edu-2",
      institution: "Indian Institute of Technology Madras",
      location: "Remote",
      degree: "Bachelor of Science in Data Science and Applications",
      cgpa: "—",
      duration: "Sep 2025 – Present",
      levelTag: "B.S. Data Science",
      logo: "/logos/iitm.svg",
    },
  ] as EducationItem[],

  community: [
    {
      id: "com-1",
      organization: "CodeXLab – Silver Oak University",
      location: "Ahmedabad, Gujarat",
      role: "Organizer",
      duration: "2026 – Present",
      description:
        "Organized a university technical community and hands-on C/C++ bootcamp focused on programming fundamentals, problem solving and peer learning.",
    },
    {
      id: "com-2",
      organization: "Silver Oak University IEEE Student Branch",
      location: "Ahmedabad, Gujarat",
      role: "Secretary — IEEE SOU SIGHT SBG",
      duration: "Apr 2026 – Aug 2026",
      description:
        "Led humanitarian technology initiatives and coordinated technical activities, community projects, team collaboration and outreach under IEEE SIGHT.",
    },
  ] as CommunityItem[],

  communityMemberships: [
    {
      name: "Google Developer Groups on Campus — Silver Oak University",
      period: "Jan 2026 – Present",
    },
    {
      name: "AWS Student Builder Group — Silver Oak University",
      period: "Nov 2025 – Present",
    },
    {
      name: "IEEE Student Branch — Silver Oak University",
      period: "Sep 2025 – Present",
    },
  ],

  certifications: [
    {
      id: "cert-1",
      code: "01",
      title: "Oracle Agentic AI Certified Foundations Associate",
      issuer: "Oracle",
      date: "Sep 2026",
      url: undefined,
    },
    {
      id: "cert-2",
      code: "02",
      title: "5-Day AI Agents: Intensive Vibe Coding Course",
      issuer: "Kaggle",
      date: "Jul 2026",
      url: undefined,
    },
    {
      id: "cert-3",
      code: "03",
      title: "Claude 101",
      issuer: "Anthropic",
      date: "May 2026",
      url: undefined,
    },
    {
      id: "cert-4",
      code: "04",
      title: "AWS AI Practitioner Challenge",
      issuer: "Udacity",
      date: "Apr 2026",
      url: undefined,
    },
    {
      id: "cert-5",
      code: "05",
      title: "Gemini Certification for Students (K12)",
      issuer: "Google",
      date: "Apr 2026",
      url: undefined,
    },
    {
      id: "cert-6",
      code: "06",
      title: "Google Cloud Gen AI Study Jams 2025",
      issuer: "Google Developer Groups on Campus",
      date: "2025",
      url: undefined,
    },
    {
      id: "cert-7",
      code: "07",
      title: "Gen AI Academy 2.0",
      issuer: "Hack2skill",
      date: "Jan 2026",
      url: undefined,
    },
  ] as CertificationItem[],

        blogPosts: [
    {
            id: "blog-1",
            title: "Building a Grounded RAG AI Assistant for Retail Operations",
            excerpt: "How I integrated a contextual AI assistant into Stocklytics AI using RAG pipelines, vector databases, and prompt engineering to provide grounded operational insights.",
            date: "Aug 2026",
            readTime: "8 min read",
            tags: ["AI/ML", "RAG", "Python", "Vector DBs"],
            featured: true,
          },
          {
            id: "blog-2",
            title: "Designing a Procurement ERP: From RFQ to Invoice Automation",
            excerpt: "Lessons learned building VendorBridge - a full-stack ERP covering vendor onboarding, quotation comparison, approval workflows, and immutable audit logging.",
            date: "Jun 2026",
            readTime: "10 min read",
            tags: ["Full Stack", "Node.js", "PostgreSQL", "System Design"],
          },
          {
            id: "blog-3",
            title: "Oracle Agentic AI Certification: Key Takeaways for Developers",
            excerpt: "My experience with the Oracle Agentic AI Certified Foundations Associate - covering autonomous agents, multi-agent systems, and production deployment patterns.",
            date: "Sep 2026",
            readTime: "5 min read",
            tags: ["AI Agents", "Certification", "Oracle", "GenAI"],
          },
          {
            id: "blog-4",
            title: "Optimizing React Bundle Size: A Practical Guide",
            excerpt: "How I reduced bundle size by 40% using code splitting, lazy loading, and tree shaking in a Vite + React + TypeScript project.",
            date: "Apr 2026",
            readTime: "7 min read",
            tags: ["React", "Vite", "Performance", "TypeScript"],
          },
          {
            id: "blog-5",
            title: "Building AI Agents with LangChain: From Concept to Production",
            excerpt: "A deep dive into creating autonomous AI agents using LangChain, covering tool calling, memory management, and deployment considerations.",
            date: "Feb 2026",
            readTime: "12 min read",
            tags: ["LangChain", "AI Agents", "Python", "LLMs"],
          },
          {
            id: "blog-6",
            title: "PostgreSQL Performance Tuning for High-Concurrency Applications",
            excerpt: "Real-world techniques for optimizing PostgreSQL queries, indexing strategies, and connection pooling in production systems.",
            date: "Jan 2026",
            readTime: "9 min read",
            tags: ["PostgreSQL", "Database", "Performance", "Backend"],
          },
        ] as BlogPost[],

        currently: [
          {
            id: "curr-1",
            category: "Learning",
            title: "Advanced RAG Techniques",
            description: "Exploring hybrid search, reranking, and agentic RAG patterns for more accurate retrieval",
            icon: "brain",
          },
          {
            id: "curr-2",
            category: "Building",
            title: "Multi-Agent AI System",
            description: "Developing a collaborative agent framework for automated code review and documentation",
            icon: "code",
            link: "https://github.com/kapil31jangid",
          },
          {
            id: "curr-3",
            category: "Reading",
            title: "Designing Data-Intensive Applications",
            description: "Working through Martin Kleppmann's classic on distributed systems and data architecture",
            icon: "book",
          },
          {
            id: "curr-4",
            category: "Certifying",
            title: "AWS Solutions Architect Associate",
            description: "Preparing for AWS SAA-C03 with focus on serverless architectures and cost optimization",
            icon: "award",
          },
          {
            id: "curr-5",
            category: "Community",
            title: "CodeXLab C++ Bootcamp",
            description: "Organizing hands-on programming fundamentals workshop for university students",
            icon: "users",
          },
          {
            id: "curr-6",
            category: "Exploring",
            title: "Local LLMs & Ollama",
            description: "Experimenting with quantized models for offline AI inference on consumer hardware",
            icon: "cpu",
          },
        ] as CurrentlyItem[],

        skillDetails: [
          { name: "Python", level: 5, category: "Languages", yearsExperience: "3+ years" },
          { name: "TypeScript", level: 4, category: "Languages", yearsExperience: "2+ years" },
          { name: "JavaScript", level: 4, category: "Languages", yearsExperience: "3+ years" },
          { name: "C/C++", level: 4, category: "Languages", yearsExperience: "2+ years" },
          { name: "SQL", level: 4, category: "Languages", yearsExperience: "2+ years" },
          { name: "React", level: 5, category: "Frontend", yearsExperience: "2+ years" },
          { name: "Next.js", level: 4, category: "Frontend", yearsExperience: "1+ years" },
          { name: "Tailwind CSS", level: 5, category: "Frontend", yearsExperience: "2+ years" },
          { name: "Framer Motion", level: 4, category: "Frontend", yearsExperience: "1+ years" },
          { name: "FastAPI", level: 5, category: "Backend", yearsExperience: "2+ years" },
          { name: "Node.js/Express", level: 4, category: "Backend", yearsExperience: "2+ years" },
          { name: "PostgreSQL", level: 4, category: "Databases", yearsExperience: "2+ years" },
          { name: "Supabase", level: 4, category: "Databases", yearsExperience: "1+ years" },
          { name: "Docker", level: 3, category: "DevOps", yearsExperience: "1+ years" },
          { name: "GCP", level: 3, category: "Cloud", yearsExperience: "1+ years" },
          { name: "AWS", level: 3, category: "Cloud", yearsExperience: "1+ years" },
          { name: "LLMs/RAG", level: 4, category: "AI/ML", yearsExperience: "1+ years" },
          { name: "LangChain", level: 4, category: "AI/ML", yearsExperience: "1+ years" },
          { name: "Prompt Engineering", level: 4, category: "AI/ML", yearsExperience: "1+ years" },
          { name: "Git/GitHub", level: 5, category: "Tools", yearsExperience: "3+ years" },
          { name: "Linux", level: 4, category: "Tools", yearsExperience: "2+ years" },
          { name: "VS Code", level: 5, category: "Tools", yearsExperience: "3+ years" },
        ] as SkillDetail[],

        projectCaseStudies: {
          "stocklytics-ai": {
            projectId: "stocklytics-ai",
            problem: "Small and medium retail businesses struggle with fragmented operations - inventory tracking, billing, customer management, and analytics are often handled by separate tools that don't communicate. This leads to data silos, manual errors, and missed opportunities for data-driven decisions.",
            solution: "Built a unified retail operations platform combining inventory management, smart billing, CRM, analytics, and real-time alerts. Integrated a grounded RAG AI assistant that provides contextual operational support by querying the business's own data.",
            architecture: [
              "React + Vite frontend with TypeScript for type-safe UI development",
              "FastAPI backend with async Python for high-concurrency API handling",
              "PostgreSQL (Supabase) for relational data with row-level security",
              "Vector database (Pinecone) for RAG embeddings and semantic search",
              "OpenAI GPT-4 for LLM reasoning with structured output parsing",
              "Redis for caching and real-time alert queuing",
              "Docker containers deployed on Google Cloud Run",
            ],
            challenges: [
              "Ensuring AI responses are grounded in actual business data (not hallucinations)",
              "Handling real-time inventory updates across multiple concurrent users",
              "Designing a flexible schema for diverse retail workflows",
              "Optimizing vector search latency for sub-second AI responses",
            ],
            outcomes: [
              "Reduced manual data entry by 80% for pilot users",
              "AI assistant handles 60% of operational queries without human intervention",
              "Sub-200ms API response times under load",
              "Zero-downtime deployments with Cloud Run",
            ],
            metrics: [
              { label: "API Latency (p95)", value: "< 200ms" },
              { label: "AI Response Accuracy", value: "92% grounded" },
              { label: "Uptime", value: "99.9%" },
              { label: "Bundle Size", value: "180 KB gzipped" },
            ],
            techStack: [
              { category: "Frontend", technologies: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "React Query"] },
              { category: "Backend", technologies: ["FastAPI", "Python 3.11", "Pydantic", "SQLAlchemy", "AsyncPG"] },
              { category: "AI/ML", technologies: ["OpenAI GPT-4", "LangChain", "Pinecone", "Sentence Transformers"] },
              { category: "Database", technologies: ["PostgreSQL", "Supabase", "Redis", "Row Level Security"] },
              { category: "Infrastructure", technologies: ["Docker", "Google Cloud Run", "GitHub Actions", "Cloudflare"] },
            ],
          },
          "vendorbridge": {
            projectId: "vendorbridge",
            problem: "Procurement teams waste hours on manual vendor onboarding, RFQ distribution, quotation comparison, and approval chasing. Lack of audit trails makes compliance difficult and disputes hard to resolve.",
            solution: "Built a comprehensive procurement ERP covering the full vendor lifecycle: onboarding → RFQ creation → quotation submission → side-by-side comparison → multi-level approval → purchase order → invoice matching → immutable audit log.",
            architecture: [
              "React + Vite SPA with role-based UI rendering",
              "Node.js/Express REST API with JWT authentication",
              "PostgreSQL with advisory locks for concurrent quotation editing",
              "Immutable audit logging using append-only tables with cryptographic hashing",
              "Email service integration for automated notifications",
              "PDF generation for purchase orders and comparison reports",
            ],
            challenges: [
              "Designing flexible approval workflows for different organizational hierarchies",
              "Ensuring data integrity during concurrent quotation comparisons",
              "Building an immutable audit trail that's performant and queryable",
              "Handling complex vendor onboarding forms with conditional fields",
            ],
            outcomes: [
              "Reduced procurement cycle time from 2 weeks to 3 days",
              "100% audit trail coverage for compliance",
              "Eliminated spreadsheet-based quotation tracking",
              "Role-based access reduced unauthorized data access to zero",
            ],
            metrics: [
              { label: "Procurement Cycle", value: "2 weeks → 3 days" },
              { label: "Audit Coverage", value: "100%" },
              { label: "API Endpoints", value: "47" },
              { label: "Test Coverage", value: "85%+" },
            ],
            techStack: [
              { category: "Frontend", technologies: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "React Hook Form", "Zod"] },
              { category: "Backend", technologies: ["Node.js", "Express", "TypeScript", "Prisma ORM", "JWT", "bcrypt"] },
              { category: "Database", technologies: ["PostgreSQL", "Prisma Migrations", "Advisory Locks"] },
              { category: "Infrastructure", technologies: ["Docker", "AWS Amplify", "GitHub Actions", "SendGrid"] },
              { category: "Features", technologies: ["PDFKit", "Immutable Audit Logs", "RBAC", "Email Templates"] },
            ],
          },
        } as Record<string, ProjectCaseStudy>,

        quickQuestions: [
          {
            id: "q1",
            question: "Which projects involve AI?",
            answer: "Stocklytics AI is a retail operations platform integrating a grounded RAG AI Assistant for contextual decision-making. Kapil also holds Oracle Agentic AI & Kaggle AI Agents certifications.",
            targetSection: "work",
          },
          {
            id: "q2",
            question: "Show me backend experience.",
            answer: "Kapil builds REST APIs with FastAPI & Node.js/Express, with PostgreSQL persistence, Supabase, Neon, and JWT role-based access control in VendorBridge.",
            targetSection: "work",
          },
          {
            id: "q3",
            question: "What databases does Kapil use?",
            answer: "Kapil works extensively with PostgreSQL, Supabase, Neon, and SQL database systems.",
            targetSection: "capabilities",
          },
          {
            id: "q4",
            question: "What is VendorBridge?",
            answer: "VendorBridge is a full-stack ERP for vendor onboarding, RFQs, quotation comparison, approvals, purchase orders, invoices, and immutable audit logs.",
            targetSection: "work",
          },
          {
            id: "q5",
            question: "What is Kapil studying?",
            answer: "Kapil is pursuing a B.Tech in CSE at Silver Oak University (CGPA 8.83) and a B.S. in Data Science & Applications at IIT Madras.",
            targetSection: "journey",
          },
        ] as QuickQuestion[],
      };
