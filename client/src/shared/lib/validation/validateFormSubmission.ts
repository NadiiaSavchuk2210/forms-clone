import {
  isCheckboxQuestionType,
  isChoiceQuestionType,
  isDateQuestionType,
  isSingleChoiceQuestionType,
  isTextQuestionType,
} from '@/entities/form/model';

import type {
  SubmittedAnswerData,
  SubmittedQuestionData,
  ValidationError,
} from './types';
import { isValidDate } from './utils';

const createRequiredError = (question: SubmittedQuestionData): ValidationError => ({
  field: question.id,
  message: `"${question.title}" is required`,
});

const hasMissingAnswer = (
  value: SubmittedAnswerData['value'],
): boolean => {
  if (!value) {
    return true;
  }

  if (!Array.isArray(value)) {
    return true;
  }

  return value.length === 0;
};

const validateTextOrDateAnswer = (
  question: SubmittedQuestionData,
  value: string[],
): ValidationError | null => {
  const answerValue = value[0]?.trim();

  if (!answerValue) {
    return createRequiredError(question);
  }

  if (isDateQuestionType(question.type) && !isValidDate(answerValue)) {
    return {
      field: question.id,
      message: `"${question.title}" must be a valid date`,
    };
  }

  return null;
};

const validateSingleChoiceAnswer = (
  question: SubmittedQuestionData,
  value: string[],
): ValidationError | null => {
  if (!isSingleChoiceQuestionType(question.type) || value.length === 1) {
    return null;
  }

  return {
    field: question.id,
    message: `Choose one answer for "${question.title}"`,
  };
};

const validateChoiceAnswerValues = (
  question: SubmittedQuestionData,
  value: string[],
): ValidationError | null => {
  if (!isChoiceQuestionType(question.type)) {
    return null;
  }

  const normalizedOptions = question.options ?? [];
  const invalidValue = value.find((item) => !normalizedOptions.includes(item));

  if (invalidValue) {
    return {
      field: question.id,
      message: `Answer for "${question.title}" contains an invalid option`,
    };
  }

  if (
    isCheckboxQuestionType(question.type)
    && new Set(value).size !== value.length
  ) {
    return {
      field: question.id,
      message: `Answer for "${question.title}" contains duplicate options`,
    };
  }

  return null;
};

export const validateFormSubmission = (
  answers: SubmittedAnswerData[],
  questions: SubmittedQuestionData[],
): ValidationError[] => {
  const errors: ValidationError[] = [];
  const answersByQuestionId = new Map(
    answers.map((answer) => [answer.questionId, answer]),
  );

  questions.forEach((question) => {
    const answer = answersByQuestionId.get(question.id);
    const value = answer?.value;

    if (hasMissingAnswer(value)) {
      errors.push(createRequiredError(question));
      return;
    }

    if (!Array.isArray(value)) {
      errors.push(createRequiredError(question));
      return;
    }

    if (isTextQuestionType(question.type) || isDateQuestionType(question.type)) {
      const textOrDateError = validateTextOrDateAnswer(question, value);

      if (textOrDateError) {
        errors.push(textOrDateError);
        return;
      }
    }

    const singleChoiceError = validateSingleChoiceAnswer(question, value);

    if (singleChoiceError) {
      errors.push(singleChoiceError);
      return;
    }

    const choiceAnswerValuesError = validateChoiceAnswerValues(question, value);

    if (choiceAnswerValuesError) {
      errors.push(choiceAnswerValuesError);
    }
  });

  return errors;
};
