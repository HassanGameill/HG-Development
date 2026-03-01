// components/projects/ProjectCard.tsx
"use client";

import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import lightlogo from "@/public/logos/hg-dev-1.png";
import darklogo from "@/public/logos/hg-dev-2.png";
import { TProject } from "@/types/projects/projectType";
import ProjectDialog from "./ProjectDialog";
import { useState } from "react";
import { HiOutlineLightBulb } from "react-icons/hi2";

type Props = {
  project: TProject;
};

export default function ProjectCard({ project }: Props) {
  const locale = useLocale();
  const { theme } = useTheme();
  const dir = locale === "ar" ? -1 : 1;

  const [open, setOpen] = useState(false);

  return (
    <motion.article
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col my-5 "
      whileHover={{ scale: 1.03 }}
      // onClick={() => setOpen(true)}
    >
      <ProjectDialog projectsData={project} open={open} setOpen={setOpen} />

      <div className="relative aspect-video">
        <Image
          src={project.imageUrl}
          alt={`${project.titleEn} project screenshot`}
          fill
          className="object-cover"
        />

        <div className="absolute top-3 right-3 w-10 h-10 bg-white border-4 border-gray-200 dark:bg-blue-900/20 rounded-full  dark:shadow-xl shadow-md  dark:shadow-blue-900/30 flex items-center justify-center  dark:border-2  dark:border-blue-800/50">
          <Image
            src={theme === "light" ? lightlogo : darklogo}
            alt="HG Dev Logo"
            width={24}
            height={24}
            className="w-10 h-10 object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-2 flex-grow">
        <motion.h3
          className="text-lg lg:text-xl font-semibold line-clamp-1"
          whileHover={{ x: 5 * dir }}
        >
          {locale === "ar" ? project.titleAr : project.titleEn}
        </motion.h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {locale === "ar" ? project.subtitleAr : project.subtitleEn}
        </p>
      </div>

      {/* Links */}
      <div className="p-6 flex gap-4">
        <button
          className="px-4 py-2 flex items-center gap-1 rounded-lg bg-primary  text-white dark:text-slate-800 text-sm font-medium hover:scale-105 transition"
          onClick={() => setOpen(true)}
        >
          <HiOutlineLightBulb className="text-md"/>
          <span className="text-xs">Details</span>
        </button>
      </div>
    </motion.article>
  );
}
