import { isValidDate } from './date';
import type { ValidationError } from './validation/types';

export type {
  FormDraftData,
  DraftQuestionData,
  SubmittedAnswerData,
  QuestionAnswerValue,
  SubmittedQuestionData,
  ValidationError,
} from './validation/types';
export { isValidDate } from './date';
export { validateFormData } from './validation/validateFormData';
export { validateFormSubmission } from './validation/validateFormSubmission';

export const formValidators = {
  required: (
    value: string | undefined | null,
    fieldName: string,
  ): ValidationError | null => {
    if (!value?.trim()) {
      return { field: fieldName, message: `${fieldName} is required` };
    }
    return null;
  },

  minLength: (
    value: string | undefined,
    minLength: number,
    fieldName: string,
  ): ValidationError | null => {
    if (value && value.length < minLength) {
      return {
        field: fieldName,
        message: `${fieldName} must be at least ${minLength} characters`,
      };
    }
    return null;
  },

  maxLength: (
    value: string | undefined,
    maxLength: number,
    fieldName: string,
  ): ValidationError | null => {
    if (value && value.length > maxLength) {
      return {
        field: fieldName,
        message: `${fieldName} must not exceed ${maxLength} characters`,
      };
    }
    return null;
  },

  date: (
    value: string | undefined,
    fieldName: string = 'Date',
  ): ValidationError | null => {
    if (value && !isValidDate(value)) {
      return { field: fieldName, message: 'Please enter a valid date' };
    }
    return null;
  },

  minItems: (
    value: unknown[],
    minItems: number,
    fieldName: string,
  ): ValidationError | null => {
    if (!Array.isArray(value) || value.length < minItems) {
      return {
        field: fieldName,
        message: `${fieldName} must have at least ${minItems} items`,
      };
    }
    return null;
  },
};
