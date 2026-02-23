import { z } from "zod";

export const CategorySchema = z.object({
  nameEn: z.string().min(1, "Name is required"),
  nameAr: z.string().min(1, "Name is required"),
  titleEn: z.string().min(1, "title is required"),
  titleAr: z.string().min(1, "title is required"),
  imageUrl: z.string().url("image URL is required"),
});


export type CategoryFormValues = z.infer<typeof CategorySchema>;
