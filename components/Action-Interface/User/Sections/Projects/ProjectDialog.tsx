"use client";

import Gallery from "@/components/common/Gallery/Gallery";
import Link from "@/components/common/Link";
import ProjectModel from "@/components/common/Model/ProjectModel";
import { TProject } from "@/types/projects/projectType";
import { useLocale } from "next-intl";
import Image from "next/image";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

type Props = {
  projectsData: TProject;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const ProjectDialog = ({ projectsData, open, setOpen }: Props) => {
  const {
    images = [],
    titleEn,
    titleAr,
    subtitleEn,
    subtitleAr,
    imageUrl,
    demoLink,
    githubLink,
    projectTechnology,
  } = projectsData;

  const locale = useLocale();
  const isEn = locale === "en";

  const title = isEn ? titleEn : titleAr;
  const subtitle = isEn ? subtitleEn : subtitleAr;

  return (
    <ProjectModel open={open} onClose={() => setOpen(false)}>
      <div
        dir={isEn ? "ltr" : "rtl"}
        className="flex flex-col gap-8 p-6 md:p-10 "
      >
        {/* 🔹 Project Image */}
        <div className="relative w-full h-40 md:h-[200px] rounded-2xl overflow-hidden border shadow-md">
          <Image
            src={imageUrl}
            alt={`${title} project screenshot`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 🔹 Title & Subtitle */}
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">
            {title}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 🔹 Technologies */}
        {projectTechnology?.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wide">
              {isEn ? "Technologies" : "التقنيات المستخدمة"}
            </h3>

            <div className="flex flex-wrap gap-4">
              {projectTechnology.map((tech) => (
                <div
                  key={tech.id}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div
                    className="w-12 h-12  rounded-xl
                    shadow-sm flex items-center justify-center
                    bg-white dark:bg-slate-800 p-2
                    border transition-all duration-300
                    group-hover:scale-110 group-hover:shadow-md"
                  >
                    <Image
                      src={tech.imageUrl}
                      alt={tech.name}
                      width={40}
                      height={40}
                      loading="lazy"
                      className="object-contain"
                    />
                  </div>

                  <span className="text-[10px] lg:text-xs font-medium text-center">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🔹 Action Buttons */}
        <div className="flex  items-center gap-3 pt-4 ">
          {demoLink && (
            <Link
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 flex items-center gap-2 rounded-xl 
              bg-primary text-white text-sm font-medium 
              hover:scale-105 hover:shadow-md transition-all"
            >
              <FaExternalLinkAlt />
              <span className="hidden lg:block text-xs">{isEn ? "Live Demo" : "عرض المشروع"}</span>
            </Link>
          )}

          {githubLink && (
            <Link
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 flex items-center gap-2 rounded-xl 
              border text-sm font-medium 
              hover:bg-muted hover:scale-105 transition-all"
            >
              <FaGithub />
              <span className="hidden lg:block text-xs">{isEn ? "GitHub Repo" : "كود المشروع"}</span>
            </Link>
          )}
        </div>
      </div>
    </ProjectModel>
  );
};

export default ProjectDialog;