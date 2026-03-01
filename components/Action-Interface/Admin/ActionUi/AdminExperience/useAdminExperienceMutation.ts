import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createExperienceService, deleteExperienceService, experienceKeys, reorderExperienceService, updateExperienceService } from "./apiAdminExperienceService";
import { ExperienceFormValues } from "@/validation/Sections/experience";

// ____ Create Project Mutation _____
export const useCreateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExperienceService,
    onSuccess: () => {
      toast.success("Experience created Successfully");
      queryClient.invalidateQueries({ queryKey: experienceKeys.lists() });
    },
    onError: (error) => {
      toast.error("Experience are not available");
      axiosErrorHandler(error);
    },
  });
};

// ____ Update Project Mutation _____
export const useUpdateExperience = (id: string) => 
  useMutation({
    mutationFn: (data: ExperienceFormValues) => updateExperienceService(id, data),
    onSuccess: () => toast.success("Experience updated Successfully"),
    onError: (error) => {
      toast.error("Experience is not available updated");
      axiosErrorHandler(error);
    },
  });


// ____ Delete Project Mutation _____
export const useDeleteExperience = () => {
  return useMutation({
    mutationFn: (id: string) => deleteExperienceService(id),

    onSuccess: () => {
      toast.success("Experience deleted successfully");
    },

    onError: (error) => {
      toast.error("Experience delete failed");
      axiosErrorHandler(error);
    },
  });
};


// ____ Re Order Project Mutation _____
export const useReorderExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reorderExperienceService,
    onSuccess: () => {
      toast.success("Experience order updated");
    },
    onError: (error) => {
      toast.error("Experience is not available updated");
      axiosErrorHandler(error);
      queryClient.invalidateQueries({ queryKey: experienceKeys.all });
    },
  });
};



// ____ Re Order Project Mutation _____
export const useReorderAchievementExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reorderExperienceService,
    onSuccess: () => {
      toast.success("Experience order updated");
    },
    onError: (error) => {
      toast.error("project is not available updated");
      axiosErrorHandler(error);
      queryClient.invalidateQueries({ queryKey: experienceKeys.all });
    },
  });
};

