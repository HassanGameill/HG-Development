"use client";
import { useFieldArray } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import InputForm from "@/components/common/Normal-Form/Input/InputForm";
import { Button } from "@/components/ui/button";
import { Loader2, MinusCircle, PlusCircle } from "lucide-react";
import ImageUpload from "@/lib/ImageUpload";
import { useRouter } from "@/i18n/routing";

import { useCategoryForm } from "./useCategoryForm";
import { CategoryFormValues } from "@/validation/Sections/Project/category";

interface FormProps {
  initialData: CategoryFormValues | null;
}

const CategoryForm: React.FC<FormProps> = ({ initialData }) => {

  const { form, onSubmit, loading } = useCategoryForm(initialData);
  const router = useRouter();

  //   ___ Action Content Handler _____
  const title = initialData ? "Edit Hero" : "Create Hero";
  const description = initialData
    ? "Edit the selected hero details."
    : "Add a new hero section.";
  const actionLabel = initialData ? "Save Changes" : "Create Category";

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-10 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border"
        >

          {/* Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <InputForm
              control={form.control}
              name="nameEn"
              label="name (English)"
              placeholder="Enter name"
            />

            <InputForm
              control={form.control}
              name="nameAr"
              label="name (Arabic)"
              placeholder="Enter name"
            />
          </div>


          {/* Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <InputForm
              control={form.control}
              name="titleEn"
              label="title (English)"
              placeholder="Enter title"
            />

            <InputForm
              control={form.control}
              name="titleAr"
              label="titleAr (Arabic)"
              placeholder="Enter title"
            />
          </div>

          {/* Subtitle */}

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
           
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Section</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>

          
          {/* Submit */}
          <div className="sticky bottom-0 z-10 -mx-6 border-t bg-background px-6 py-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => router.back()}>
              Cancel
            </Button>

            <Button disabled={loading} className="min-w-[160px]">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {actionLabel}
            </Button>
          </div>
        </form>
      </Form>

      <Separator className="mt-10 bg-gray-300" />
    </>
  );
};

export default CategoryForm;
