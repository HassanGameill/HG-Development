import axios from "axios";
import { DOMAIN } from "@/lib/constants";
import { HeroFormValues } from "@/validation/Sections/heroSection";


export const heroKeys = {
  all: ["heroes"] as const,
  lists: () => [...heroKeys.all, "list"] as const,
  detail: (id: string) => [...heroKeys.all, "detail", id] as const,
};

export const createHero = (data: HeroFormValues) =>
  axios.post(`${DOMAIN}/api/sections/hero`, data);

export const updateHero = (id: string, data: HeroFormValues) =>
  axios.patch(`${DOMAIN}/api/sections/hero/${id}`, data);

export const deleteHero = (id: string) =>
  axios.delete(`${DOMAIN}/api/sections/hero/${id}`);


export const reorderHeroes = async (
  list: { id: string; position: number }[]
) => {
  return axios.put(`${DOMAIN}/api/sections/hero/reorder`, { list });
};