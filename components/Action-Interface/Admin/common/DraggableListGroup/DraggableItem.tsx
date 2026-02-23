"use client";
import { Draggable } from "@hello-pangea/dnd";
import { Grip, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SortableItem } from "./useListGroup";

interface Props {
  item: SortableItem;
  index: number;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const DraggableItem = ({ item, index, onEdit, onDelete }: Props) => (
  <Draggable draggableId={item.id} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        className={cn(
          "flex items-center justify-between rounded-xl border bg-card p-4 my-4",
          snapshot.isDragging && "bg-accent/10"
        )}
      >
        <div {...provided.dragHandleProps} className="cursor-grab p-2">
          <Grip className="w-4 h-4" />
        </div>

        <div className="flex items-center gap-3 flex-1 px-3">
          <div className="relative w-14 h-14 overflow-hidden rounded-lg border">
            <Image
              src={item.imageUrl || "/placeholder.svg"}
              alt={item.titleEn || "QR"}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{item.nameEn}</p>
            {item.titleAr && (
              <p className="text-xs text-muted-foreground">{item.titleEn}</p>
            )}
          </div>
        </div>

        <div className="flex gap-1">
          {onEdit && (
            <Button size="icon" variant="ghost" onClick={() => onEdit(item.id)}>
              <Pencil className="w-4 h-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(item.id)}
            >
              <Trash className="w-4 h-4 text-destructive" />
            </Button>
          )}
        </div>
      </div>
    )}
  </Draggable>
);

export default DraggableItem;
