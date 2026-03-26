import {
  isCheckboxQuestionType,
  isSingleChoiceQuestionType,
} from '@/entities/form/model';
import type { FormQuestion } from '../../model';

export const getSingleAnswerValue = (answerValues: string[]): string =>
  answerValues[0] ?? '';

export const isCheckboxQuestion = (question: FormQuestion): boolean =>
  isCheckboxQuestionType(question.type);

export const isSingleChoiceQuestion = (question: FormQuestion): boolean =>
  isSingleChoiceQuestionType(question.type);
