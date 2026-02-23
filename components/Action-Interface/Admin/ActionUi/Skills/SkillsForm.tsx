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
import { SkillsFormValues } from "@/validation/Sections/skills";
import { useSkillsForm } from "./useSkillsForm";
import { Input } from "@/components/ui/input";

interface FormProps {
  initialData: SkillsFormValues | null;
}

const SkillsForm: React.FC<FormProps> = ({ initialData }) => {
  const { form, onSubmit, loading } = useSkillsForm(initialData);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skillsItem",
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
          {/* name info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <InputForm
              control={form.control}
              name="nameEn"
              label="name (English)"
              placeholder="Enter your first name"
            />

            <InputForm
              control={form.control}
              name="nameAr"
              label="name (Arabic)"
              placeholder="Enter your first name"
            />
          </div>

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
              name="color"
              label="color"
              placeholder="Enter color"
            />

            <InputForm
              control={form.control}
              name="bgColor"
              label="bgColor"
              placeholder="Enter bgColor"
            />
          </div>

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
                  name={`skillsItem.${index}.name`}
                  label="name"
                  placeholder="Enter name"
                />

                <InputForm
                  control={form.control}
                  name={`skillsItem.${index}.title`}
                  label="title"
                  placeholder="Enter title"
                />

                <InputForm
                  control={form.control}
                  name={`skillsItem.${index}.level`}
                  type="number"
                  label="Level"
                  placeholder="Enter level"
                />

                {/* <FormField
                  control={form.control}
                  name={`skillsItem.${index}.level`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder="Level"
                          className="placeholder:text-gray-500"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name={`skillsItem.${index}.imageUrl`}
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
              onClick={() =>
                append({ name: "", title: "", level: 0, imageUrl: "" })
              }
            >
              <PlusCircle className="h-4 w-4 mr-2" /> Add Feature
            </Button>
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

export default SkillsForm;
