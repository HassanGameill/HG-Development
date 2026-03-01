import { THero } from "./heroType";
import imageOne from "@/public/images/Hassan-1.jpg"


  // ? "مطور Full Stack متخصص في بناء تطبيقات ويب وشاملة من البداية للنهاية. هل تحتاج نظامًا لإدارة أعمالك؟ موقع ويب تفاعلي؟ أو حل برمجي مخصص؟ دعنا نناقش مشروعك!"
  // : "Full Stack Developer specializing in end-to-end web applications. Need a business management system? Interactive website? Or custom software solution? Let's discuss your project!";



export const HeroData: THero[] = [
  {
    id: "1",
    slug: "ai-summit-2026",
   titleEn: "Full Stack Software Engineer",
    titleAr: "Full Stack Software Engineer",
    subtitleEn: "Building Modern, Scalable Web APP & Mobile Applications",
    subtitleAr: "بناء تطوير تطبيقات الويب والجوال الحديثه القابلة للتوسع",
    descEn: "Full Stack Developer specializing in end-to-end web applications. Need a business management system? Interactive website? Or custom software solution? Let's discuss your project!",
    descAr: "مطور Full Stack متخصص في بناء تطبيقات ويب وشاملة من البداية للنهاية. هل تحتاج نظامًا لإدارة أعمالك؟ موقع ويب تفاعلي؟ أو حل برمجي مخصص؟ دعنا نناقش مشروعك!",
    heroImages: [
      { url: imageOne },
      { url: imageOne },
    ],
    bgOne: { url: imageOne },
    bgTwo: { url: imageOne },
  },
//   {
//     id: "2",
//     slug: "web-dev-summit-2026",
//     titleEn: "Web Dev Summit 2026",
//     titleAr: "قمة تطوير الويب 2026",
//     subtitleEn: "Master modern web technologies",
//     subtitleAr: "إتقان أحدث تقنيات تطوير الويب",
//     descEn: "Connect with developers worldwide and enhance your web development skills.",
//     descAr: "تواصل مع المطورين حول العالم وطور مهاراتك في تطوير الويب.",
//     heroImages: [
//       { url: "/images/web-summit/hero1.jpg" },
//       { url: "/images/web-summit/hero2.jpg" },
//     ],
//     bgOne: { url: "/images/web-summit/bg1.png" },
//     bgTwo: null,
//   },
//   {
//     id: "3",
//     slug: "design-summit-2026",
//     titleEn: "Design Summit 2026",
//     titleAr: "قمة التصميم 2026",
//     subtitleEn: "Innovate in UX/UI design",
//     subtitleAr: "ابتكر في تصميم تجربة المستخدم وواجهة المستخدم",
//     descEn: "Learn from top designers and discover the latest trends in UX/UI design.",
//     descAr: "تعلم من كبار المصممين واكتشف أحدث الاتجاهات في تصميم تجربة المستخدم وواجهة المستخدم.",
//     heroImages: [
//       { url: "/images/design-summit/hero1.jpg" },
//     ],
//     bgOne: null,
//     bgTwo: null,
//   },
];
