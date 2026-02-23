import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createProjectService,
  deleteProjectService,
  projectKeys,
  reorderProjectService,
  updateProjectService,
} from "./apiProjectService";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { ProjectFormValues } from "@/validation/Sections/Project/projects";

// ____ Create Project Mutation _____
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProjectService,
    onSuccess: () => {
      toast.success("Project created Successfully");
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
    onError: (error) => {
      toast.error("Project are not available");
      axiosErrorHandler(error);
    },
  });
};

// ____ Update Project Mutation _____
export const useUpdateProject = (projectId: string) => 
  useMutation({
    mutationFn: (data: ProjectFormValues) => updateProjectService(projectId, data),
    onSuccess: () => toast.success("Project updated Successfully"),
    onError: (error) => {
      toast.error("project is not available updated");
      axiosErrorHandler(error);
    },
  });


// ____ Delete Project Mutation _____
export const useDeleteProject = () => {
  return useMutation({
    mutationFn: (id: string) => deleteProjectService(id),

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
export const useReorderProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reorderProjectService,
    onSuccess: () => {
      toast.success("Project order updated");
    },

    onError: (error) => {
      toast.error("project is not available updated");
      axiosErrorHandler(error);
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
};
