"use client";
import { useFieldArray } from "react-hook-form";
import { useProjectForm } from "./useProjectForm";
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
import { ProjectFormValues } from "@/validation/Sections/Project/projects";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Categories } from "@prisma/client";
import { FormFeature } from "@/components/common/Normal-Form/FormFeature";

interface FormProps {
  initialData: ProjectFormValues | null;
  categories: Categories[];
}

const ProjectForm: React.FC<FormProps> = ({ initialData, categories }) => {
  const { form, onSubmit, loading } = useProjectForm(initialData);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projectTechnology",
  });

  const router = useRouter();

  //   ___ Action Content Handler _____
  const title = initialData ? "Edit Hero" : "Create Hero";
  const description = initialData
    ? "Edit the selected hero details."
    : "Add a new hero section.";
  const actionLabel = initialData ? "Save Changes" : "Create Project";

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-10 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border"
        >
          {/* Basic info */}

          {/* Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <InputForm
              control={form.control}
              name="titleEn"
              label="Title (English)"
              placeholder="Enter your first name"
            />

            <InputForm
              control={form.control}
              name="titleAr"
              label="Title (Arabic)"
              placeholder="Enter your first name"
            />
          </div>

          {/* Subtitle */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <InputForm
              control={form.control}
              name="subtitleEn"
              label="Subtitle (English)"
              placeholder="Enter subtitleEn"
            />

            <InputForm
              control={form.control}
              name="subtitleAr"
              label="Subtitle (Arabic)"
              placeholder="Enter subtitleAr"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <InputForm
              control={form.control}
              name="githubLink"
              label="Github Link"
              placeholder="Enter Github Link"
            />

            <InputForm
              control={form.control}
              name="demoLink"
              label="DemoLink"
              placeholder="Enter DemoLink"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map((image) => image.url)}
                      onChange={(url) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) => current.url !== url,
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="categoriesId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>

                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={String(field.value)}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />

                        <SelectContent className="bg-white">
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={String(category.id)}
                            >
                              {category.nameEn}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectTrigger>
                    </FormControl>
                  </Select>

                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>

          {/* Features List */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Features</h3>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 sm:grid-cols-4 gap-6 items-center border p-4 rounded-lg"
              >
                <InputForm
                  control={form.control}
                  name={`projectTechnology.${index}.name`}
                  label="Subtitle (Arabic)"
                  placeholder="Enter your first name"
                />

                <FormField
                  control={form.control}
                  name={`projectTechnology.${index}.imageUrl`}
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

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="mt-2"
                  onClick={() => remove(index)}
                >
                  <MinusCircle className="h-4 w-4 mr-2" /> Remove
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="secondary"
              onClick={() => append({ name: "", imageUrl: "" })}
            >
              <PlusCircle className="h-4 w-4 mr-2" /> Add Feature
            </Button>
          </div>

           <FormFeature control={form.control} />
          

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

export default ProjectForm;
