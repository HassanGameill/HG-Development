import { DOMAIN } from "@/lib/constants";
import { SkillsFormValues } from "@/validation/Sections/skills";
import axios from "axios";



// ______ Cashing Concepts ________
export const skillsKeys = {
  all: ["skills"] as const,
  lists: () => [...skillsKeys.all, "list"] as const,
  detail: (id: string) => [...skillsKeys.all, "detail", id] as const,
};




// ___ Create Project Services _____
export const createSkillsService = (data: SkillsFormValues) => 
    axios.post(`/api/sections/skills`, data)



// ___ Update Project Services _____
export const updateSkillsService = (skillsId:string, data: SkillsFormValues) => 
    axios.patch(`/api/sections/skills/${skillsId}`, data)


// ___ Delete Project Services _____
export const deleteSkillsService = (skillsId:string) => 
    axios.delete(`/api/sections/skills/${skillsId}`)




// ___ Re Order Project Services _____
export const reorderSkillsService = (list: {id: string; position: number} []) => {
   return axios.put(`/api/sections/skills/reorder`, {list})

}



