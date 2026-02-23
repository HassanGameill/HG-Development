import * as z from "zod";

export const SkillsItemSchema = z.object({
  name: z.string().min(1, "English title is required"),
  level: z.number().min(1),

  title: z.string().min(1, "Title is required"),
  imageUrl: z.string().url("Main image URL is required"),
});

export const SkillsSchema = z.object({
  nameEn: z.string().min(1, "English name is required"),
  nameAr: z.string().min(1, "Arabic name is required"),
  titleEn: z.string().min(1, "English title is required"),
  titleAr: z.string().min(1, "Arabic title is required"),

  color: z.string().min(1, "Color is required"),
  bgColor: z.string().min(1, "Bg-color is required"),

  imageUrl: z.string().url("Main image URL is required"),

  skillsItem: z
    .array(SkillsItemSchema)
    .min(1, "Please select at least one skills"),
});

export type SkillsFormValues = z.infer<typeof SkillsSchema>;
