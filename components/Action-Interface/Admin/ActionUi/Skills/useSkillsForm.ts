
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "@/i18n/routing";
import { useCreateSkills, useUpdateSkills } from "./useSkillsMutation";
import { SkillsFormValues, SkillsSchema } from "@/validation/Sections/skills";

export const useSkillsForm = (initialData?: SkillsFormValues | null) => {
  const params = useParams() as { skillsId: string };
  const router = useRouter();

  const form = useForm<SkillsFormValues>({
    resolver: zodResolver(SkillsSchema),
    defaultValues: initialData || {
      nameEn: "",
      nameAr: "",
      titleEn: "",
      titleAr: "",
      color: "",
      bgColor: "",
      imageUrl: "",
      skillsItem: [{ name: "", title: "", level: 0, imageUrl: "" }],
    },
  });

  const create = useCreateSkills();
  const update = useUpdateSkills(params.skillsId);

  const loading = create.isPending || update.isPending;

  const onSubmit = (data: SkillsFormValues) => {
    const action = initialData ? update : create;

    action.mutate(data, {
      onSuccess: () => {
        router.push("/dashboard/sections/skills");
        router.refresh(); // App Router only
      },
    });
  };

  return {
    form,
    onSubmit,
    loading,
    initialData,
  };
};
