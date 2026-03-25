import { clsx } from 'clsx';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { QuestionType } from '@/shared/api/generated';
import { MdDragIndicator } from 'react-icons/md';
import QuestionCardContent from './QuestionCardContent';
import type {
  FormBuilderViewModel,
  FormBuilderQuestionDraft,
  QuestionCardActions,
} from '../types';
import css from './SortableQuestionCard.module.css';

type Props = {
  question: FormBuilderQuestionDraft;
  index: number;
  titleError: string | null;
  optionsError: string | null;
  questionTypeLabels: FormBuilderViewModel['questionTypeLabels'];
  questionTypeOptions: FormBuilderViewModel['questionTypeOptions'];
  getQuestionTypeHint: (type: QuestionType) => string;
} & QuestionCardActions;

const SortableQuestionCard = ({
  question,
  index,
  titleError,
  optionsError,
  questionTypeLabels,
  questionTypeOptions,
  getQuestionTypeHint,
  onMoveQuestionUp,
  onMoveQuestionDown,
  onRemoveQuestion,
  onQuestionTitleChange,
  onQuestionTypeChange,
  onOptionChange,
  onRemoveOption,
  onAddOption,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: question.id });

  return (
    <article
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={clsx(css.questionCard, isDragging && css.questionCardDragging)}
    >
      <QuestionCardContent
        question={question}
        index={index}
        titleError={titleError}
        optionsError={optionsError}
        questionTypeLabels={questionTypeLabels}
        questionTypeOptions={questionTypeOptions}
        getQuestionTypeHint={getQuestionTypeHint}
        dragHandle={
          <button
            type="button"
            className={css.dragHandle}
            aria-label={`Drag question ${index + 1}`}
            {...attributes}
            {...listeners}
          >
            <MdDragIndicator size={20} />
          </button>
        }
        onMoveQuestionUp={onMoveQuestionUp}
        onMoveQuestionDown={onMoveQuestionDown}
        onRemoveQuestion={onRemoveQuestion}
        onQuestionTitleChange={onQuestionTitleChange}
        onQuestionTypeChange={onQuestionTypeChange}
        onOptionChange={onOptionChange}
        onRemoveOption={onRemoveOption}
        onAddOption={onAddOption}
      />
    </article>
  );
};

export default SortableQuestionCard;
