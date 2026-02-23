import { CategoryFormValues } from "@/validation/Sections/Project/category";
import axios from "axios";



// ______ Cashing Concepts ________
export const categoryKeys = {
  all: ["projects"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  detail: (id: string) => [...categoryKeys.all, "detail", id] as const,
};




// ___ Create Categories Services _____
export const createCategoryService = (data: CategoryFormValues) => 
    axios.post(`/api/sections/projects/categories`, data)



// ___ Update Project Services _____
export const updateCategoryService = (id:string, data: CategoryFormValues) => 
    axios.patch(`/api/sections/projects/categories/${id}`, data)

// export const updateHero = (id: string, data: CategoryFormValues) =>
//   axios.patch(`${DOMAIN}/api/sections/projects/categories/${id}`, data);



// ___ Delete Project Services _____
export const deleteCategoryService = (id:string) => 
    axios.delete(`/api/sections/projects/categories/${id}`)




// ___ Re Order Project Services _____
export const reorderCategoryService = (list: {id: string; position: number} []) => {
   return axios.put(`/api/sections/projects/categories/reorder`, {list})

}



