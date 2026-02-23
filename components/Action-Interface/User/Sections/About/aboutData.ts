import { Award, Code, Globe, MapPin, Target, Users } from 'lucide-react';
import { FaBullhorn, FaChess, FaClock, FaFolderOpen, FaLaptopHouse } from 'react-icons/fa';
import { HiSwatch } from "react-icons/hi2";


export interface AboutData {
  title: {
    en: string;
    ar: string;
  };
  subtitle: {
    en: string;
    ar: string;
  };
  description: {
    en: string[];
    ar: string[];
  };
  stats: {
    icon: React.ComponentType<{ className?: string }>;
    value: string;
    label: {
      en: string;
      ar: string;
    };
    color: string;
    bg: string;
  }[];
  traits: {
    en: string[];
    ar: string[];
  };
  cards: {
    icon: React.ComponentType<{ className?: string }>;
    title: {
      en: string;
      ar: string;
    };
    content: {
      en: string;
      ar: string;
    };
    subContent?: {
      en: string;
      ar: string;
    };
    technologies?: string[];
    gradient: string;
    iconGradient: string;
    span?: 'col-span-1' | 'col-span-2';
  }[];
}

export const aboutData: AboutData = {
  title: {
    en: "I'm Hassan Gameil Fullstack Software Engineer",
    ar: "أنا حسن جميل Fullstack Software Engineer"
  },
  subtitle: {
    en: "I work to provide business solutions, improve companies’ digital performance, and transform ideas into reality through code, design, innovation, and data analysis",
    ar: "أعمل على تقديم حلول الأعمال وتحسين الأداء الرقمي للشركات’ وتحويل الأفكار إلى واقع من خلال التعليمات البرمجية والتصميم والابتكار وتحليل البيانات"
  },
  description: {
    en: [
    "I help businesses turn ideas into efficient, user-friendly solutions. By combining design, functionality, and the latest technologies, I deliver products that create real value and drive results.",
    "Success comes from understanding your resources and using them strategically. Every tool, process, and feature plays a role in achieving project goals and fostering innovation."
  ],
  ar: [
    "أساعد الشركات على تحويل الأفكار إلى حلول فعّالة وسهلة الاستخدام. من خلال دمج التصميم مع الوظائف وأحدث التقنيات، أقدّم منتجات تضيف قيمة حقيقية وتحقق النتائج.",
    "النجاح يأتي من فهم مواردك واستخدامها بشكل استراتيجي. لكل أداة وعملية وميزة دور مهم في تحقيق أهداف المشروع وتعزيز الابتكار."
  ]
  },
  stats: [
  {
    icon: Award,
    value: "3+",
    label: { en: "Years Experience", ar: "سنوات خبرة" },
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20"
  },
  {
    icon: HiSwatch,
    value: "10+",
    label: { en: "Projects Completed", ar: "مشروع مكتمل" },
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20"
  },
  {
    icon: FaLaptopHouse,
    value: "",
    label: { en: "Remote Collaboration", ar: "تعاون عن بعد" },
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-900/20"
  },
  {
    icon: FaBullhorn,
    value: "",
    label: { en: "Marketing & Business Solutions", ar: "التسويق وحلول البزنس" },
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/20"
  }
],

  traits: {
    en: ["Problem Solver", "Team Player", "Quick Learner", "Detail Oriented"],
    ar: ["حل المشاكل", "لاعب فريق", "يتعلم بسرعة", "منتبه للتفاصيل"]
  },
  cards: [
    {
      icon: MapPin,
      title: { en: "Location", ar: "الموقع" },
      content: { en: "Based in Egypt", ar: "مقيم في مصر" },
      subContent: { en: "Open to remote work", ar: "متاح للعمل عن بعد" },
      gradient: "from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20",
      iconGradient: "from-blue-600 to-purple-600",
      span: "col-span-1"
    },
    {
      icon: Code,
      title: { en: "Expertise", ar: "الخبرة" },
      content: { en: "Full Stack", ar: "تطوير شامل" },
      subContent: { en: "Frontend & Backend", ar: "واجهة أمامية وخلفية" },
      gradient: "from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20",
      iconGradient: "from-green-600 to-teal-600",
      span: "col-span-1"
    },
    {
      icon: Target,
      title: { en: "Current Focus", ar: "التركيز الحالي" },
      content: { en: "Building scalable applications with modern technologies", ar: "بناء تطبيقات قابلة للتطوير باستخدام تقنيات حديثة" },
      technologies: ["React", "Next.js", "React Native", "Node.js", "TypeScript" , "Redis-Cashing", "LLM"],
      gradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      iconGradient: "from-purple-600 to-pink-600",
      span: "col-span-2"
    }
  ]
};
