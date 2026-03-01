export type ExperienceAchievement = {
  title: string;
  subtitle: string;
};

export type TExperience = {
  id?: string;
  position: number;
  title: string;
  subtitle: string;
  companyName: string;
  startPeriod: string;
  endPeriod: string;
  imageUrl: string;
  experienceAchievement: ExperienceAchievement[];
  isCurrent: boolean;
  createdAt?: string;
  updatedAt?: string;
};
