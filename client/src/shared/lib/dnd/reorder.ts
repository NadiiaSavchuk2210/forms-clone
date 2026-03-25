import { arrayMove } from '@dnd-kit/sortable';

export const reorderItems = <T extends { id: string }>(
  items: T[],
  activeId: string,
  overId: string,
): T[] => {
  const oldIndex = items.findIndex((item) => item.id === activeId);
  const newIndex = items.findIndex((item) => item.id === overId);

  return arrayMove(items, oldIndex, newIndex);
};
