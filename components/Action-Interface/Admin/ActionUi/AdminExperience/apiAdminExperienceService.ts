import { ExperienceFormValues } from "@/validation/Sections/experience";
import axios from "axios";



// ______ Cashing Concepts ________
export const experienceKeys = {
  all: ["experience"] as const,
  lists: () => [...experienceKeys.all, "list"] as const,
  detail: (id: string) => [...experienceKeys.all, "detail", id] as const,
};




// ___ Create Experience Services _____
export const createExperienceService = (data: ExperienceFormValues) => 
    axios.post(`/api/sections/experience`, data)



// ___ Update Project Services _____
export const updateExperienceService = (id:string, data: ExperienceFormValues) => 
    axios.patch(`/api/sections/experience/${id}`, data)


// ___ Delete Project Services _____
export const deleteExperienceService = (id:string) => 
    axios.delete(`/api/sections/experience/${id}`)




// ___ Re Order Project Services _____
export const reorderExperienceService = (list: {id: string; position: number} []) => {
   return axios.put(`/api/sections/experience/reorder`, {list});
}





