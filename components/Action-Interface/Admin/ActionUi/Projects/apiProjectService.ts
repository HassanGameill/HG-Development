import { ProjectFormValues } from "@/validation/Sections/Project/projects";
import axios from "axios";



// ______ Cashing Concepts ________
export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  detail: (id: string) => [...projectKeys.all, "detail", id] as const,
};




// ___ Create Project Services _____
export const createProjectService = (data: ProjectFormValues) => 
    axios.post(`/api/sections/projects/project`, data)



// ___ Update Project Services _____
export const updateProjectService = (projectId:string, data: ProjectFormValues) => 
    axios.patch(`/api/sections/projects/project/${projectId}`, data)


// ___ Delete Project Services _____
export const deleteProjectService = (id:string) => 
    axios.delete(`/api/sections/projects/project/${id}`)




// ___ Re Order Project Services _____
export const reorderProjectService = (list: {id: string; position: number} []) => {
   return axios.put(`/api/sections/projects/project/reorder`, {list})

}



