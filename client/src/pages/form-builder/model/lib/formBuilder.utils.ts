import { type QuestionInput, QuestionType } from '@/shared/api/generated';
import type { ValidationError } from '@/shared/lib/validation';
import type { FormBuilderQuestionDraft } from '../slice/formBuilderSlice';
import type { FormBuilderFieldErrors } from '../types';

const isChoiceQuestion = (type: QuestionType): boolean => {
  return (
    type === QuestionType.MultipleChoice || type === QuestionType.Checkbox
  );
};

export const normalizeOptions = (options: string[]): string[] => {
  return options.map((option) => option.trim()).filter(Boolean);
};

export const buildQuestionInput = (
  question: FormBuilderQuestionDraft,
): QuestionInput => {
  return {
    title: question.title.trim(),
    type: question.type,
    options: normalizeOptions(question.options),
  };
};

export const getChoiceQuestionsErrors = (
  questions: FormBuilderQuestionDraft[],
): ValidationError[] => {
  const errors: ValidationError[] = [];

  questions.forEach((question, index) => {
    if (!isChoiceQuestion(question.type)) {
      return;
    }

    const normalizedOptions = normalizeOptions(question.options);

    if (normalizedOptions.length < 2) {
      errors.push({
        field: `question-${question.id}-options`,
        message: `Question ${index + 1} must have at least 2 filled options`,
      });
    }

    if (new Set(normalizedOptions).size !== normalizedOptions.length) {
      errors.push({
        field: `question-${question.id}-options`,
        message: `Question ${index + 1} options must be unique`,
      });
    }
  });

  return errors;
};

export const buildValidationErrorMap = (
  errors: ValidationError[],
): FormBuilderFieldErrors => {
  return errors.reduce<FormBuilderFieldErrors>((acc, error) => {
    acc[error.field] = [...(acc[error.field] ?? []), error.message];
    return acc;
  }, {});
};

export const getFirstFieldError = (
  errorMap: FormBuilderFieldErrors,
  field: string,
): string | null => {
  return errorMap[field]?.[0] ?? null;
};
