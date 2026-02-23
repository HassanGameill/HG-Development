import HeroClient from "@/components/Action-Interface/Admin/ActionUi/Hero/HeroClient/HeroClient";
import ProjectClient from "@/components/Action-Interface/Admin/ActionUi/Projects/ProjectClient";
import { IDraggableType } from "@/components/Action-Interface/Admin/common/DraggableListGroup/draggableType";
import getCurrentUser from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import { format } from "date-fns";

const HeroSectionPage = async () => {
  const currentUser = await getCurrentUser();
  const isManager =
    currentUser?.role === "OWNER" ||
    currentUser?.role === "MANAGER" ||
    currentUser?.role === "DEVELOPER";

  const project = await prisma.project.findMany({
    include: {
      projectTechnology: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatted: IDraggableType[] = project
    .map((item) => ({
      id: item.id,
      titleEn: item.titleEn,
      titleAr: item.titleAr,
      imageUrl: item.imageUrl,
      position: Number(item.position),
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }))
    .sort((a, b) => a.position - b.position);

  return (
    <>
      <div className="flex-col w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProjectClient data={formatted} />
        </div>
      </div>

      <div className="px-8 text-blue-500 py-5">
        You Are Not A Manger To Showing Data
      </div>
    </>
  );
};

export default HeroSectionPage;
