import Header from '@/components/Action-Interface/User/common/Header';
import { generateLocalizedMetadata } from '@/components/Action-Interface/User/common/SEO/generateLocalizedMetadata';
import AboutSection from '@/components/Action-Interface/User/Sections/About/About';
import Hero from '@/components/Action-Interface/User/Sections/HeroSection/Hero';
import ProjectsSection from '@/components/Action-Interface/User/Sections/Projects/ProjectSection';
import Skills from '@/components/Action-Interface/User/Sections/Skills/Skills';



export const generateMetadata = async () =>
  generateLocalizedMetadata({
    titleEn: "Summit Courses Store – Learn. Grow. Succeed.",
    titleAr: "متجر قمة الدورات – تعلم. تطور. نجاح",

    descriptionEn:
      "Browse and enroll in high-quality online courses designed to boost your professional skills.",
    descriptionAr:
      "تصفح وسجّل في دورات أونلاين عالية الجودة لتطوير مهاراتك المهنية.",

    keywordsEn:
      "online courses store, buy courses, e-learning platform, summit courses",
    keywordsAr:
      "متجر الدورات, شراء الدورات, منصة تعليم إلكتروني, قمة الدورات",
      

    path: "/home",
  });


const HomePage = () => {


  return (
    <main className=''>
        <Hero />
        <AboutSection />
        <Skills />
        <ProjectsSection />
    </main>
  )
}

export default HomePage