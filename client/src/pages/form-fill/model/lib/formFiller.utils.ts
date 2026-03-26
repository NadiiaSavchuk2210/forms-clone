import { getQuestionTypeHint } from '@/entities/form/model';
import { type AnswerInput, type GetFormQuery } from '@/shared/api/generated';
import type {
  FormFillerActions,
  FormFillerQuestionsModel,
  QuestionAnswersById,
  QuestionFieldActions,
} from '../types';

type FormQuestion = NonNullable<GetFormQuery['form']>['questions'][number];

export const syncAnswersWithQuestions = (
  questions: FormQuestion[],
  previousAnswers: QuestionAnswersById,
): QuestionAnswersById =>
  questions.reduce<QuestionAnswersById>((acc, question) => {
    acc[question.id] = previousAnswers[question.id] ?? [];
    return acc;
  }, {});

export const buildAnswerInput = (
  questions: FormQuestion[],
  answersByQuestionId: QuestionAnswersById,
): AnswerInput[] =>
  questions.map((question) => ({
    questionId: question.id,
    value: answersByQuestionId[question.id] ?? [],
  }));

export const setSingleAnswerValue = (
  previousAnswers: QuestionAnswersById,
  questionId: string,
  value: string,
): QuestionAnswersById => ({
  ...previousAnswers,
  [questionId]: value ? [value] : [],
});

export const toggleAnswerOption = (
  previousAnswers: QuestionAnswersById,
  questionId: string,
  option: string,
): QuestionAnswersById => {
  const nextValues = previousAnswers[questionId] ?? [];
  const isSelected = nextValues.includes(option);

  return {
    ...previousAnswers,
    [questionId]: isSelected
      ? nextValues.filter((item) => item !== option)
      : [...nextValues, option],
  };
};

export const createQuestionFieldActions = (
  onSetSingleValue: (questionId: string, value: string) => void,
  onToggleCheckboxValue: (questionId: string, option: string) => void,
): QuestionFieldActions => ({
  onTextChange: onSetSingleValue,
  onDateChange: onSetSingleValue,
  onSingleChoiceChange: onSetSingleValue,
  onCheckboxToggle: onToggleCheckboxValue,
});

export const createFormFillerActions = (
  fields: QuestionFieldActions,
  onSubmit: () => void,
  onReset: () => void,
): FormFillerActions => ({
  fields,
  submit: {
    onSubmit,
    onReset,
  },
});

export const createQuestionsModel = (
  questions: FormQuestion[],
  answersByQuestionId: QuestionAnswersById,
  getQuestionError: (questionId: string) => string | null,
): FormFillerQuestionsModel => ({
  questions,
  answersByQuestionId,
  getQuestionError,
  getQuestionTypeHint,
});
