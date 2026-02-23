import CategoryForm from "@/components/Action-Interface/Admin/ActionUi/Categories/CategoryForm";
import HeroForm from "@/components/Action-Interface/Admin/ActionUi/Hero/HeroForm/HeroForm";
import ProjectForm from "@/components/Action-Interface/Admin/ActionUi/Projects/ProjectForm";
import prisma from "@/lib/prismadb";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CategoryPage({ params }: PageProps) {
  // For new brand creation

  if ((await params).id === "new") {
    return (
      <div className="flex-col w-full ">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <CategoryForm initialData={null}  />
        </div>
      </div>
    );
  }

  const category = await prisma.categories.findUnique({
    where: {
      id: (await params).id,
    },
   
  });

  console.log("CAt", category)
  

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category}  />
      </div>
    </div>
  );
}
