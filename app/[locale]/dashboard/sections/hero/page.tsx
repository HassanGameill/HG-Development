import HeroClient from "@/components/Action-Interface/Admin/ActionUi/Hero/HeroClient/HeroClient";
import { IDraggableType } from "@/components/Action-Interface/Admin/common/DraggableListGroup/draggableType";
import getCurrentUser from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import HeroColumnType from "@/types/HeroColumnType";
import { format } from "date-fns";


const HeroSectionPage = async () => {
  const currentUser = await getCurrentUser();
  const isManager =
    currentUser?.role === "OWNER" ||
    currentUser?.role === "MANAGER" ||
    currentUser?.role === "DEVELOPER";

  const heroSection = await prisma.hero.findMany({
    include: {
      heroImages: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  

  const formattedHero: IDraggableType[] = heroSection
    .map((item) => ({
      id: item.id,
    slug: item.slug,
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
            <HeroClient data={formattedHero} />
          </div>
        </div>
     
        <div className="px-8 text-blue-500 py-5">
          You Are Not A Manger To Showing Data
        </div>
     
    </>
  );
};

export default HeroSectionPage;
