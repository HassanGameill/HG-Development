import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

interface SEOProps {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  keywordsEn?: string;
  keywordsAr?: string;
  path?: string; // "/courses", "/about", etc.
}

// const SITE_NAME = "Summit Courses";
const SITE_URL = "https://summitcourses.com";

export async function generateLocalizedMetadata({
  titleEn,
  titleAr,
  descriptionEn,
  descriptionAr,
  keywordsEn = "",
  keywordsAr = "",
  path = "",
}: SEOProps): Promise<Metadata> {
  const locale = await getLocale();
  const isEn = locale === "en";

  const title = isEn ? titleEn : titleAr;
  const description = isEn ? descriptionEn : descriptionAr;
  const keywords = isEn ? keywordsEn : keywordsAr;

  const SITE_NAME = isEn ? "Summit Courses" : "كورسات القمه";


  const url = `${SITE_URL}/${locale}${path}`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords,

    metadataBase: new URL(SITE_URL),

    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en${path}`,
        ar: `${SITE_URL}/ar${path}`,
      },
    },

    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: isEn ? "en_US" : "ar_EG",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },

  };
}
