
import SocialLinks from '@/components/common/SocialLinks/SocialLinks';
import { useLocale } from 'next-intl';
import AboutHeader from './AboutHeader';
import AboutDescription from './AboutDescription';
import AboutStats from './AboutStats';
import AboutCards from './AboutCards';

const AboutSection = () => {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';

  return (
    <section id="about" className="py-20 px-6 bg-white dark:bg-slate-800 relative" dir={dir}>
      <div className="container mx-auto max-w-6xl">
        <AboutHeader />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <AboutDescription />
            <AboutStats />
            <div className="flex items-center justify-center">
              <SocialLinks />
            </div>
          </div>
          <div className="relative">
            <AboutCards />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
