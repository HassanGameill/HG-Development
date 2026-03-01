import * as z from "zod";

export const ExperienceAchievementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "subtitle is required"),
});

export const ExperienceSchema = z.object({
  title: z.string().min(1, "title is required"),
  subtitle: z.string().min(1, "subtitle is required"),
  companyName: z.string().min(1, "Company Name is required"),
  startPeriod: z.string().min(1, "StartPeriod is required"),
  endPeriod: z.string().min(1, "EndPeriod is required"),
  imageUrl: z.string().url("Main image URL is required"),
  experienceAchievement: z
    .array(ExperienceAchievementSchema)
    .min(1, "Please select at least one Achievement"),

  isCurrent: z.boolean()

});

export type ExperienceFormValues = z.infer<typeof ExperienceSchema>;
