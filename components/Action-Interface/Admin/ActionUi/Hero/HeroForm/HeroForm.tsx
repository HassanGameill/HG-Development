"use client";

import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";

import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";


import Heading from "@/components/common/Headings/Heading";
import ImageUpload from "@/lib/ImageUpload";

import { useHeroForm } from "./useHeroForm";
import { useCreateHero, useUpdateHero } from "../HeroServices/useHeroMutations";
import { HeroFormValues } from "@/validation/Sections/heroSection";
import { Loader2 } from "lucide-react";
import { FormInput } from "./Input";
import { HeroFlags } from "./Flags";
import { Section } from "./FormSection";

interface HeroFormProps {
  initialData: HeroFormValues | null;
}


const HeroForm: React.FC<HeroFormProps> = ({ initialData }) => {
  const params = useParams() as { id: string };
  const router = useRouter();

  const form = useHeroForm(initialData);
  const createHero = useCreateHero();
  const updateHero = useUpdateHero(params.id);

  const loading = createHero.isPending || updateHero.isPending;

  const onSubmit = (data: HeroFormValues) => {
    const action = initialData ? updateHero : createHero;
    action.mutate(data, {
      onSuccess: () => {
        router.push("/dashboard/sections/hero");
        router.refresh();
      },
    });
  };

  const title = initialData ? "Edit Hero" : "Create Hero";
  const description = initialData ? "Edit the selected hero details." : "Add a new hero section.";
  const actionLabel = initialData ? "Save Changes" : "Create Hero";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-6 rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-900 ${loading ? "opacity-70 pointer-events-none" : ""}`}>
        {/* Header */}
        <section className="space-y-4">
          <Heading title={title} description={description} />
          <Separator />
        </section>

        {/* Titles */}
        <Section title="Titles" description="Main headline shown to users">
          <FormInput
            control={form.control}
            nameEn="titleEn"
            nameAr="titleAr"
            label="Title"
            placeholderEn="Main hero title"
            placeholderAr="العنوان الرئيسي"
            maxLength={80}
            disabled={loading}
          />
        </Section>

        {/* Subtitles */}
        <Section title="Subtitles" description="Supporting subtitle for context">
          <FormInput
            control={form.control}
            nameEn="subtitleEn"
            nameAr="subtitleAr"
            label="Subtitle"
            placeholderEn="Supporting subtitle"
            placeholderAr="الوصف الفرعي"
            disabled={loading}
          />
        </Section>

        {/* Descriptions */}
        <Section title="Descriptions" description="Short description shown below title">
          <FormInput
            control={form.control}
            nameEn="descEn"
            nameAr="descAr"
            label="Description"
            placeholderEn="Short description"
            placeholderAr="الوصف"
            textarea
            disabled={loading}
          />
        </Section>

        {/* Media */}
        <Section title="Media" description="Upload hero images or background">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="heroImages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Gallery (Optional)</FormLabel>
                  <FormDescription className="flex justify-between">
                    <span>Recommended: 1200×800</span>
                    <span className="text-xs">Max 5 images</span>
                  </FormDescription>
                  <FormControl>
                    <ImageUpload
                      disabled={loading}
                      value={field.value.map((img) => img.url)}
                      onChange={(url) => field.onChange([...field.value, { url }])}
                      onRemove={(url) => field.onChange(field.value.filter((img) => img.url !== url))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Image</FormLabel>
                  <FormDescription>Used as section background</FormDescription>
                  <FormControl>
                    <ImageUpload
                      disabled={loading}
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Section>

        {/* Settings */}
        <HeroFlags control={form.control} />

        {/* Sticky Actions */}
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
  );
};

export default HeroForm;
