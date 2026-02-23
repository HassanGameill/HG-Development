import axios from "axios";
import { TProject } from "@/types/projects/projectType";
import { TCreateCategories } from "@/types/projects/projectCategoryType";

export const getAllProjectsService = async (): Promise<TProject[]> => {
  const { data } = await axios.get<TProject[]>(
    "/api/sections/projects/project" // better than localhost hardcode
  );

  return data.sort((a, b) => a.position - b.position);
};




export const getSingleProjectService = async (id: string): Promise<TProject[]> => {
  const { data } = await axios.get<TProject[]>(
    `/api/sections/projects/project/${id}` // better than localhost hardcode
  );

  return data.sort((a, b) => a.position - b.position);
};





export const getProjectCategoryService = async (): Promise<TCreateCategories[]> => {
  const { data } = await axios.get<TCreateCategories[]>(
    `/api/sections/projects/categories` // better than localhost hardcode
  );

  return data.sort((a, b) => a.position - b.position);
};
