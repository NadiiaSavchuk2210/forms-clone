import { describe, expect, it } from 'vitest';

import { QuestionType } from '@/shared/api/generated';

import {
  addQuestion,
  addQuestionOption,
  formBuilderReducer,
  moveQuestionDown,
  moveQuestionUp,
  removeQuestion,
  removeQuestionOption,
  reorderQuestions,
  resetFormBuilder,
  updateQuestionOption,
  updateQuestionType,
} from './formBuilderSlice';

const createState = () => {
  const baseState = formBuilderReducer(undefined, { type: 'init' });
  const firstQuestionId = baseState.questions[0].id;

  let state = formBuilderReducer(
    baseState,
    updateQuestionType({ id: firstQuestionId, type: QuestionType.MultipleChoice }),
  );

  state = formBuilderReducer(state, addQuestion(QuestionType.Date));

  return state;
};

describe('formBuilderSlice', () => {
  it('creates choice questions with minimum options and keeps options when switching type', () => {
    const initialState = formBuilderReducer(undefined, { type: 'init' });
    const questionId = initialState.questions[0].id;

    const choiceState = formBuilderReducer(
      initialState,
      updateQuestionType({ id: questionId, type: QuestionType.MultipleChoice }),
    );

    expect(choiceState.questions[0].options).toEqual(['', '']);

    const textState = formBuilderReducer(
      choiceState,
      updateQuestionType({ id: questionId, type: QuestionType.Text }),
    );
    expect(textState.questions[0].options).toEqual([]);

    const restoredChoiceState = formBuilderReducer(
      textState,
      updateQuestionType({ id: questionId, type: QuestionType.Checkbox }),
    );
    expect(restoredChoiceState.questions[0].options).toEqual(['', '']);
  });

  it('adds, updates, and removes question options with the minimum-options guard', () => {
    const state = createState();
    const questionId = state.questions[0].id;

    let nextState = formBuilderReducer(state, addQuestionOption(questionId));
    expect(nextState.questions[0].options).toHaveLength(3);

    nextState = formBuilderReducer(
      nextState,
      updateQuestionOption({ id: questionId, optionIndex: 2, value: 'New option' }),
    );
    expect(nextState.questions[0].options[2]).toBe('New option');

    nextState = formBuilderReducer(
      nextState,
      removeQuestionOption({ id: questionId, optionIndex: 2 }),
    );
    expect(nextState.questions[0].options).toHaveLength(2);

    const guardedState = formBuilderReducer(
      nextState,
      removeQuestionOption({ id: questionId, optionIndex: 0 }),
    );
    expect(guardedState.questions[0].options).toHaveLength(2);
  });

  it('moves and reorders questions, and recreates a draft when the last one is removed', () => {
    const state = createState();
    const firstId = state.questions[0].id;
    const secondId = state.questions[1].id;

    const movedDown = formBuilderReducer(state, moveQuestionDown(firstId));
    expect(movedDown.questions.map(({ id }) => id)).toEqual([secondId, firstId]);

    const movedUp = formBuilderReducer(movedDown, moveQuestionUp(firstId));
    expect(movedUp.questions.map(({ id }) => id)).toEqual([firstId, secondId]);

    const reordered = formBuilderReducer(
      movedUp,
      reorderQuestions({ activeId: firstId, overId: secondId }),
    );
    expect(reordered.questions.map(({ id }) => id)).toEqual([secondId, firstId]);

    const afterFirstRemoval = formBuilderReducer(reordered, removeQuestion(secondId));
    const afterSecondRemoval = formBuilderReducer(
      afterFirstRemoval,
      removeQuestion(firstId),
    );

    expect(afterSecondRemoval.questions).toHaveLength(1);
    expect(afterSecondRemoval.questions[0].id).not.toBe(firstId);
    expect(afterSecondRemoval.questions[0].title).toBe('');
  });

  it('resets builder state to a clean draft', () => {
    const dirtyState = createState();
    const resetState = formBuilderReducer(dirtyState, resetFormBuilder());

    expect(resetState.title).toBe('');
    expect(resetState.description).toBe('');
    expect(resetState.questions).toHaveLength(1);
    expect(resetState.questions[0].type).toBe(QuestionType.Text);
  });
});
