"use client";
import { useFieldArray } from "react-hook-form";
import { useExperienceForm } from "./useAdminExperienceForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import InputForm from "@/components/common/Normal-Form/Input/InputForm";
import { Button } from "@/components/ui/button";
import { ListChecks, Loader2, MinusCircle, PlusCircle } from "lucide-react";
import ImageUpload from "@/lib/ImageUpload";
import { useRouter } from "@/i18n/routing";
import { ExperienceFormValues } from "@/validation/Sections/experience";
import ReusableInput from "../SharedForms/ReusableInput";

interface FormProps {
  initialData: ExperienceFormValues | null;
}

const ExperienceAdminForm: React.FC<FormProps> = ({ initialData }) => {
  const { form, onSubmit, loading } = useExperienceForm(initialData);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experienceAchievement",
  });

  const router = useRouter();

  //   ___ Action Content Handler _____
  const actionLabel = initialData ? "Save Changes" : "Create Project";

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-10 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow border"
        >
          {/* Main Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputForm
                control={form.control}
                name="title"
                label="Title"
                placeholder="Enter the title"
              />

              <InputForm
                control={form.control}
                name="subtitle"
                label="Subtitle"
                placeholder="Enter the subtitle"
              />

              <InputForm
                control={form.control}
                name="companyName"
                label="Company Name"
                placeholder="Enter company name"
              />

              {/* Background Image Upload */}
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormControl>
                      <ImageUpload
                        className="w-20 h-20 "
                        value={field.value ? [field.value] : []}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <InputForm
                control={form.control}
                name="startPeriod"
                label="Start Period"
                placeholder="Enter start period"
              />

              <InputForm
                control={form.control}
                name="endPeriod"
                label="End Period"
                placeholder="Enter end period"
              />
            </div>

            <div className="">
              <div className="space-y-6 border p-4 rounded-lg hover:shadow-sm transition">
                <div className="flex items-center gap-x-2 mb-2">
                  <ListChecks />
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Experience Achievement
                  </h2>
                </div>{" "}
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className=" flex items-center gap-6 transition "
                  >
                    <ReusableInput
                      control={form.control}
                      getValues={form.getValues}
                      nameOne={`experienceAchievement.${index}.title`}
                      nameTwo={`experienceAchievement.${index}.subtitle`}
                      labelOne="Title"
                      labelTwo="Subtitle"
                    />

                    <div className="">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="mt-2 "
                        onClick={() => remove(index)}
                      >
                        <MinusCircle className="h-4 w-4 " />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => append({ title: "", subtitle: "" })}
                >
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Feature
                </Button>
              </div>
            </div>
          </div>

          {/* Features Section */}

         

          {/* Sticky Submit Bar */}
          <div className="sticky bottom-0 z-10 -mx-8 border-t bg-background px-8 py-4 flex justify-end gap-3">
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

export default ExperienceAdminForm;
