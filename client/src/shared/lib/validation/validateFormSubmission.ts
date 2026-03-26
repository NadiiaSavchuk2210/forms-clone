import { QuestionType } from '@/shared/api/generated';
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

  if (question.type === QuestionType.Date && !isValidDate(answerValue)) {
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
  if (question.type !== QuestionType.MultipleChoice || value.length === 1) {
    return null;
  }

  return {
    field: question.id,
    message: `Choose one answer for "${question.title}"`,
  };
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

    if (
      question.type === QuestionType.Text ||
      question.type === QuestionType.Date
    ) {
      const textOrDateError = validateTextOrDateAnswer(question, value);

      if (textOrDateError) {
        errors.push(textOrDateError);
        return;
      }
    }

    const singleChoiceError = validateSingleChoiceAnswer(question, value);

    if (singleChoiceError) {
      errors.push(singleChoiceError);
    }
  });

  return errors;
};
