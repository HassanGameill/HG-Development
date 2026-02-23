// components/projects/projectsData.ts

import image1 from "@/public/images/mqrkup-project.png";
import image2 from "@/public/images/p-1.png";
import image3 from "@/public/images/p-2.png";
import image4 from "@/public/images/Food-Testing.png";
import image5 from "@/public/images/Movie-Night.png";
import image6 from "@/public/images/graduation.png";

import { Project } from "./projectType";

export const projects: Project[] = [
  {
    id: "markup",
    title: {
      en: "Markup Agency Website",
      ar: "موقع وكالة مارك أب",
    },
    description: {
      en: "A full-featured agency website showcasing services and portfolio.",
      ar: "موقع وكالة متكامل يعرض الخدمات والأعمال السابقة.",
    },
    image: image1,
    technologies: [
      "Admin Dashboard",
      "React",
      "Next.js",
      "Redux Toolkit",
      "TypeScript",
      "Tailwind CSS",
    ],
    githubLink: "https://github.com/yourusername/markup-agency",
    demoLink: "https://markup.vip",
    featured: true,
  },

  {
    id: "mansour",
    title: {
      en: "Mansour Sweet Food Industries",
      ar: "صناعات منصور للحلويات",
    },
    description: {
      en: "Website for a sweet food manufacturing company.",
      ar: "موقع لشركة تصنيع الحلويات.",
    },
    image: image2,
    technologies: [
      "Admin Dashboard",
      "Next.js 15",
      "React 19",
      "Redux Toolkit",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN",
    ],
    githubLink: "https://github.com/yourusername/mansour-foods",
    demoLink: "https://www.mansoursweet.com/en",
    featured: true,
  },

  {
    id: "asasy",
    title: {
      en: "Asasy Ecommerce Offers",
      ar: "أساسي لعروض البقالة الأساسية",
    },
    description: {
      en: "E-commerce platform for essential grocery items.",
      ar: "منصة تجارة إلكترونية للمواد الغذائية الأساسية.",
    },
    image: image3,
    technologies: [
      "Admin Dashboard",
      "Stripe Payment",
      "React",
      "Next.js",
      "Redux Toolkit",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN",
    ],
    githubLink: "https://github.com/yourusername/asasy-groceries",
    demoLink: "https://asasy.net",
    featured: true,
  },

  {
    id: "food-testing",
    title: {
      en: "Food Testing Platform",
      ar: "منصة اختبار الطعام",
    },
    description: {
      en: "Platform for food quality testing and reviews.",
      ar: "منصة لاختبار جودة الطعام والمراجعات.",
    },
    image: image4,
    technologies: [
      "Admin Dashboard",
      "React",
      "Next.js",
      "Redux Toolkit",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN",
    ],
    githubLink: "https://github.com/HassanGameill/Food-Delivery",
    demoLink: "https://hassangameill.github.io/Food-Delivery/#/home",
    featured: true,
  },

  {
    id: "movie-night",
    title: {
      en: "Movie Night App",
      ar: "تطبيق ليلة السينما",
    },
    description: {
      en: "Application for discovering and organizing movie nights.",
      ar: "تطبيق لاكتشاف وتنظيم ليالي السينما.",
    },
    image: image5,
    technologies: ["React Native", "Firebase"],
    githubLink: "https://github.com/HassanGameill/React-Movie-Night",
    demoLink: "https://hassangameill.github.io/React-Movie-Night/#/",
    featured: true,
  },

  {
    id: "hello-shopping",
    title: {
      en: "Hello Shopping Ecommerce App",
      ar: "تطبيق Hello Shopping للتجارة الإلكترونية",
    },
    description: {
      en: "Online shopping experience with secure payments and fast delivery.",
      ar: "تجربة تسوق إلكتروني مع دفع آمن وتوصيل سريع.",
    },
    image: image6,
    technologies: ["React Native", "Firebase"],
    githubLink: "https://github.com/HassanGameill/React-Movie-Night",
    demoLink: "https://movie-night.example.com",
    featured: true,
  },
];
