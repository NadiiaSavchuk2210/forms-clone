import { useMemo, useState } from 'react';
import { clsx } from 'clsx';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  type DragStartEvent,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { MdDragIndicator } from 'react-icons/md';
import SortableQuestionCard from '../sortable-question-card';
import QuestionCardContent from '../sortable-question-card/QuestionCardContent';
import type { FormBuilderQuestionsModel, QuestionCardActions } from '../types';
import css from './FormBuilderQuestions.module.css';
import cardCss from '../sortable-question-card/SortableQuestionCard.module.css';

interface Props {
  model: FormBuilderQuestionsModel;
  actions: QuestionCardActions;
}

const FormBuilderQuestions = ({ model, actions }: Props) => {
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [activeQuestionWidth, setActiveQuestionWidth] = useState<number | null>(
    null,
  );
  const {
    sensors,
    questions,
    questionTypeLabels,
    questionTypeOptions,
    getQuestionTypeHint,
    getQuestionTitleError,
    getQuestionOptionsError,
    onDragEnd,
  } = model;
  const activeQuestion = useMemo(
    () => questions.find((question) => question.id === activeQuestionId) ?? null,
    [activeQuestionId, questions],
  );
  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveQuestionId(String(active.id));
    setActiveQuestionWidth(active.rect.current.initial?.width ?? null);
  };
  const handleDragEnd = (event: Parameters<typeof onDragEnd>[0]) => {
    onDragEnd(event);
    setActiveQuestionId(null);
    setActiveQuestionWidth(null);
  };
  const handleDragCancel = () => {
    setActiveQuestionId(null);
    setActiveQuestionWidth(null);
  };

  return (
    <section aria-labelledby="form-builder-questions-title">
      <h2 id="form-builder-questions-title" className="visually-hidden">
        Form questions
      </h2>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={questions.map((question) => question.id)}
          strategy={verticalListSortingStrategy}
        >
          <ol className={css.questionList}>
            {questions.map((question, index) => (
              <li key={question.id} className={css.questionItem}>
                <SortableQuestionCard
                  question={question}
                  index={index}
                  questionTypeLabels={questionTypeLabels}
                  questionTypeOptions={questionTypeOptions}
                  getQuestionTypeHint={getQuestionTypeHint}
                  titleError={getQuestionTitleError(question.id)}
                  optionsError={getQuestionOptionsError(question.id)}
                  {...actions}
                />
              </li>
            ))}
          </ol>
        </SortableContext>

        <DragOverlay dropAnimation={null}>
          {activeQuestion && (
            <article
              className={clsx(
                cardCss.questionCard,
                cardCss.questionCardDragging,
                cardCss.questionCardOverlay,
              )}
              style={{ width: activeQuestionWidth ?? undefined }}
            >
              <QuestionCardContent
                question={activeQuestion}
                index={questions.findIndex((item) => item.id === activeQuestion.id)}
                titleError={getQuestionTitleError(activeQuestion.id)}
                optionsError={getQuestionOptionsError(activeQuestion.id)}
                questionTypeLabels={questionTypeLabels}
                questionTypeOptions={questionTypeOptions}
                getQuestionTypeHint={getQuestionTypeHint}
                dragHandle={
                  <span
                    className={clsx(cardCss.dragHandle, cardCss.dragHandleStatic)}
                    aria-hidden="true"
                  >
                    <MdDragIndicator size={20} />
                  </span>
                }
                {...actions}
              />
            </article>
          )}
        </DragOverlay>
      </DndContext>
    </section>
  );
};

export default FormBuilderQuestions;
