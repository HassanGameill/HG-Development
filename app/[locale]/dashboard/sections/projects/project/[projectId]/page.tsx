import HeroForm from "@/components/Action-Interface/Admin/ActionUi/Hero/HeroForm/HeroForm";
import ProjectForm from "@/components/Action-Interface/Admin/ActionUi/Projects/ProjectForm";
import prisma from "@/lib/prismadb";

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectPage({ params }: PageProps) {
  // For new brand creation
    const categories = await prisma.categories.findMany();

  if ((await params).projectId === "new") {
    return (
      <div className="flex-col w-full ">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProjectForm initialData={null} categories={categories} />
        </div>
      </div>
    );
  }

  const project = await prisma.project.findUnique({
    where: {
      id: (await params).projectId,
    },
    include: {
      images: true,
      projectTechnology: true
    },
  });
  

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProjectForm initialData={project} categories={categories} />
      </div>
    </div>
  );
}
