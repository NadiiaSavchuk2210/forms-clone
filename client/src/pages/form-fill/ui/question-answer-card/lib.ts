import { QuestionType } from '@/shared/api/generated';
import type { FormQuestion } from '../../model';

export const getSingleAnswerValue = (answerValues: string[]): string =>
  answerValues[0] ?? '';

export const isCheckboxQuestion = (question: FormQuestion): boolean =>
  question.type === QuestionType.Checkbox;

export const isSingleChoiceQuestion = (question: FormQuestion): boolean =>
  question.type === QuestionType.MultipleChoice;
