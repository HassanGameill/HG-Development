"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { DropResult } from "@hello-pangea/dnd";
import HeroColumnType from "@/types/HeroColumnType";

export interface SortableItem {
  id: string;
  imageUrl: string;
  titleEn?: string;
  titleAr?: string;
  nameEn?: string;
  nameAr?: string;
}

export const useListGroup = (
  items: SortableItem[],
  onReorder: (data: { id: string; position: number }[]) => void,
  onDelete?: (id: string) => Promise<void> | void
) => {
  const [list, setList] = useState<SortableItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);
  useEffect(() => setList(items), [items]);

  const handleDelete = useCallback(async () => {
    if (!selectedId || !onDelete) return;
    try {
      setLoading(true);
      await onDelete(selectedId);
    } finally {
      setLoading(false);
      setOpen(false);
      setSelectedId(null);
    }
  }, [selectedId, onDelete]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const reordered = [...list];
      const [moved] = reordered.splice(result.source.index, 1);
      reordered.splice(result.destination.index, 0, moved);

      setList(reordered);
      onReorder(
        reordered.map((item, index) => ({
          id: item.id,
          position: index,
        }))
      );
    },
    [list, onReorder]
  );

  const filteredList = useMemo(() => {
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(
      (item) =>
        item.titleEn?.toLowerCase().includes(q) ||
        item.titleAr?.toLowerCase().includes(q)
    );
  }, [list, search]);

  return {
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
  };
};
