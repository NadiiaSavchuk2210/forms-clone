export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateForm(input: {
  title: string;
  description?: string;
  questions?: Array<{ title: string; type: string; options?: string[] }>;
}): ValidationResult {
  const errors: string[] = [];

  if (!input.title || input.title.trim().length === 0) {
    errors.push('Form title is required');
  }

  if (input.title.length > 200) {
    errors.push('Form title must be less than 200 characters');
  }

  if (input.description && input.description.length > 1000) {
    errors.push('Form description must be less than 1000 characters');
  }

  if (!Array.isArray(input.questions) || input.questions.length === 0) {
    errors.push('Form must have at least one question');
  }

  if (Array.isArray(input.questions)) {
    for (let i = 0; i < input.questions.length; i++) {
      const question = input.questions[i];
      if (!question.title || question.title.trim().length === 0) {
        errors.push(`Question ${i + 1} title is required`);
      }
      if (!question.type || question.type.trim().length === 0) {
        errors.push(`Question ${i + 1} type is required`);
      }
      if (
        (question.type === 'MULTIPLE_CHOICE' || question.type === 'CHECKBOX') &&
        (!Array.isArray(question.options) || question.options.length < 2)
      ) {
        errors.push(`Question ${i + 1} must have at least 2 options`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    error: errors.length > 0 ? errors.join('; ') : undefined,
  };
}

export function validateResponse(
  input: {
    formId: string;
    answers: Array<{ questionId: string; value: string | string[] }>;
  },
  form: { questions: Array<{ id: string }> } | undefined,
): ValidationResult {
  const errors: string[] = [];

  if (!input.formId || input.formId.trim().length === 0) {
    errors.push('Form ID is required');
  }

  if (!form) {
    return { valid: false, error: 'Form not found' };
  }

  if (!Array.isArray(input.answers)) {
    errors.push('Answers must be an array');
  }

  const questionIds = new Set(form.questions.map((q) => q.id));

  for (const answer of input.answers) {
    if (!answer.questionId || answer.questionId.trim().length === 0) {
      errors.push('Answer questionId is required');
    } else if (!questionIds.has(answer.questionId)) {
      errors.push(
        `Answer questionId ${answer.questionId} does not match form questions`,
      );
    }
  }

  return {
    valid: errors.length === 0,
    error: errors.length > 0 ? errors.join('; ') : undefined,
  };
}
