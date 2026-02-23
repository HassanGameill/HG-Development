"use client";

import { BookOpen, Layout, Users } from "lucide-react";
import {
  HiOutlineSwatch,
  HiOutlineClipboardDocumentCheck,
  HiOutlineCreditCard,
} from "react-icons/hi2";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { HiOutlineCog } from "react-icons/hi2";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { HiOutlineRectangleStack } from "react-icons/hi2";




import SidebarItems from "./SidebarItems";
import { useLocale } from "next-intl";

type NavChild = {
  name: {
    en: string;
    ar: string;
  };
  href: string;
  icon: any;
};

type NavItem = {
  name: {
    en: string;
    ar: string;
  };
  href: string;
  icon: any;
  children?: NavChild[];
};

const NAV_LINKS: NavItem[] = [
  {
    icon: Layout,
    name: {
      en: "Dashboard",
      ar: "الرئيسية",
    },
    href: "/dashboard",
  },
  {
    icon: Users,
    name: {
      en: "Users",
      ar: "المستخدمين",
    },
    href: "/dashboard/users",
  },

  {
    icon: HiOutlineCalendarDays,
    name: {
      en: "Hero Section",
      ar: "هروو",
    },
    href: "/dashboard/sections/hero",
  },

  {
    icon: HiOutlineCog,
    name: {
      en: "Skills",
      ar: "المهارات",
    },
    href: "/dashboard/sections/skills",
  },
  {
    icon: HiOutlineRectangleStack,
    name: {
      en: "Projects",
      ar: "المنتجات",
    },
    href: "/dashboard/sections/projects",
    children: [
      {
        name: {
          en: "Category",
          ar: "الفئات",
        },
        href: "/dashboard/sections/projects/categories",
        icon: HiOutlineSwatch,
      },
      {
        name: {
          en: "Project",
          ar: "مشروع",
        },
        href: "/dashboard/sections/projects/project",
        icon: HiOutlineClipboardDocumentCheck,
      },
    ],
  },
  {
    icon: HiOutlineBriefcase,
    name: {
      en: "Experience",
      ar: "الخبرات",
    },
    href: "/dashboard/sections/experience",
  },

  {
    icon: BookOpen,
    name: {
      en: "Courses",
      ar: "الكورسات",
    },
    href: "/dashboard/home/courses",
  },
];

const SidebarRoutes = () => {
  const locale = useLocale();

  return (
    <div className="flex flex-col w-full space-y-1 mt-2">
      {NAV_LINKS.map((route) => (
        <SidebarItems
          key={route.href}
          icon={route.icon}
          name={route.name[locale as "en" | "ar"]}
          href={route.href}
          nestedLinks={route.children?.map((child) => ({
            name: child.name[locale as "en" | "ar"],
            href: child.href,
            icon: child.icon,
          }))}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
