import { Briefcase } from "lucide-react";
import { useLocale } from "next-intl";

export default function ExperienceHeader() {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div className="text-center mb-16">
      
      {/* Top Label */}
      <div
        className={`
          inline-flex items-center gap-2
          bg-gradient-to-r from-orange-100 to-amber-100
          dark:from-orange-900/30 dark:to-amber-900/30
          px-4 py-2 rounded-full mb-6 text-shadow-sm
          ${isArabic ? "flex-row-reverse" : ""}
        `}
      >
        <Briefcase className="h-4 w-4 text-orange-600 dark:text-orange-400" />
        <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
          {isArabic ? "الخبرة المهنية" : "Professional Experience"}
        </span>
      </div>

      {/* Main Title */}
      <h2 className="text-xl lg:text-3xl text-shadow-sm font-bold tracking-tight mb-6 text-slate-900 dark:text-white">
        {isArabic
          ? "رحلتي المهنية وتطوري الوظيفي"
          : "My Career Journey & Growth"}
      </h2>

      {/* Description */}
      <p className="text-sm lg:text-lg text-shadow-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
        {isArabic
          ? "أبرز الإنجازات والتطورات التي ساهمت في بناء خبرتي العملية."
          : "Key milestones in my professional journey, highlighting growth, impact, and meaningful achievements."}
      </p>
    </div>
  );
}