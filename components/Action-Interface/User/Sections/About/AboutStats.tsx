import { useLocale } from 'next-intl';
import { aboutData } from './aboutData';

export default function AboutStats() {
  const locale = useLocale();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
      {aboutData.stats.map((stat, index) => (
        <div 
          key={index} 
          className={`flex items-center space-x-3 p-4 rounded-xl ${stat.bg} hover:scale-105 transition-transform duration-300`}
        >
          <stat.icon className={`h-5 w-5 mx-2 ${stat.color}`} />
          <div>
            {stat.value && <span className="block font-bold text-slate-900 dark:text-white">{stat.value}</span>}
            <span className="text-slate-600 dark:text-slate-300 font-medium text-[9px] md:text-[10px] lg:text-xs">
              {stat.label[locale as keyof typeof stat.label]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
