import type { FormQuestion, QuestionFieldActions } from '../../model';

export type QuestionAnswerCardProps = {
  question: FormQuestion;
  index: number;
  answerValues: string[];
  errorMessage: string | null;
  typeHint: string;
  actions: QuestionFieldActions;
};

export type QuestionOptionsGroupProps = {
  question: FormQuestion;
  answerValues: string[];
  errorMessage: string | null;
  isCheckboxQuestion: boolean;
  actions: QuestionFieldActions;
};
