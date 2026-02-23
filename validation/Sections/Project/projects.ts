import * as z from "zod";


export const ProjectTechnologySchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string().url("Main image URL is required").optional(),
});

const ImageSchema = z.object({
  url: z.string().url("Image must be a valid URL"),
});

export const ProjectSchema = z.object({
  imageUrl: z.string().url("Main image URL is required"),
  images: z.array(ImageSchema).min(1, "You must upload at least one image"),

  titleEn: z.string().min(1, "English title is required"),
  titleAr: z.string().min(1, "Arabic title is required"),

  subtitleEn: z.string().min(1, "English subtitle is required"),
  subtitleAr: z.string().min(1, "Arabic subtitle is required"),

  githubLink: z.string().url("GitHub link must be a valid URL"),
  demoLink: z.string().url("Demo link must be a valid URL"),

  projectTechnology: z
    .array(ProjectTechnologySchema)
    .min(1, "Please select at least one technology"),

  categoriesId: z.string().min(1, "Category is required"),
  isFeatured: z.boolean(),
  isArchived: z.boolean(),
});

export type ProjectFormValues = z.infer<typeof ProjectSchema>;
