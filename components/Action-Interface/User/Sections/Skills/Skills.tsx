"use client";

import { TSkills } from "@/types/skillsType";
import SkillCategoryCard from "./SkillsCategoryCard";
import SkillsHeader from "./SkillsHeader";
import { useGetSkills } from "./useGetSkills";
import { useSkillsObserver } from "./useSkillsObserver";

export default function Skills() {
  const { ref, visible } = useSkillsObserver();
  const { data, isLoading, error } = useGetSkills(); // typed

  console.log("skills", data);

  if (isLoading) return <p>Loading skills...</p>;
  if (error) return <p>Failed to load skills</p>;

  return (
    <section ref={ref} id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SkillsHeader />

        <div className="grid md:grid-cols-2 gap-10 lg:mx-10">
          {data?.map((category: TSkills, i: number) => (
            <SkillCategoryCard
              key={category.id || i} // fallback if id is undefined
              category={category}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
