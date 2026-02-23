



export type TSkillsItem = {
  name: string;
  title: string;
  level: number;
  imageUrl: string;
}


export type TSkills = {
  id?: string;
  imageUrl: string;
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  color: string;
  bgColor: string;
  position: number
  skillsItem: TSkillsItem[];
  createdAt?: string;
  updatedAt?: string;
}
