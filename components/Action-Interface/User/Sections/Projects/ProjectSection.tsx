// components/projects/ProjectsSection.tsx
"use client";

import { Code } from "lucide-react";
import ProjectsGrid from "./ProjectGrid";
import ProjectSectionHeader from "./ProjectSectionHeader";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-900 ">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <ProjectSectionHeader />

        <ProjectsGrid />
      </div>
    </section>
  );
}
