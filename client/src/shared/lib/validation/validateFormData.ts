import {
  MAX_FORM_DESCRIPTION_LENGTH,
  MAX_FORM_TITLE_LENGTH,
  MAX_QUESTION_TITLE_LENGTH,
} from '@shared/validation';

import type { FormDraftData, ValidationError } from './types';

export const validateFormData = (formData: FormDraftData): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!formData.title?.trim()) {
    errors.push({
      field: 'form-title',
      message: 'Form title is required',
    });
  }

  if (formData.title && formData.title.length > MAX_FORM_TITLE_LENGTH) {
    errors.push({
      field: 'form-title',
      message: `Form title must not exceed ${MAX_FORM_TITLE_LENGTH} characters`,
    });
  }

  if (
    formData.description
    && formData.description.length > MAX_FORM_DESCRIPTION_LENGTH
  ) {
    errors.push({
      field: 'form-description',
      message: `Description must not exceed ${MAX_FORM_DESCRIPTION_LENGTH} characters`,
    });
  }

  if (!Array.isArray(formData.questions) || formData.questions.length === 0) {
    errors.push({
      field: 'questions',
      message: 'Add at least one question before saving',
    });
  }

  if (!Array.isArray(formData.questions)) {
    return errors;
  }

  formData.questions.forEach((question, index) => {
    const questionNumber = index + 1;
    const questionFieldId = question.id ?? String(questionNumber);

    if (!question.title?.trim()) {
      errors.push({
        field: `question-${questionFieldId}-title`,
        message: `Question ${questionNumber} title is required`,
      });
    } else if (question.title.length > MAX_QUESTION_TITLE_LENGTH) {
      errors.push({
        field: `question-${questionFieldId}-title`,
        message: `Question ${questionNumber} title must not exceed ${MAX_QUESTION_TITLE_LENGTH} characters`,
      });
    }

    if (!question.type?.trim()) {
      errors.push({
        field: `question-${questionFieldId}-type`,
        message: `Question ${questionNumber} type is required`,
      });
    }
  });

  return errors;
};
