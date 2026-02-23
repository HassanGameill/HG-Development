"use client";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import Heading from "@/components/common/Headings/Heading";
import DraggableClient from "../../common/DraggableListGroup/DraggableClient";
import { IDraggableType } from "../../common/DraggableListGroup/draggableType";
import { useDeleteSkills, useReorderSkills } from "./useSkillsMutation";

export interface HeroClientProps {
  data: IDraggableType[];
}

const SkillsClient: React.FC<HeroClientProps> = ({ data }) => {
  const router = useRouter();

  const reorder = useReorderSkills();
  const handleReorder = async (list: { id: string; position: number }[]) => {
    await reorder.mutateAsync(list);
  };

  // Handle edit click
  const handleEdit = (skillsId: string) => {
    router.push(`/dashboard/sections/skills/${skillsId}`);
  };

  // Call the hook at the top level
  const { mutate: deleteHeroMutate } = useDeleteSkills();

  const onDelete = (id: string) => {
    deleteHeroMutate(id, {
      onSuccess: () => {
        router.refresh(); // refresh after deletion
      },
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Skills (${data.length})`}
          description="Mange Skills for your store "
        />

        <Button
          className=""
          onClick={() => router.push(`/dashboard/sections/skills/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator className="bg-slate-300" />

      {/* List (draggable) */}
      <DraggableClient
        items={data}
        onEdit={handleEdit}
        onDelete={onDelete}
        onReorder={handleReorder}
      />
      <Separator className="bg-slate-300" />
    </>
  );
};

export default SkillsClient;
