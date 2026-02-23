import {
  Monitor,
  Server,
  Database,
  Cloud,
  Palette,
  Settings,
  Cpu,
} from "lucide-react";

export type SkillItem = {
  name: string;
  level: number;
  description: string;
};

export type Skills = {
  
  titleEn: string;
  titleAr: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  skills: SkillItem[];
};

export type SkillsData = Record<string, Skills>;

export const skillsData: SkillsData = {
  frontend: {
    titleEn: "Frontend Development",
    titleAr: "تطوير واجهات المستخدم",
    icon: Monitor,
    color: "from-blue-500 via-purple-500 to-cyan-500",
    bgColor:
      "from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20",
    skills: [
      {
        name: "React",
        level: 80,
        description: "Hooks, context, performance optimization",
      },
      {
        name: "Next.js",
        level: 80,
        description: "SSR, SSG, ISR, App Router",
      },
      {
        name: "TypeScript",
        level: 75,
        description: "Strong typing, generics, scalable patterns",
      },
      {
        name: "Tailwind CSS",
        level: 92,
        description: "Utility-first styling & design systems",
      },
      {
        name: "Responsive Design",
        level: 90,
        description: "Mobile-first & adaptive layouts",
      },
    ],
  },

  stateManagement: {
    titleEn: "State Management",
    titleAr: "إدارة الحالة",
    icon: Settings,
    color: "from-orange-500 via-red-500 to-pink-500",
    bgColor:
      "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
    skills: [
      {
        name: "Redux Toolkit",
        level: 80,
        description: "Predictable & scalable state management",
      },
      {
        name: "Zustand",
        level: 80,
        description: "Minimal, fast global state",
      },
      {
        name: "Context API",
        level: 70,
        description: "Built-in React state sharing",
      },
    ],
  },

  backend: {
    titleEn: "Backend Development",
    titleAr: "تطوير الخلفية",
    icon: Server,
    color: "from-green-500 via-emerald-500 to-teal-500",
    bgColor:
      "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
    skills: [
      {
        name: "Node.js",
        level: 70,
        description: "Server-side JavaScript runtime",
      },
      {
        name: "Express.js",
        level: 66,
        description: "REST APIs & middleware",
      },
      {
        name: "FastAPI",
        level: 80,
        description: "High-performance Python APIs",
      },
      {
        name: "REST APIs",
        level: 80,
        description: "Designing scalable endpoints",
      },
      {
        name: "GraphQL",
        level: 50,
        description: "Flexible data querying",
      },
    ],
  },

  database: {
    titleEn: "Database Systems",
    titleAr: "قواعد البيانات",
    icon: Database,
    color: "from-purple-500 via-pink-500 to-rose-500",
    bgColor:
      "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
    skills: [
      {
        name: "MongoDB",
        level: 70,
        description: "NoSQL document database",
      },
      {
        name: "PostgreSQL",
        level: 70,
        description: "Relational & advanced SQL",
      },
      {
        name: "Redis",
        level: 70,
        description: "In-memory caching & queues",
      },
      {
        name: "Supabase",
        level: 73,
        description: "Open-source Firebase alternative",
      },
      {
        name: "Firebase",
        level: 63,
        description: "Realtime DB & auth",
      },
    ],
  },

  cloud: {
    titleEn: "Cloud & DevOps",
    titleAr: "السحابة و DevOps",
    icon: Cloud,
    color: "from-amber-500 via-orange-500 to-red-500",
    bgColor:
      "from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
    skills: [
      {
        name: "AWS",
        level: 75,
        description: "EC2, S3, Lambda, RDS",
      },
      {
        name: "Docker",
        level: 68,
        description: "Containerization & images",
      },
      {
        name: "CI/CD",
        level: 80,
        description: "GitHub Actions, pipelines",
      },
      {
        name: "Vercel",
        level: 90,
        description: "Frontend deployment platform",
      },
      {
        name: "Cloudflare",
        level: 87,
        description: "CDN, DNS & edge functions",
      },
    ],
  },

  design: {
    titleEn: "UI / UX & SEO",
    titleAr: "واجهة المستخدم والتجربة",
    icon: Palette,
    color: "from-fuchsia-500 via-purple-500 to-indigo-500",
    bgColor:
      "from-fuchsia-50 to-purple-50 dark:from-fuchsia-900/20 dark:to-purple-900/20",
    skills: [
      {
        name: "Figma",
        level: 75,
        description: "Design & prototyping",
      },
      {
        name: "UI/UX Principles",
        level: 85,
        description: "User-centered design",
      },
      {
        name: "SEO",
        level: 80,
        description: "Search engine optimization",
      },
      {
        name: "i18n",
        level: 82,
        description: "Multi-language support",
      },
    ],
  },

  ai: {
    titleEn: "AI Tools",
    titleAr: "أدوات الذكاء الاصطناعي",
    icon: Cpu,
    color: "from-emerald-500 via-teal-500 to-cyan-500",
    bgColor:
      "from-emerald-500 via-teal-500 to-cyan-500",
    skills: [
      {
        name: "GitHub Copilot",
        level: 90,
        description: "AI pair programming",
      },
      {
        name: "Cursor",
        level: 83,
        description: "AI-powered editor",
      },
      {
        name: "ChatGPT / DeepSeek",
        level: 82,
        description: "LLM-assisted development",
      },
    ],
  },
};
