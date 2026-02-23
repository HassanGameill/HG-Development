import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createSkillsService, deleteSkillsService, reorderSkillsService, skillsKeys, updateSkillsService } from "./apiSkillsService";
import { SkillsFormValues } from "@/validation/Sections/skills";

// ____ Create Project Mutation _____
export const useCreateSkills = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSkillsService,
    onSuccess: () => {
      toast.success("Project created Successfully");
      queryClient.invalidateQueries({ queryKey: skillsKeys.lists() });
    },
    onError: (error) => {
      toast.error("Project are not available");
      axiosErrorHandler(error);
    },
  });
};

// ____ Update Project Mutation _____
export const useUpdateSkills = (skillsId: string) => 
  useMutation({
    mutationFn: (data: SkillsFormValues) => updateSkillsService(skillsId, data),
    onSuccess: () => toast.success("Skills updated Successfully"),
    onError: (error) => {
      toast.error("Skills is not available updated");
      axiosErrorHandler(error);
    },
  });


// ____ Delete Project Mutation _____
export const useDeleteSkills = () => {
  return useMutation({
    mutationFn: (skillsId: string) => deleteSkillsService(skillsId),

    onSuccess: () => {
      toast.success("Skills deleted successfully");
    },

    onError: (error) => {
      toast.error("Skills delete failed");
      axiosErrorHandler(error);
    },
  });
};


// ____ Re Order Project Mutation _____
export const useReorderSkills = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reorderSkillsService,
    onSuccess: () => {
      toast.success("skills order updated");
    },

    onError: (error) => {
      toast.error("Skills is not available updated");
      axiosErrorHandler(error);
      queryClient.invalidateQueries({ queryKey: skillsKeys.all });
    },
  });
};
