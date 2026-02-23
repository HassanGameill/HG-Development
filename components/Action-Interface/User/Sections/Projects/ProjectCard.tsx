// components/projects/ProjectCard.tsx
"use client";

import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import lightlogo from "@/public/logos/hg-dev-1.png";
import darklogo from "@/public/logos/hg-dev-2.png";
import { Project } from "./projectType";
import { TProject } from "@/types/projects/projectType";

type Props = {
  project: TProject;
};

export default function ProjectCard({ project }: Props) {
  const locale = useLocale();
  const { theme } = useTheme();
  const dir = locale === "ar" ? -1 : 1;

  return (
    <motion.article
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col my-5"
      whileHover={{ scale: 1.03 }}
    >
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
          className="text-xl font-semibold"
          whileHover={{ x: 5 * dir }}
        >
          {locale === "ar" ? project.titleAr : project.titleEn}
        </motion.h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {locale === "ar" ? project.subtitleAr : project.subtitleEn}
        </p>

        {/* <div className="flex flex-wrap gap-2">
          {project.projectTechnology.map((tech) => (
            <span
              key={tech.id}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {tech.name}
            </span>
          ))}
        </div> */}
      </div>

      {/* Links */}
      <div className="p-6 flex gap-4">
        <a
          href={project.githubLink}
          target="_blank"
          className="flex items-center gap-2 hover:text-primary"
        >
          <FaGithub /> Code
        </a>

        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            className="flex items-center gap-2 hover:text-primary"
          >
            <FaExternalLinkAlt /> Live
          </a>
        )}
      </div>
    </motion.article>
  );
}
