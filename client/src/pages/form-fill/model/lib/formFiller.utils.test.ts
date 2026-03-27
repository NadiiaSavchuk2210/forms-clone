import { describe, expect, it, vi } from 'vitest';

import { QuestionType, type GetFormQuery } from '@/shared/api/generated';

import {
  buildAnswerInput,
  createFormFillerActions,
  createQuestionFieldActions,
  createQuestionsModel,
  setSingleAnswerValue,
  syncAnswersWithQuestions,
  toggleAnswerOption,
} from './formFiller.utils';

type FormQuestion = NonNullable<GetFormQuery['form']>['questions'][number];

const questions: FormQuestion[] = [
  {
    __typename: 'Question',
    id: 'single',
    title: 'Choose one',
    type: QuestionType.MultipleChoice,
    options: ['A', 'B'],
  },
  {
    __typename: 'Question',
    id: 'multi',
    title: 'Choose many',
    type: QuestionType.Checkbox,
    options: ['X', 'Y'],
  },
  {
    __typename: 'Question',
    id: 'text',
    title: 'Comment',
    type: QuestionType.Text,
    options: [],
  },
];

describe('formFiller.utils', () => {
  it('syncs answers with current questions and normalizes choice values', () => {
    expect(
      syncAnswersWithQuestions(questions, {
        single: ['Z', 'B'],
        multi: ['X', 'X', 'invalid'],
        text: ['first', 'second'],
        missing: ['stale'],
      }),
    ).toEqual({
      single: ['B'],
      multi: ['X'],
      text: ['first'],
    });
  });

  it('builds answer input for all questions and preserves missing answers as empty arrays', () => {
    expect(
      buildAnswerInput(questions, {
        single: ['A'],
        multi: ['X'],
      }),
    ).toEqual([
      { questionId: 'single', value: ['A'] },
      { questionId: 'multi', value: ['X'] },
      { questionId: 'text', value: [] },
    ]);
  });

  it('updates single answers and toggles checkbox options', () => {
    const singleValue = setSingleAnswerValue({}, 'text', 'hello');
    expect(singleValue).toEqual({ text: ['hello'] });
    expect(setSingleAnswerValue(singleValue, 'text', '')).toEqual({ text: [] });

    const toggledOnce = toggleAnswerOption({}, 'multi', 'X');
    expect(toggledOnce).toEqual({ multi: ['X'] });
    expect(toggleAnswerOption(toggledOnce, 'multi', 'X')).toEqual({ multi: [] });
  });

  it('creates field and submit action models with stable callbacks', () => {
    const onSetSingleValue = vi.fn();
    const onToggleCheckboxValue = vi.fn();
    const onSubmit = vi.fn();
    const onReset = vi.fn();

    const fieldActions = createQuestionFieldActions(
      onSetSingleValue,
      onToggleCheckboxValue,
    );
    const actions = createFormFillerActions(fieldActions, onSubmit, onReset);
    const questionsModel = createQuestionsModel(
      questions,
      { text: ['hello'] },
      () => null,
    );

    actions.fields.onTextChange('text', 'updated');
    actions.fields.onCheckboxToggle('multi', 'X');
    actions.submit.onSubmit();
    actions.submit.onReset();

    expect(onSetSingleValue).toHaveBeenCalledWith('text', 'updated');
    expect(onToggleCheckboxValue).toHaveBeenCalledWith('multi', 'X');
    expect(onSubmit).toHaveBeenCalled();
    expect(onReset).toHaveBeenCalled();
    expect(questionsModel.questions).toBe(questions);
    expect(questionsModel.answersByQuestionId).toEqual({ text: ['hello'] });
    expect(questionsModel.getQuestionTypeHint(QuestionType.Text)).toContain(
      'Respondents can type',
    );
  });
});
