import { useState, useEffect } from 'react';
import {
  useSensors,
  useSensor,
  PointerSensor,
  DragEndEvent,
} from '@dnd-kit/core';
import { reorderItems } from '@/shared/lib/dnd/reorder';
import type { GetFormsQuery } from '@/shared/api/generated';

type HomeForm = GetFormsQuery['forms'][number];

export const useHomeDnd = (initialForms: HomeForm[]) => {
  const [forms, setForms] = useState<HomeForm[]>(initialForms);

  useEffect(() => {
    setForms(initialForms);
  }, [initialForms]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      setForms((prev) =>
        reorderItems(prev, active.id as string, over.id as string),
      );
    }
  };

  return { forms, sensors, handleDragEnd };
};
