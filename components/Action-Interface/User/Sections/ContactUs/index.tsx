"use client";
import React from "react";
import Image from "next/image";
// import bgImage from "../../../../../public/images/contactUs.png";
import hg1 from "@/public/logos/hg-dev-1.png";
import hg2 from "@/public/logos/hg-dev-2.png";
import ContactForm from "./ConatctForm";
import { useLocale } from "next-intl";
import { Send } from "lucide-react";
import { useTheme } from "next-themes";
import ContactHeader from "./ContactHeader";

const ContactUs = () => {
  const locale = useLocale();

  const { theme } = useTheme();

  const title =
    locale === "ar"
      ? "دعنا نتواصل و نناقش مشروعك الان"
      : "Let's Discuss Your Project Now";

  const description =
    locale === "ar"
      ? "مطور Full Stack متخصص في بناء تطبيقات ويب وشاملة من البداية للنهاية. هل تحتاج نظامًا لإدارة أعمالك؟ موقع ويب تفاعلي؟ أو حل برمجي مخصص؟ دعنا نناقش مشروعك!"
      : "Full Stack Developer specializing in end-to-end web applications. Need a business management system? Interactive website? Or custom software solution? Let's discuss your project!";

  return (
    <section
      id="contact"
      className="relative bg-gray-100 dark:bg-gray-900  w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] "
    >
     <ContactHeader />
      {/* Content container */}
      <div className="container w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-8 py-20 ">
        {/* Contact Form - takes full width on mobile, then 2/3 on larger screens */}
        <div className="w-full">
          <ContactForm />
        </div>

        <div className="w-full  order-1 bg-white/85 dark:bg-slate-800/85 rounded-xl shadow-md py-4  flex justify-center ">
          <div className="max-w-md text-center">
            <div className="relative w-40 h-40 md:w-64 md:h-64 mx-auto mb-8 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-md opacity-70 group-hover:opacity-90 transition-all duration-500"></div>
              <div className="relative w-full h-full bg-white dark:bg-gray-800 rounded-full flex items-center justify-center p-4 shadow-lg border-4 border-white dark:border-gray-700 overflow-hidden">
                <Image
                  src={theme === "light" ? hg1 : hg2}
                  alt="HG_Logo"
                  width={256}
                  height={256}
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>

            <div className="px-4 lg:px-0">
              <h1 className="text-xl lg:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                {title}
              </h1>
              <p className="text-sm lg:text-sm text-gray-600 dark:text-gray-300 mb-8">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
