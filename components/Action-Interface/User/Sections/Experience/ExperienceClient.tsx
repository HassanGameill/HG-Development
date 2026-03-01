"use client";

import { TExperience } from "@/types/experienceType";
import ExperienceCard from "./ExperienceCard";
import { useGetExperience } from "./useExperience";
import ExperienceHeader from "./ExperienceHeader";

const ExperienceClient = () => {
  const { data, isLoading, error } = useGetExperience();

  console.log("Experience", data);

  if (isLoading) return <p>Loading skills...</p>;
  if (error) return <p>Failed to load skills</p>;
  return (
    <section className="py-20 px-6">
      <ExperienceHeader />

      <ExperienceCard experience={data as []} />
    </section>
  );
};

export default ExperienceClient;
