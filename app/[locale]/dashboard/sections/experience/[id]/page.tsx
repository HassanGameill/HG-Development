import ExperienceAdminForm from "@/components/Action-Interface/Admin/ActionUi/AdminExperience/ExperienceAdminForm";
import prisma from "@/lib/prismadb";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: PageProps) {
  // For new brand creation

  if ((await params).id === "new") {
    return (
      <div className="flex-col w-full ">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ExperienceAdminForm initialData={null} />
        </div>
      </div>
    );
  }

  const experience = await prisma.experience.findUnique({
    where: {
      id: (await params).id,
    },
    include: {
      experienceAchievement: true,
    },
  });

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ExperienceAdminForm initialData={experience} />
      </div>
    </div>
  );
}
