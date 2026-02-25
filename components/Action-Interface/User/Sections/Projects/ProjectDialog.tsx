"use Client";
import Gallery from "@/components/common/Gallery/Gallery";
import Link from "@/components/common/Link";
import ProjectModel from "@/components/common/Model/ProjectModel";
import { TProject } from "@/types/projects/projectType";
import { useLocale } from "next-intl";
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
    demoLink,
    githubLink,
    projectTechnology,
  } = projectsData;
  const locale = useLocale();
  const isEn = locale === "en";

  const formattedImages = images.map((img, index) => ({
    url: img.url,
    id: `image-${index}`, // Generate a unique id if not provided
    // Add any other required ImageType properties here
  }));

  const title = isEn ? titleEn : titleAr;
  const subtitle = isEn ? subtitleEn : subtitleAr;

  return (
    <ProjectModel open={open} onClose={() => setOpen(false)}>
      <div dir={isEn ? "ltr" : "rtl"} className="flex flex-col gap-6 p-10">
        <div className="rounded-xl overflow-hidden border shadow-sm">
          <Gallery
            className="w-[70%] flex justify-start my-2"
            images={formattedImages}
            Alt={title}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {projectTechnology?.map((tech) => (
            <span
              key={tech.id}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {tech.name}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {demoLink && (
            <Link
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 flex items-center gap-2 rounded-lg bg-primary  text-white dark:text-slate-800 text-sm font-medium hover:scale-105 transition"
            >
                                          <FaExternalLinkAlt />

              <span className=""> Live Demo</span>

            </Link>
          )}

          {githubLink && (
            <Link
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 flex items-center gap-2 rounded-lg border text-sm font-medium hover:bg-muted transition"
            >
              <FaGithub />

              <span className=""> GitHub Repo</span>

              
            </Link>
          )}
        </div>
      </div>
    </ProjectModel>
  );
};

export default ProjectDialog;
