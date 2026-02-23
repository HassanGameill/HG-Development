import CategoryClient from "@/components/Action-Interface/Admin/ActionUi/Categories/CategoryClient";
import { IDraggableType } from "@/components/Action-Interface/Admin/common/DraggableListGroup/draggableType";
import getCurrentUser from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import { format } from "date-fns";

const CategoriesPage = async () => {
  const currentUser = await getCurrentUser();
  const isManager =
    currentUser?.role === "OWNER" ||
    currentUser?.role === "MANAGER" ||
    currentUser?.role === "DEVELOPER";

  const categories = await prisma.categories.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatted: IDraggableType[] = categories
    .map((item) => ({
      id: item.id,
      nameEn: item.nameEn,
      nameAr: item.nameEn,
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
          <CategoryClient data={formatted} />
        </div>
      </div>

      <div className="px-8 text-blue-500 py-5">
        You Are Not A Manger To Showing Data
      </div>
    </>
  );
};

export default CategoriesPage;
