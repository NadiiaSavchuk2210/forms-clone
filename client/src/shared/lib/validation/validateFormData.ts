import type { FormDraftData, ValidationError } from './types';

export const validateFormData = (formData: FormDraftData): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!formData.title?.trim()) {
    errors.push({
      field: 'form-title',
      message: 'Form title is required',
    });
  }

  if (formData.title && formData.title.length > 200) {
    errors.push({
      field: 'form-title',
      message: 'Form title must not exceed 200 characters',
    });
  }

  if (formData.description && formData.description.length > 500) {
    errors.push({
      field: 'form-description',
      message: 'Description must not exceed 500 characters',
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
