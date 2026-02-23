import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import {
  createHero,
  deleteHero,
  heroKeys,
  reorderHeroes,
  updateHero,
} from "./heroApi";
import { HeroFormValues } from "@/validation/Sections/heroSection";

export const useCreateHero = () => {
  const queryClient = useQueryClient(); // ✅ inside the hook

  return useMutation({
    mutationFn: createHero,
    onSuccess: () => {
      toast.success("Hero created successfully");
      queryClient.invalidateQueries({ queryKey: heroKeys.lists() });
    },

    onError: (error) => {
      toast.error("You are not avalable heroes");
      axiosErrorHandler(error);
    },
  });
};

export const useUpdateHero = (id: string) =>
  useMutation({
    mutationFn: (data: HeroFormValues) => updateHero(id, data),
    onSuccess: () => toast.success("Hero updated successfully"),

    onError: (error) => {
      toast.error("You are not avalable heroes");
      axiosErrorHandler(error);
    },
  });

export const useDeleteHero = () => {
  return useMutation({
    mutationFn: (id: string) => deleteHero(id), // id passed when mutate is called
    onSuccess: () => toast.success("Hero deleted successfully"),
    onError: () =>
      toast.error("Please remove related dependencies before deleting."),
  });
};



// Reorder Heroes
export const useReorderHero = () => {
  const queryClient = useQueryClient(); // ✅ inside the hook

  return useMutation({
    mutationFn: reorderHeroes,
    onSuccess: () => {
      toast.success("Hero order updated");
    },
    onError: (error) => {
      toast.error("Failed to reorder heroes");
      axiosErrorHandler(error);
      queryClient.invalidateQueries({ queryKey: heroKeys.all });
    },
  });
};
