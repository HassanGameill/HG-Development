"use client";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import AlertModal from "@/components/common/Modals/alert-modal";
import HeroColumnType from "@/types/HeroColumnType";
import SearchInput from "./SearchInput";
import HeroDraggableItem from "./DraggableItem";
import DraggableItem from "./DraggableItem";
import { SortableItem, useListGroup } from "./useListGroup";

interface Props {
  items: SortableItem[];
  onReorder: (data: { id: string; position: number }[]) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const DraggableClient = ({
  items,
  onReorder,
  onEdit,
  onDelete,
}: Props) => {
  const {
    isMounted,
    search,
    setSearch,
    filteredList,
    onDragEnd,
    loading,
    open,
    setOpen,
    setSelectedId,
    handleDelete,
  } = useListGroup(items, onReorder, onDelete);

  if (!isMounted) return null;

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />

      <div className="space-y-6">
        <SearchInput value={search} onChange={setSearch} />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="heroList">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {filteredList.map((item, index) => (
                  <DraggableItem
                    key={item.id}
                    item={item}
                    index={index}
                    onEdit={onEdit}
                    onDelete={(id) => {
                      setSelectedId(id);
                      setOpen(true);
                    }}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default DraggableClient;
