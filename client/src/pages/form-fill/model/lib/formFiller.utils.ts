import { type AnswerInput, type GetFormQuery, QuestionType } from '@/shared/api/generated';
import type { ValidationError } from '@/shared/lib/validation';
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

export const buildValidationErrorMap = (
  errors: ValidationError[],
): Record<string, string[]> =>
  errors.reduce<Record<string, string[]>>((acc, error) => {
    acc[error.field] = [...(acc[error.field] ?? []), error.message];
    return acc;
  }, {});

export const getFirstFieldError = (
  errorMap: Record<string, string[]>,
  field: string,
): string | null => errorMap[field]?.[0] ?? null;

export const getVisibleValidationErrors = (
  shouldShowErrors: boolean,
  validationErrors: ValidationError[],
): ValidationError[] => {
  if (!shouldShowErrors) {
    return [];
  }

  return validationErrors;
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

export const getQuestionTypeHint = (type: QuestionType): string => {
  if (type === QuestionType.Text) {
    return 'Respondents can type a short or long answer.';
  }

  if (type === QuestionType.MultipleChoice) {
    return 'Pick one option from the list.';
  }

  if (type === QuestionType.Checkbox) {
    return 'Choose one or more options.';
  }

  return 'Select a date from the calendar.';
};
