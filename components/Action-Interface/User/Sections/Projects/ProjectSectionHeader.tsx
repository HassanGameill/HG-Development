import { BookOpen } from "lucide-react";
import { useLocale } from "next-intl";

export default function ProjectSectionHeader() {
  const locale = useLocale();

  return (
    <div className="text-center mb-16 text-shadow-sm">
      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full mb-4">
        <BookOpen className="h-4 w-4 mx-2 text-blue-600 dark:text-blue-400" />
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {locale === "ar" ? "الاعمال و المشاريع" : "Projects"}
          
        </span>
      </div>

      <h2 className="text-2xl lg:text-4xl font-bold mb-4">
          {locale === "ar" ? "الاعمال و المشاريع" : "Projects & Models"}
      </h2>

      <p className="text-md lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
        {locale === "ar"
          ? "مجموعة شاملة من التقنيات الحديثة"
          : "A comprehensive toolkit of modern technologies"}
      </p>
    </div>
  );
}
