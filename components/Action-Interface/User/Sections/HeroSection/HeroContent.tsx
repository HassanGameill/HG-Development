import { LightbulbIcon, Sparkles } from "lucide-react";
import { THero } from "./heroType";
import { getLocale } from "next-intl/server";

interface HeroCardProps {
  heroContent: THero;
}

const HeroContent = async ({ heroContent }: HeroCardProps) => {
  const { titleEn, titleAr, subtitleEn, subtitleAr, descEn, descAr } =
    heroContent;

  const locale = await getLocale();

  const title = locale === "en" ? titleEn : titleAr;
  const subtitle = locale === "en" ? subtitleEn : subtitleAr;
  const desc = locale === "en" ? descEn : descAr;

  return (
    <div className="flex flex-col justify-center lg:justify-start">
      <div className="space-y-6 ">
        <div className="inline-flex text-shadow-xs items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full animate-bounce">
          {/* <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Available for new opportunities</span> */}
          <LightbulbIcon className="h-4 w-4 mx-2 text-blue-600 dark:text-yellow-300" />

          <span className="text-[10px] xs:text-xs lg:text-sm font-medium text-blue-600 dark:text-blue-400">
            {locale === "en"
              ? "Take A Opportunity To Work With Us Now"
              : "اغتنم فرصة للعمل معنا الآن"}
          </span>
          <Sparkles className="h-4 w-4 mx-2 dark:text-yellow-300 text-blue-600" />
        </div>
      </div>

      <h1 className="text-lg md:text-4xl   block bg-gradient-to-r from-primary via-purple-600 to-teal-600 bg-clip-text text-transparent animate-slide-up delay-200 font-bold lg:mb-4 drop-shadow-lg">
        {title}
      </h1>
      <h1 className="text-lg md:text-4xl text-shadow-sm text-slate-800 dark:text-white leading-8 text-salte-800 font-bold mb-2 lg:mb-4 drop-shadow-lg">
        {subtitle}
      </h1>
      <p className="text-md md:text-xl mb-8 text-slate-600 dark:text-gray-200 drop-shadow-md">
        {desc}
      </p>
    </div>
  );
};

export default HeroContent;
