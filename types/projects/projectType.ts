

export type TProjectTechnology = {
  id?: string;
  name: string;
  imageUrl: string;
}


export type TProjectImages = {
  id?: string;
  url: string
}



export type TProject = {
  id?: string;
  imageUrl: string;
  images: TProjectImages[];
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  githubLink: string;
  demoLink: string;
  position: number;
  projectTechnology: TProjectTechnology[];
  categoriesId: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}
