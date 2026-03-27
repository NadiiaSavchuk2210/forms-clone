import type { FormQuestionType } from '@/entities/form/model';
import { isCheckboxQuestionType, isDateQuestionType } from '@/entities/form/model';
import { formatDateForDisplay } from '@/shared/lib/date';

import { EMPTY_ANSWER_LABEL } from './formResponses.constants';

export const hasAnswerValues = (values: string[]): boolean =>
  values.some((value) => value.trim().length > 0);

export const formatAnswerValue = (
  questionType: FormQuestionType,
  values: string[],
): string => {
  const normalizedValues = values
    .map((value) => value.trim())
    .filter(Boolean);

  if (normalizedValues.length === 0) {
    return EMPTY_ANSWER_LABEL;
  }

  if (isDateQuestionType(questionType)) {
    const dateValue = normalizedValues[0];
    return formatDateForDisplay(dateValue);
  }

  if (isCheckboxQuestionType(questionType)) {
    return normalizedValues.join(', ');
  }

  return normalizedValues.join(' ');
};

export const getResponseTitle = (
  responseIndex: number,
  totalResponses: number,
): string => `Response ${totalResponses - responseIndex}`;
