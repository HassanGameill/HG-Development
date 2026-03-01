"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PencilIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/routing";

interface TitleFormProps {
  initialData: {
    titleEn: string;
    titleAr: string;
  };
  courseId: string;
}

const formSchema = z.object({
  titleEn: z.string().min(1, {
    message: "English title is required",
  }),
  titleAr: z.string().min(1, {
    message: "Arabic title is required",
  }),
});

export const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
    mode: "all",
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/home/courses/course/${courseId}`, values);
      toast.success("Course titles updated!");
      setIsEditing(false);
      router.refresh();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      {/* Header */}
      <div className="font-medium flex items-center justify-between">
        Course Titles
        <Button
          variant="ghost"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? "Cancel" : "Edit Titles"}
          <PencilIcon className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Display Mode */}
      {!isEditing && (
        <div className="mt-2 space-y-1 text-sm">
          <p>
            <strong>EN:</strong> {form.getValues("titleEn")}
          </p>
          <p>
            <strong>AR:</strong> {form.getValues("titleAr")}
          </p>
        </div>
      )}

      {/* Edit Mode */}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="titleEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title (EN)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      className="bg-white"
                      placeholder="Enter English course title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="titleAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title (AR)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      className="bg-white"
                      placeholder="أدخل عنوان الدورة بالعربية"
                      dir="rtl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
