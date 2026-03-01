

import axios from "axios";
import { TExperience } from "@/types/experienceType";

export const getExperienceService = async (): Promise<TExperience[]> => {
  const { data } = await axios.get<TExperience[]>(
    `/api/sections/experience` 
  );

  return data.sort((a, b) => a.position - b.position);
};
