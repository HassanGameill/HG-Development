import { useLocale } from 'next-intl';
import { aboutData } from './aboutData';

export default function AboutDescription() {
  const locale = useLocale();

  return (
    <div className="space-y-6 text-center  lg:text-start text-sm lg:text-md xl:text-lg">
      {aboutData.description[locale as keyof typeof aboutData.description].map((paragraph, index) => (
        <p 
          key={index} 
          className="text-sm lg:text-md xl:text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: paragraph }}
        />
      ))}
    </div>
  );
}
