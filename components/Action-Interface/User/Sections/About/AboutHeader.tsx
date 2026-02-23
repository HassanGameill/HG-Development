import { Users } from 'lucide-react';
import { useLocale } from 'next-intl';
import { aboutData } from './aboutData';

export default function AboutHeader() {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  
  return (
    <div className="text-center mb-16 text-shadow-sm">
      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full mb-4">
        <Users className="h-5 w-5 text-blue-600 mx-2" />
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {isArabic ? 'ماذا عني' : 'About Me'}
        </span>
      </div>
      <h2 className="text-2xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
        {aboutData.title[locale as keyof typeof aboutData.title]}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 text-sm lg:text-md max-w-2xl mx-auto">
        {aboutData.subtitle[locale as keyof typeof aboutData.subtitle]}
      </p>
    </div>
  );
}
