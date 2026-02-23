import * as z from "zod";


export const heroSectionSchema = z.object({
  titleEn: z.string().min(2),
  titleAr: z.string().min(2),
  subtitleEn: z.string().min(2).optional(),
  subtitleAr: z.string().min(2).optional(),
  descEn: z.string().min(2).optional(),
  descAr: z.string().min(2).optional(),
  imageUrl: z.string().min(1),

  heroImages: z
    .array(
      z.object({
        id: z.string().optional(), // if images come from DB
        url: z.string().url("Image must have a valid URL"),
      })
    )
    .nonempty({ message: "At least one image is required" }),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});


export type HeroFormValues = z.infer<typeof heroSectionSchema>;



export interface IHeroDto {
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descEn: string;
  descAr: string;
  heroImages: { url: string }[];
  isFeatured?: boolean;
  isArchived?: boolean;
  createdAt: string;
}
