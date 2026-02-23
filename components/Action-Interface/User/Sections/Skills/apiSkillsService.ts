

import axios from "axios";
import { TSkills } from "@/types/skillsType";

export const getAllSkillsService = async (): Promise<TSkills[]> => {
  const { data } = await axios.get<TSkills[]>(
    `/api/sections/skills` // better than localhost hardcode

  );

  return data.sort((a, b) => a.position - b.position);
};
