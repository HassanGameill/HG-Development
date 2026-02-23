import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { categoryKeys, createCategoryService, deleteCategoryService, reorderCategoryService, updateCategoryService } from "./apiCategoriesService";
import { CategoryFormValues } from "@/validation/Sections/Project/category";

// ____ Create Project Mutation _____
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategoryService,
    onSuccess: () => {
      toast.success("Project created Successfully");
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
    onError: (error) => {
      toast.error("Project are not available");
      axiosErrorHandler(error);
    },
  });
};

// ____ Update Project Mutation _____
// export const useUpdateCategory = (id: string) => 
//   useMutation({
//     mutationFn: (data: CategoryFormValues) => updateCategoryService(id, data),
//     onSuccess: () => toast.success("Category updated Successfully"),
//     onError: (error) => {
//       toast.error("project is not available updated");
//       console.log("CATERRORR", error)
//       axiosErrorHandler(error);
//     },
//   });


  
  export const useUpdateCategory = (id: string) =>
    useMutation({
      mutationFn: (data: CategoryFormValues) => updateCategoryService(id, data),
      onSuccess: () => toast.success("Category updated successfully"),
  
      onError: (error) => {
        toast.error("You are not avalable heroes");
        axiosErrorHandler(error);
      },
    });
  

// ____ Delete Project Mutation _____
export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (id: string) => deleteCategoryService(id),

    onSuccess: () => {
      toast.success("Project deleted successfully");
    },

    onError: (error) => {
      toast.error("Project delete failed");
      axiosErrorHandler(error);
    },
  });
};


// ____ Re Order Project Mutation _____
export const useReorderCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reorderCategoryService,
    onSuccess: () => {
      toast.success("Project order updated");
    },

    onError: (error) => {
      toast.error("project is not available updated");
      axiosErrorHandler(error);
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
};
