export interface ValidationError {
  field: string;
  message: string;
}

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
    if (value && isNaN(Date.parse(value))) {
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

export function validateFormData(formData: {
  title?: string;
  description?: string;
  questions?: Array<{
    id?: string;
    title?: string;
    type?: string;
    options?: string[];
  }>;
}): ValidationError[] {
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

  if (Array.isArray(formData.questions)) {
    formData.questions.forEach((question, i) => {
      const qNum = i + 1;
      const questionFieldId = question.id ?? String(qNum);

      if (!question.title?.trim()) {
        errors.push({
          field: `question-${questionFieldId}-title`,
          message: `Question ${qNum} title is required`,
        });
      }

      if (!question.type?.trim()) {
        errors.push({
          field: `question-${questionFieldId}-type`,
          message: `Question ${qNum} type is required`,
        });
      }

    });
  }

  return errors;
}

export function validateFormSubmission(
  answers: Array<{ questionId?: string; value?: string | string[] }>,
  questions: Array<{ id: string; title: string; type: string }>,
): ValidationError[] {
  const errors: ValidationError[] = [];
  const answersByQuestionId = new Map(answers.map((a) => [a.questionId, a]));

  questions.forEach((question) => {
    const answer = answersByQuestionId.get(question.id);
    const value = answer?.value;

    if (!value) {
      errors.push({
        field: question.id,
        message: `"${question.title}" is required`,
      });
      return;
    }

    if (Array.isArray(value) && value.length === 0) {
      errors.push({
        field: question.id,
        message: `"${question.title}" is required`,
      });
    }
  });

  return errors;
}

export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
