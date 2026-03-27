import {
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';

import type { GetFormsQuery } from '@/shared/api/generated';
import { reorderItems } from '@/shared/lib/dnd/reorder';

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
