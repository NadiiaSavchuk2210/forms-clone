import { QuestionType } from '@/shared/api/generated';

import type { FormQuestionType } from './types';

export type QuestionTypeOption = {
  value: FormQuestionType;
  label: string;
  hint: string;
};

export const QUESTION_TYPE_OPTIONS: readonly QuestionTypeOption[] = [
  {
    value: QuestionType.Text,
    label: 'Text input',
    hint: 'Respondents can type a short or long answer.',
  },
  {
    value: QuestionType.MultipleChoice,
    label: 'Multiple choice',
    hint: 'Pick one option from the list.',
  },
  {
    value: QuestionType.Checkbox,
    label: 'Checkboxes',
    hint: 'Choose one or more options.',
  },
  {
    value: QuestionType.Date,
    label: 'Date',
    hint: 'Select a date from the calendar.',
  },
] as const;

export const QUESTION_TYPE_LABELS: Record<FormQuestionType, string> = {
  [QuestionType.Text]: 'Text input',
  [QuestionType.MultipleChoice]: 'Multiple choice',
  [QuestionType.Checkbox]: 'Checkboxes',
  [QuestionType.Date]: 'Date',
};

const QUESTION_TYPE_HINTS: Record<FormQuestionType, string> =
  QUESTION_TYPE_OPTIONS.reduce<Record<FormQuestionType, string>>(
    (acc, option) => {
      acc[option.value] = option.hint;
      return acc;
    },
    {
      [QuestionType.Text]: '',
      [QuestionType.MultipleChoice]: '',
      [QuestionType.Checkbox]: '',
      [QuestionType.Date]: '',
    },
  );

export const getQuestionTypeHint = (type: FormQuestionType): string =>
  QUESTION_TYPE_HINTS[type];

export const getQuestionTypeLabel = (type: FormQuestionType): string =>
  QUESTION_TYPE_LABELS[type];

export const isTextQuestionType = (type: FormQuestionType): boolean =>
  type === QuestionType.Text;

export const isDateQuestionType = (type: FormQuestionType): boolean =>
  type === QuestionType.Date;

export const isCheckboxQuestionType = (type: FormQuestionType): boolean =>
  type === QuestionType.Checkbox;

export const isSingleChoiceQuestionType = (type: FormQuestionType): boolean =>
  type === QuestionType.MultipleChoice;

export const isChoiceQuestionType = (type: FormQuestionType): boolean =>
  isSingleChoiceQuestionType(type) || isCheckboxQuestionType(type);
