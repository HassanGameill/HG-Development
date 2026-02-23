
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useCreateCategory, useUpdateCategory } from "./useCategoryMutation";
import { CategoryFormValues, CategorySchema } from "@/validation/Sections/Project/category";
import { useRouter } from "@/i18n/routing";

export const useCategoryForm = (initialData?: CategoryFormValues | null) => {
  const params = useParams() as { id: string };
  const router = useRouter();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(CategorySchema),
    defaultValues: initialData || {
      nameEn: "",
      nameAr: "",
      titleEn: "",
      titleAr: "",
      imageUrl: "",
    },
  });

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory(params.id);

  const loading = createCategory.isPending || updateCategory.isPending;

  const onSubmit = (data: CategoryFormValues) => {
      const action = initialData ? updateCategory : createCategory;
      action.mutate(data, {
        onSuccess: () => {
        router.push("/dashboard/sections/projects/categories");
          router.refresh();
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
