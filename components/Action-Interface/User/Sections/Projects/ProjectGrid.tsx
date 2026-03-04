// components/projects/ProjectsGrid.tsx
"use client";

import SliderGroupList from "@/components/LogicList/SliderGroupList";
import ProjectCard from "./ProjectCard";
import { useGetProjectCategory, useGetProjects } from "./useGetProject";
import { TProject } from "@/types/projects/projectType";
import CategoryCard from "./Categories/CategoryCard";
import { TCreateCategories } from "@/types/projects/projectCategoryType";
import { useState } from "react";

export default function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<
    number | string | null
  >(null);
  const { data, isLoading, error } = useGetProjects();
  const {
    data: catData,
    isLoading: catIsLoading,
    error: catIsError,
  } = useGetProjectCategory();

  if (isLoading || catIsLoading) return <p>Loading skills...</p>;
  if (error || catIsError) return <p>Failed to load skills</p>;

  const handleSelectCategory = (catId: number | string) => {
    if (selectedCategory === catId) setSelectedCategory(null);
    else setSelectedCategory(catId);
  };

  const categoryList = (item: TCreateCategories) => (
    <CategoryCard
      key={item.id}
      categoryItem={item}
      selectedCategory={selectedCategory}
      onSelect={handleSelectCategory}
    />
  );

  // Filter products by category
  const filteredProducts =
    selectedCategory === null
      ? data
      : data?.filter((p) => p.categoriesId === selectedCategory);

  const ProjectsList = (item: TProject) => (
    <ProjectCard key={item.id} project={item} />
  );

  return (
    <section className="text-center  ">
      <div className="container flex flex-col gap-12 ">
        <div className="bg-slate-200 dark:bg-slate-800 rounded-xl">
          <SliderGroupList
            records={catData}
            renderItem={categoryList}
            smallNumber={3}
            bgScreen={5}
            emptyMessage="There is no category"
          />
        </div>

        <div className="">
          <SliderGroupList
          records={filteredProducts?.slice(0,4)}
          renderItem={ProjectsList}
          smallNumber={1}
          bgScreen={3}
          emptyMessage="There is no category"
        />

        <SliderGroupList
          records={filteredProducts?.slice(4, 8)}
          renderItem={ProjectsList}
          smallNumber={1}
          bgScreen={3}
          emptyMessage=""
        />
        </div>

        
      </div>
    </section>
  );
}
