import type { FormQuestionType } from '@/entities/form/model';
import { isChoiceQuestionType } from '@/entities/form/model';
import Button from '@/shared/ui/Button';
import TextField from '@/shared/ui/TextField';

import QuestionTypeSelect from '../question-type-select';
import type {
  FormBuilderQuestionDraft,
  FormBuilderViewModel,
  QuestionCardActions,
} from '../types';

import css from './SortableQuestionCard.module.css';

interface Props extends QuestionCardActions {
  question: FormBuilderQuestionDraft;
  index: number;
  titleError: string | null;
  optionsError: string | null;
  questionTypeLabels: FormBuilderViewModel['questionTypeLabels'];
  questionTypeOptions: FormBuilderViewModel['questionTypeOptions'];
  getQuestionTypeHint: (type: FormQuestionType) => string;
  dragHandle: React.ReactNode;
}

const QuestionCardContent = ({
  question,
  index,
  titleError,
  optionsError,
  questionTypeLabels,
  questionTypeOptions,
  getQuestionTypeHint,
  dragHandle,
  onMoveQuestionUp,
  onMoveQuestionDown,
  onRemoveQuestion,
  onQuestionTitleChange,
  onQuestionTypeChange,
  onOptionChange,
  onRemoveOption,
  onAddOption,
}: Props) => {
  const questionId = question.id;
  const isChoiceQuestion = isChoiceQuestionType(question.type);
  const handleMoveQuestionUp = () => onMoveQuestionUp(questionId);
  const handleMoveQuestionDown = () => onMoveQuestionDown(questionId);
  const handleRemoveQuestion = () => onRemoveQuestion(questionId);
  const handleQuestionTitleChange = (value: string) =>
    onQuestionTitleChange(questionId, value);
  const handleQuestionTypeChange = (value: FormQuestionType) =>
    onQuestionTypeChange(questionId, value);
  const handleAddOption = () => onAddOption(questionId);
  const createOptionChangeHandler =
    (optionIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      onOptionChange(questionId, optionIndex, event.target.value);
    };
  const createRemoveOptionHandler = (optionIndex: number) => () => {
    onRemoveOption(questionId, optionIndex);
  };

  return (
    <>
      <header className={css.questionTop}>
        <div className={css.questionHeading}>
          {dragHandle}

          <h3 className={css.questionBadge}>
            Question {index + 1} • {questionTypeLabels[question.type]}
          </h3>
        </div>

        <div className={css.questionTools} aria-label={`Question ${index + 1} actions`}>
          <Button
            variant="outline"
            className={css.secondaryButton}
            onClick={handleMoveQuestionUp}
          >
            Move up
          </Button>
          <Button
            variant="outline"
            className={css.secondaryButton}
            onClick={handleMoveQuestionDown}
          >
            Move down
          </Button>
          <Button
            variant="outline"
            className={css.secondaryButton}
            onClick={handleRemoveQuestion}
          >
            Remove
          </Button>
        </div>
      </header>

      <div className={css.questionBody}>
        <TextField
          label="Question title"
          value={question.title}
          error={titleError}
          placeholder="What do you want to ask?"
          fieldClassName={css.field}
          inputClassName={css.textInput}
          onChange={handleQuestionTitleChange}
        />

        <div className={css.typeGrid}>
          <label className={css.fieldInline}>
            <span className={css.fieldLabel}>Answer type</span>
            <QuestionTypeSelect
              value={question.type}
              options={questionTypeOptions}
              onChange={handleQuestionTypeChange}
            />
          </label>
          <p className={css.typeHelp}>{getQuestionTypeHint(question.type)}</p>
        </div>

        {isChoiceQuestion && (
          <fieldset className={css.optionList}>
            <legend className={css.fieldLabel}>Options</legend>

            {question.options.map((option: string, optionIndex: number) => (
              <div key={optionIndex} className={css.optionRow}>
                <input
                  className={css.optionInput}
                  type="text"
                  value={option}
                  aria-label={`Option ${optionIndex + 1}`}
                  onChange={createOptionChangeHandler(optionIndex)}
                  placeholder={`Option ${optionIndex + 1}`}
                />

                <Button
                  variant="outline"
                  className={css.secondaryButton}
                  onClick={createRemoveOptionHandler(optionIndex)}
                >
                  Remove
                </Button>
              </div>
            ))}

            <div className={css.optionControls}>
              <Button
                variant="outline"
                className={css.secondaryButton}
                onClick={handleAddOption}
              >
                Add option
              </Button>
              <span className={css.muted}>Keep at least two filled options.</span>
            </div>

            {optionsError && <p className={css.errorText}>{optionsError}</p>}
          </fieldset>
        )}
      </div>
    </>
  );
};

export default QuestionCardContent;
