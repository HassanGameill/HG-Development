import CategoryForm from "@/components/Action-Interface/Admin/ActionUi/Categories/CategoryForm";
import HeroForm from "@/components/Action-Interface/Admin/ActionUi/Hero/HeroForm/HeroForm";
import ProjectForm from "@/components/Action-Interface/Admin/ActionUi/Projects/ProjectForm";
import SkillsForm from "@/components/Action-Interface/Admin/ActionUi/Skills/SkillsForm";
import prisma from "@/lib/prismadb";

type PageProps = {
  params: Promise<{ skillsId: string }>;
};

export default async function SingleSkillsPage({ params }: PageProps) {
  // For new brand creation

  if ((await params).skillsId === "new") {
    return (
      <div className="flex-col w-full ">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <SkillsForm initialData={null} />
        </div>
      </div>
    );
  }

  const skills = await prisma.skills.findUnique({
    where: {
      id: (await params).skillsId,
    },

    include: {
      skillsItem: true,
    },
  });

  console.log("CAt", skills);

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SkillsForm initialData={skills} />
      </div>
    </div>
  );
}
