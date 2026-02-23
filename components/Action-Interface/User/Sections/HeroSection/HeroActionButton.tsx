import Link from "@/components/common/Link";
import { ArrowLeft, ArrowRight, Rocket } from "lucide-react";
import { useLocale } from "next-intl";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const HeroActionButton = () => {
  const locale = useLocale();

  return (
    <div className="flex justify-center lg:justify-start flex-wrap gap-5 animate-fade-in-up delay-200">
      {/* Primary Button - Adapts to Dark Mode & RTL */}
      <Link
        href="#projects"
        className="group relative flex items-center px-4 py-2 lg:px-6 lg:py-2.5 text-[10px] lg:text-sm rounded-xl 
              bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 
              hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800
              dark:from-blue-700 dark:via-purple-700 dark:to-indigo-900
              dark:hover:from-blue-800 dark:hover:via-purple-800 dark:hover:to-indigo-950
              text-white  hover:shadow-blue-500/30 dark:hover:shadow-blue-600/20
              transition-all duration-500 ease-out hover:-translate-y-0.5 active:translate-y-0 
              transform hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-indigo-400/50
              rtl:space-x-reverse" // RTL spacing fix
        aria-label={locale === "ar" ? "عرض أعمالي" : "View My Work"}
      >
        {/* Rocket Icon - Flips in RTL */}
        <div className={`relative ${locale === "ar" ? "ml-3" : "mr-3"}`}>
          <Rocket
            className="h-6 w-6 transition-all duration-700 
                       group-hover:rotate-[30deg] group-hover:text-yellow-200
                       dark:group-hover:text-yellow-300"
          />
          <div
            className="absolute -bottom-1 -right-1 h-1.5 w-6 bg-yellow-400 
                     blur-sm opacity-0 group-hover:opacity-100 
                     group-hover:animate-fire-tail dark:bg-yellow-300"
          />
        </div>

        {locale === "ar" ? "عرض أعمالي" : "View My Work"}

        {/* Dynamic Arrow - Flips Direction in RTL */}
        <div className={locale === "ar" ? "mr-3" : "ml-3"}>
          {locale === "en" ? (
            <ArrowRight
              className="h-5 w-5 transition-all duration-500 
                              group-hover:translate-x-1.5 group-hover:opacity-80"
            />
          ) : (
            <ArrowLeft
              className="h-5 w-5 transition-all duration-500 
                             group-hover:-translate-x-1.5 group-hover:opacity-80"
            />
          )}
        </div>

        {/* 3D Effect - Dark Mode Variant */}
        <span
          className="absolute inset-0 rounded-xl 
                    shadow-[inset_0_-3px_12px_rgba(0,0,0,0.3)] 
                    group-hover:shadow-[inset_0_-4px_16px_rgba(0,0,0,0.25)]
                    dark:shadow-[inset_0_-3px_12px_rgba(0,0,0,0.5)]
                    dark:group-hover:shadow-[inset_0_-4px_20px_rgba(0,0,0,0.4)]
                    transition-all duration-500"
        />
      </Link>

      {/* WhatsApp Button - Culturally Adapted */}
      <Link
        href="https://wa.me/+201021432599"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center px-4 py-2 lg:px-6 lg:py-2.5 text-[10px] lg:text-sm rounded-xl 
              border-2 border-emerald-100/80 hover:border-emerald-300
              dark:border-emerald-900/50 dark:hover:border-emerald-400
              text-gray-800 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white
              bg-white/95 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800
              shadow-lg hover:shadow-emerald-200/40 dark:hover:shadow-emerald-500/20
              transition-all duration-500 ease-out hover:-translate-y-0.5 
              active:translate-y-0 transform hover:scale-[1.02] 
              focus-visible:ring-4 focus-visible:ring-emerald-300/50
              rtl:space-x-reverse rtl:text-right" // RTL adjustments
        aria-label={locale === "ar" ? "تواصل معي" : "Contact Me"} // More natural Arabic phrasing
      >
        {/* Notification Dot - Position flips in RTL */}
        <div className={`relative ${locale === "ar" ? "ml-3" : "mr-3"}`}>
          <FaWhatsapp
            className="h-6 w-6 text-emerald-500 group-hover:text-emerald-600 
                           dark:text-emerald-400 dark:group-hover:text-emerald-300
                           transition-colors duration-300 group-hover:scale-110"
          />
        </div>

        {locale === "ar" ? "تواصل معي" : "Contact Me"}

        {/* Chat Tail - Position flips in RTL */}
        <svg
          className={`absolute ${
            locale === "ar" ? "-left-3.5" : "-right-3.5"
          } top-1/2 -translate-y-1/2 
                w-4 h-4 text-emerald-100/80 group-hover:text-emerald-300
                dark:text-emerald-900/50 dark:group-hover:text-emerald-400
                opacity-0 group-hover:opacity-100 transition-all duration-300
                ${locale === "ar" ? "scale-x-[-1]" : ""}`} // Flip horizontally in RTL
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 0C20 10 10 20 0 10L10 0Z" />
        </svg>

        {/* Tooltip - Position and text adapt to RTL */}
        <div
          className={`absolute -top-10 ${locale === "ar" ? "left-0" : "right-0"}
                bg-white dark:bg-gray-700 py-1.5 px-3 rounded-lg shadow-md 
                border border-gray-100 dark:border-gray-600
                opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 
                transition-all duration-300
                ${locale === "ar" ? "rtl:text-right" : ""}`}
        >
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-300">
            {locale === "ar" ? "لنتحدث!" : "Let's chat!"}
          </span>
          <div
            className={`absolute -bottom-1.5 ${
              locale === "ar" ? "left-4" : "right-4"
            } 
                  w-3 h-3 bg-white dark:bg-gray-700 transform rotate-45 
                  border-r border-b border-gray-100 dark:border-gray-600`}
          />
        </div>
      </Link>
    </div>
  );
};

export default HeroActionButton;
