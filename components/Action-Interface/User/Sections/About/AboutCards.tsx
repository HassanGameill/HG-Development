import { useLocale } from 'next-intl';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { aboutData } from './aboutData';

export default function AboutCards() {
  const locale = useLocale();

  return (
    <div className="grid grid-cols-2 gap-4">
      {aboutData.cards.map((card, index) => (
        <Card
          key={index}
          className={`lg:p-6 bg-gradient-to-br ${card.gradient} border-none shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105 ${card.span}`}
        >
          <CardHeader className="pb-2">
            <div className={`w-10 h-10 bg-gradient-to-r ${card.iconGradient} rounded-lg flex items-center justify-center mb-3`}>
              <card.icon className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-slate-900 dark:text-white text-md lg:text-lg">
              {card.title[locale as keyof typeof card.title]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 dark:text-slate-300 text-xs lg:text-md">
              {card.content[locale as keyof typeof card.content]}
            </p>
            {card.subContent && (
              <p className="text-slate-500 dark:text-slate-400 text-xs pt-1 lg:text-md">
                {card.subContent[locale as keyof typeof card.subContent]}
              </p>
            )}
            {card.technologies && (
              <div className="flex flex-wrap gap-2 mt-3 ">
                {card.technologies.map((tech) => (
                  <Badge key={tech} className="text-xs bg-primary/90">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
