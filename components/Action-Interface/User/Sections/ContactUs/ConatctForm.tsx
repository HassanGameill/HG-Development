"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useLocale } from "next-intl";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import hg1 from "@/public/logos/hg-dev-1.png";
import hg2 from "@/public/logos/hg-dev-2.png";
import Image from "next/image";
import { useTheme } from "next-themes";

const formSchema = z.object({
  name: z.string().min(2, { message: "name_required" }),
  email: z.string().email({ message: "email_invalid" }),
  phone: z.string().min(6, { message: "phone_required" }).regex(/^[0-9+\-() ]+$/, { message: "phone_invalid" }),
  message: z.string().min(10, { message: "message_required" }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const locale = useLocale();
  const {theme} = useTheme()



  const translations = {
    en: {
      title: "Contact Us",
      subtitle: "We'll get back to you soon",
      name: "Name",
      email: "Email",
      phone: "Phone",
      subject: "Subject",
      message: "Message",
      submit: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "Failed to send message. Please try again.",
      thank_you: "Thank You!",
      confirmation: "We've received your message and will respond shortly.",
      another_message: "Send Another Message",
      validation_messages: {
        name_required: "Name must be at least 2 characters",
        email_invalid: "Please enter a valid email",
        phone_required: "Phone number is required",
        phone_invalid: "Please enter a valid phone number",
        subject_required: "Subject must be at least 5 characters",
        message_required: "Message must be at least 10 characters",
      }
    },
    ar: {
      title: "تواصل معنا",
      subtitle: "سنرد عليك في اقرب وقت",
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      subject: "الموضوع",
      message: "الرسالة",
      submit: "إرسال الرسالة",
      sending: "جاري الإرسال...",
      success: "تم إرسال الرسالة بنجاح!",
      error: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.",
      thank_you: "شكراً لك!",
      confirmation: "لقد استلمنا رسالتك وسنرد عليك في اقرب وقت.",
      another_message: "إرسال رسالة أخرى",
      validation_messages: {
        name_required: "يجب أن يكون الاسم مكون من حرفين على الأقل",
        email_invalid: "الرجاء إدخال بريد إلكتروني صحيح",
        phone_required: "رقم الهاتف مطلوب",
        phone_invalid: "الرجاء إدخال رقم هاتف صحيح",
        subject_required: "يجب أن يكون الموضوع مكون من 5 أحرف على الأقل",
        message_required: "يجب أن تكون الرسالة مكونة من 10 أحرف على الأقل",
      }
    }
  };

  const t = translations[locale as keyof typeof translations];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/sections/contact`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': locale,
        },
      });
      
      if (response.status >= 200 && response.status < 300) {
        toast.success(t.success, {
          icon: <CheckCircle className="text-green-500" />,
          style: {
            background: '#f0fdf4',
            color: '#166534',
            border: '1px solid #bbf7d0',
          },
        });
        setIsSubmitted(true);
        form.reset();
      } else {
        throw new Error(response.data?.message || t.error);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      const errorMessage = error.response?.data?.message || error.message || t.error;
      toast.error(errorMessage, {
        icon: <AlertCircle className="text-red-500" />,
        style: {
          background: '#fef2f2',
          color: '#b91c1c',
          border: '1px solid #fecaca',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg text-center max-w-md mx-auto"
      >
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-full">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{t.thank_you}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{t.confirmation}</p>
        <Image
          src={theme === "light" ? hg1 : hg2}
          alt="Mansour Logo"
          width={200}
          height={200}
          className="mb-6 rounded-lg"
        />
        <Button
          onClick={() => setIsSubmitted(false)}
          className="w-full bg-primary hover:bg-primary/90 transition-colors"
          variant="default"
        >
          {t.another_message}
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full  p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{t.subtitle}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          

          <div className="grid grid-cols-2 gap-4">

            <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">{t.name}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t.name}
                    {...field}
                    disabled={loading}
                    className={`dark:bg-slate-700 ${fieldState.error ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-400 text-sm">
                  {fieldState.error && t.validation_messages[fieldState.error.message as keyof typeof t.validation_messages]}
                </FormMessage>
              </FormItem>
            )}
          />

            <FormField
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">{t.phone}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t.phone}
                    type="tel"
                    {...field}
                    disabled={loading}
                    className={`dark:bg-slate-700 ${fieldState.error ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-400 text-sm">
                  {fieldState.error && t.validation_messages[fieldState.error.message as keyof typeof t.validation_messages]}
                </FormMessage>
              </FormItem>
            )}
          />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">{t.email}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t.email}
                    type="email"
                    {...field}
                    disabled={loading}
                    className={`dark:bg-slate-700 ${fieldState.error ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-400 text-sm">
                  {fieldState.error && t.validation_messages[fieldState.error.message as keyof typeof t.validation_messages]}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">{t.message}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t.message}
                    className={`min-h-[120px] dark:bg-slate-700 ${fieldState.error ? 'border-red-500 dark:border-red-500' : ''}`}
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-400 text-sm">
                  {fieldState.error && t.validation_messages[fieldState.error.message as keyof typeof t.validation_messages]}
                </FormMessage>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full mt-6"
            disabled={loading}
            size="lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t.sending}
              </span>
            ) : (
              t.submit
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default ContactForm;