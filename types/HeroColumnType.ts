type HeroColumnType = {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descEn: string;
  descAr: string;
  heroImages: {
    id: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    heroId: string;
  }[];
  
  imageUrl?: string | null; // <-- FIXED
  createdAt: string;
};

export default HeroColumnType;
