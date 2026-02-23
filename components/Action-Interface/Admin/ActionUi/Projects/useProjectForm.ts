import {
  ProjectFormValues,
  ProjectSchema,
} from "@/validation/Sections/Project/projects";
import { useParams } from "next/navigation";
import { useCreateProject, useUpdateProject } from "./useProjectMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "@/i18n/routing";

export const useProjectForm = (initialData?: ProjectFormValues | null) => {
  const params = useParams() as { projectId: string };
  const router = useRouter();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: initialData || {
      titleEn: "",
      titleAr: "",
      subtitleEn: "",
      subtitleAr: "",
      githubLink: "",
      demoLink: "",
      imageUrl: "",
      categoriesId: "",
      isFeatured: false,
      isArchived: false,
      projectTechnology: [{ name: "", imageUrl: "" }],
      images: [],
    },
  });

  

  const createProject = useCreateProject();
  const updateProject = useUpdateProject(params.projectId);

  const loading = createProject.isPending || updateProject.isPending;

  const onSubmit = (data: ProjectFormValues) => {
    const action = initialData ? updateProject : createProject;

    action.mutate(data, {
      onSuccess: () => {
        router.push("/dashboard/sections/projects/project");
        router.refresh(); // App Router only
      },
    });
  };

  

  return {
    form,
    onSubmit,
    loading,
    initialData
  };
};
