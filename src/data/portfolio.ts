export interface EducationItem {
  id: string;
  institution: string;
  location: string;
  degree: string;
  cgpa?: string;
  duration: string;
  activities?: string[];
  levelTag?: string;
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

export interface QuickQuestion {
  id: string;
  question: string;
  answer: string;
  targetSection: string;
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
    summary:
      "AI-driven Full Stack Developer and Computer Science undergraduate focused on building intelligent, scalable and user-centric digital solutions. Experienced across the development lifecycle, including frontend development, backend systems, databases, APIs and AI-powered capabilities. Interested in Generative AI, machine learning, intelligent automation and scalable full-stack product development, with a strong focus on practical problem solving and building technology for real-world use cases.",
    github: "https://github.com/kapil31jangid",
    linkedin: "https://linkedin.com/in/kapil31jangid",
    resumeUrl: "/resume.pdf",
  },

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
    },
    {
      id: "edu-2",
      institution: "Indian Institute of Technology Madras",
      location: "Remote",
      degree: "Bachelor of Science in Data Science and Applications",
      duration: "Sep 2025 – Present",
      levelTag: "B.S. Data Science",
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
