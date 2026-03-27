import {
  MAX_FORM_DESCRIPTION_LENGTH,
  MAX_FORM_TITLE_LENGTH,
  MAX_QUESTION_TITLE_LENGTH,
} from '@shared/validation';
import {
  QuestionType,
  type CreateFormInput,
  type Form,
  type SubmitResponseInput,
} from '@shared/types';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

const normalizeText = (value: string): string => value.trim();

const normalizeOptions = (options: string[] | undefined): string[] =>
  (options ?? []).map(normalizeText).filter(Boolean);

const isValidDateValue = (value: string): boolean => {
  const isIsoDate = /^\d{4}-\d{2}-\d{2}$/.test(value);

  if (!isIsoDate) {
    return false;
  }

  const parsedDate = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsedDate.getTime())
    && parsedDate.toISOString().startsWith(value);
};

export function validateForm(input: CreateFormInput): ValidationResult {
  const errors: string[] = [];

  if (!input.title || input.title.trim().length === 0) {
    errors.push('Form title is required');
  } else if (input.title.trim().length > MAX_FORM_TITLE_LENGTH) {
    errors.push(
      `Form title must be less than ${MAX_FORM_TITLE_LENGTH} characters`,
    );
  }

  if (
    input.description &&
    input.description.trim().length > MAX_FORM_DESCRIPTION_LENGTH
  ) {
    errors.push(
      `Form description must be less than ${MAX_FORM_DESCRIPTION_LENGTH} characters`,
    );
  }

  if (!Array.isArray(input.questions) || input.questions.length === 0) {
    errors.push('Form must have at least one question');
    return {
      valid: false,
      error: errors.join('; '),
    };
  }

  for (let i = 0; i < input.questions.length; i++) {
    const question = input.questions[i];
    const questionNumber = i + 1;
    const normalizedTitle = question.title?.trim() ?? '';

    if (normalizedTitle.length === 0) {
      errors.push(`Question ${questionNumber} title is required`);
    } else if (normalizedTitle.length > MAX_QUESTION_TITLE_LENGTH) {
      errors.push(
        `Question ${questionNumber} title must be less than ${MAX_QUESTION_TITLE_LENGTH} characters`,
      );
    }

    if (!Object.values(QuestionType).includes(question.type)) {
      errors.push(`Question ${questionNumber} type is required`);
      continue;
    }

    if (
      question.type === QuestionType.MULTIPLE_CHOICE ||
      question.type === QuestionType.CHECKBOX
    ) {
      const normalizedQuestionOptions = normalizeOptions(question.options);

      if (normalizedQuestionOptions.length < 2) {
        errors.push(`Question ${questionNumber} must have at least 2 options`);
      }

      if (
        new Set(normalizedQuestionOptions).size !==
        normalizedQuestionOptions.length
      ) {
        errors.push(`Question ${questionNumber} options must be unique`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    error: errors.length > 0 ? errors.join('; ') : undefined,
  };
}

export function validateResponse(
  input: SubmitResponseInput,
  form: Form | undefined,
): ValidationResult {
  const errors: string[] = [];

  if (!input.formId || input.formId.trim().length === 0) {
    errors.push('Form ID is required');
  }

  if (!form) {
    return { valid: false, error: 'Form not found' };
  }

  if (!Array.isArray(input.answers)) {
    return { valid: false, error: 'Answers must be an array' };
  }

  const questionMap = new Map(
    form.questions.map((question) => [question.id, question]),
  );
  const seenQuestionIds = new Set<string>();

  for (const answer of input.answers) {
    const normalizedQuestionId = answer.questionId?.trim() ?? '';

    if (normalizedQuestionId.length === 0) {
      errors.push('Answer questionId is required');
      continue;
    }

    if (seenQuestionIds.has(normalizedQuestionId)) {
      errors.push(`Duplicate answer for question ${normalizedQuestionId}`);
      continue;
    }

    seenQuestionIds.add(normalizedQuestionId);

    const question = questionMap.get(normalizedQuestionId);

    if (!question) {
      errors.push(
        `Answer questionId ${normalizedQuestionId} does not match form questions`,
      );
      continue;
    }

    if (!Array.isArray(answer.value)) {
      errors.push(`Answer for question ${normalizedQuestionId} must be a list`);
      continue;
    }

    const normalizedValues = answer.value.map(normalizeText).filter(Boolean);

    switch (question.type) {
      case QuestionType.TEXT:
      case QuestionType.DATE: {
        if (normalizedValues.length !== 1) {
          errors.push(
            `Question ${normalizedQuestionId} must contain exactly one value`,
          );
        } else if (
          question.type === QuestionType.DATE
          && !isValidDateValue(normalizedValues[0])
        ) {
          errors.push(`Question ${normalizedQuestionId} must contain a valid date`);
        }
        break;
      }

      case QuestionType.MULTIPLE_CHOICE: {
        if (normalizedValues.length !== 1) {
          errors.push(
            `Question ${normalizedQuestionId} must contain exactly one selected option`,
          );
          break;
        }

        if (!question.options.includes(normalizedValues[0])) {
          errors.push(
            `Question ${normalizedQuestionId} contains an invalid option`,
          );
        }
        break;
      }

      case QuestionType.CHECKBOX: {
        if (normalizedValues.length === 0) {
          errors.push(
            `Question ${normalizedQuestionId} must contain at least one selected option`,
          );
          break;
        }

        const invalidOptions = normalizedValues.filter(
          (value) => !question.options.includes(value),
        );

        if (invalidOptions.length > 0) {
          errors.push(
            `Question ${normalizedQuestionId} contains invalid checkbox options`,
          );
        }

        if (new Set(normalizedValues).size !== normalizedValues.length) {
          errors.push(
            `Question ${normalizedQuestionId} contains duplicate checkbox values`,
          );
        }
        break;
      }

      default: {
        errors.push(`Unsupported question type for ${normalizedQuestionId}`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    error: errors.length > 0 ? errors.join('; ') : undefined,
  };
}
