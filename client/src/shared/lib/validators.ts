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
    title?: string;
    type?: string;
    options?: string[];
  }>;
}): ValidationError[] {
  const errors: ValidationError[] = [];

  const titleError = formValidators.required(formData.title, 'Form title');
  if (titleError) errors.push(titleError);

  const titleLengthError = formValidators.maxLength(
    formData.title,
    200,
    'Form title',
  );
  if (titleLengthError) errors.push(titleLengthError);

  const questionsError = formValidators.minItems(
    formData.questions || [],
    1,
    'Questions',
  );
  if (questionsError) errors.push(questionsError);

  if (Array.isArray(formData.questions)) {
    formData.questions.forEach((question, i) => {
      const qNum = i + 1;

      const titleError = formValidators.required(
        question.title,
        `Question ${qNum} title`,
      );
      if (titleError) errors.push(titleError);

      const typeError = formValidators.required(
        question.type,
        `Question ${qNum} type`,
      );
      if (typeError) errors.push(typeError);

      if (['MULTIPLE_CHOICE', 'CHECKBOX'].includes(question.type || '')) {
        const optionsError = formValidators.minItems(
          question.options || [],
          2,
          `Question ${qNum} options`,
        );
        if (optionsError) {
          errors.push(optionsError);
        }
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

    if (
      !answer?.value ||
      (Array.isArray(answer.value) && answer.value.length === 0)
    ) {
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
