import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import type { GetFormsQuery } from '@/shared/api/generated';

import FormCard from '../../entities/form/ui/FormCard/FormCard';

import css from './FormsList.module.css';

type HomeForm = GetFormsQuery['forms'][number];

interface Props {
  forms: HomeForm[];
}

const FormList = ({ forms }: Props) => {
  return (
    <ul className={css.formsList} role="list">
      <SortableContext items={forms} strategy={rectSortingStrategy}>
        {forms.map((form) => (
          <FormCard key={form.id} form={form} />
        ))}
      </SortableContext>
    </ul>
  );
};

export default FormList;
