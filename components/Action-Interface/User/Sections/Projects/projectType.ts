// components/projects/types.ts

export interface Project {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  image: any;
  technologies: string[];
  blurDataURL?: string;
  githubLink: string;
  demoLink?: string;
  featured: boolean;
}
