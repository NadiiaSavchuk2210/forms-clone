import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  MdDragIndicator,
  MdOutlineAssignment,
  MdOutlineAnalytics,
} from 'react-icons/md';
import Button from '@/shared/ui/Button/Button';
import { ROUTES } from '@/app/providers/router/config/routesConfig';
import type { GetFormsQuery } from '@/shared/api/generated';
import styles from './FormCard.module.css';

type HomeForm = GetFormsQuery['forms'][number];

interface FormCardProps {
  form: HomeForm;
}

const FormCard = ({ form }: FormCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: form.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 2 : 1,
  };
  const questionCount = form.questions.length;

  return (
    <li ref={setNodeRef} role="listitem" style={style} className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardContent}>
          <p className={styles.formMeta}>
            {questionCount} question{questionCount === 1 ? '' : 's'}
          </p>
          <h2 className={styles.formTitle}>{form.title}</h2>
          <p className={styles.formDescription}>
            {form.description || 'No description provided yet.'}
          </p>
        </div>

        <div className={styles.dragHandle} {...attributes} {...listeners}>
          <MdDragIndicator size={24} />
        </div>
      </div>

      <div className={styles.cardActions}>
        <Button as="link" href={ROUTES.FORM_FILL(form.id)}>
          <MdOutlineAssignment size={18} />
          View Form
        </Button>
        <Button
          as="link"
          href={ROUTES.FORM_RESPONSES(form.id)}
          variant="outline"
        >
          <MdOutlineAnalytics size={18} />
          View Responses
        </Button>
      </div>
    </li>
  );
};

export default FormCard;
