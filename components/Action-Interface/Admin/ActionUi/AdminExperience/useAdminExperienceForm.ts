
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "@/i18n/routing";
import { useCreateExperience, useUpdateExperience } from "./useAdminExperienceMutation";
import { ExperienceFormValues, ExperienceSchema } from "@/validation/Sections/experience";

export const useExperienceForm = (initialData?: ExperienceFormValues | null) => {
  const params = useParams() as { id: string };
  const router = useRouter();

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues: initialData || {
      title: "",
      subtitle: "",
      companyName: "",
      startPeriod: "",
      endPeriod: "",
      imageUrl: "",
      isCurrent: false,
      experienceAchievement: [{ title: "", subtitle: "" }],
    },
  });

  const createExperience = useCreateExperience();
  const updateExperience = useUpdateExperience(params.id);

  const loading = createExperience.isPending || updateExperience.isPending;

  const onSubmit = (data: ExperienceFormValues) => {
    const action = initialData ? updateExperience : createExperience;

    action.mutate(data, {
      onSuccess: () => {
        router.push("/dashboard/sections/experience");
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
