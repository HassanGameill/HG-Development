import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { heroSectionSchema } from "@/validation/Sections/heroSection";
import * as z from "zod";

export type HeroFormValues = z.infer<typeof heroSectionSchema>;

export const useHeroForm = (initialData: HeroFormValues | null) =>
  useForm<HeroFormValues>({
    resolver: zodResolver(heroSectionSchema),
    defaultValues: initialData ?? {
      titleEn: "",
      titleAr: "",
      subtitleEn: "",
      subtitleAr: "",
      descEn: "",
      descAr: "",
      imageUrl: "",
      heroImages: [],
      isFeatured: false,
      isArchived: false,
    },
  });
