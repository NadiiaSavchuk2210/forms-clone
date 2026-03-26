import type { GetFormQuery, QuestionType } from '@/shared/api/generated';
import type { ValidationError } from '@/shared/lib/validation';

export type FormQuestion = NonNullable<GetFormQuery['form']>['questions'][number];

export type QuestionAnswersById = Record<string, string[]>;

export type SubmitSuccessState = {
  responseId: string;
  formTitle: string;
} | null;

export type QuestionFieldActions = {
  onTextChange: (questionId: string, value: string) => void;
  onDateChange: (questionId: string, value: string) => void;
  onSingleChoiceChange: (questionId: string, option: string) => void;
  onCheckboxToggle: (questionId: string, option: string) => void;
};

export type FormFillerQuestionsModel = {
  questions: FormQuestion[];
  answersByQuestionId: QuestionAnswersById;
  getQuestionError: (questionId: string) => string | null;
  getQuestionTypeHint: (type: QuestionType) => string;
};

export type FormFillerActions = {
  fields: QuestionFieldActions;
  submit: {
    onSubmit: () => void;
    onReset: () => void;
  };
};

export type FormFillerViewModel = {
  formTitle: string;
  formDescription: string | null | undefined;
  validationErrors: ValidationError[];
  successState: SubmitSuccessState;
  errorMessage: string | null;
  isSubmitting: boolean;
};
