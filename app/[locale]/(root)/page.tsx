import Header from "@/components/Action-Interface/User/common/Header";
import { generateLocalizedMetadata } from "@/components/Action-Interface/User/common/SEO/generateLocalizedMetadata";
import AboutSection from "@/components/Action-Interface/User/Sections/About/About";
import Hero from "@/components/Action-Interface/User/Sections/HeroSection/Hero";
import ProjectsSection from "@/components/Action-Interface/User/Sections/Projects/ProjectSection";
import Skills from "@/components/Action-Interface/User/Sections/Skills/Skills";

export const generateMetadata = async () =>
  generateLocalizedMetadata({
    titleEn: "Development",
    titleAr: "Development",

    descriptionEn:
      "Let’s Build Your Next Web Project Together, Looking for a web developer? Let’s collaborate to build fast, scalable, and modern web applications.",
    descriptionAr:
      "دعنا نبني مشروعك الرقمي القادم معًا هل تبحث عن مطور ويب؟ دعنا نتعاون لبناء تطبيقات ويب حديثة وسريعة وقابلة للتوسع. ",

    keywordsEn:
      "hire web developer, full stack developer, freelance web developer, web development services, build web app, website development, modern web applications, next.js developer, react developer, scalable web solutions",

    keywordsAr:
      "توظيف مطور ويب, مطور ويب متكامل, خدمات تطوير المواقع, إنشاء تطبيق ويب, تصميم مواقع احترافية, تطوير تطبيقات ويب, مطور Next.js, مطور React, حلول ويب قابلة للتوسع",

    path: "/home",
  });

const HomePage = () => {
  return (
    <main className="">
      <Hero />
      <AboutSection />
      <Skills />
      <ProjectsSection />
    </main>
  );
};

export default HomePage;
