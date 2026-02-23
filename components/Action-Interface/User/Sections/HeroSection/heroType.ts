


export type THero = {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descEn: string;
  descAr: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroImages: { url: any | null }[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bgOne?: any | null; // <-- FIXED
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bgTwo?: any | null; // If exist
};
