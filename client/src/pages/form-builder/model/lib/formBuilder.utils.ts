import { type QuestionInput, QuestionType } from '@/shared/api/generated';
import type { ValidationError } from '@/shared/lib/validators';
import type { FormBuilderQuestionDraft } from '../slice/formBuilderSlice';

export const normalizeOptions = (options: string[]) =>
  options.map((option) => option.trim()).filter(Boolean);

export const buildQuestionInput = (
  question: FormBuilderQuestionDraft,
): QuestionInput => ({
  title: question.title.trim(),
  type: question.type,
  options: normalizeOptions(question.options),
});

export const getChoiceQuestionsErrors = (
  questions: FormBuilderQuestionDraft[],
): ValidationError[] => {
  const errors: ValidationError[] = [];

  questions.forEach((question, index) => {
    if (
      question.type !== QuestionType.MultipleChoice &&
      question.type !== QuestionType.Checkbox
    ) {
      return;
    }

    const normalized = normalizeOptions(question.options);

    if (normalized.length < 2) {
      errors.push({
        field: `question-${question.id}-options`,
        message: `Question ${index + 1} must have at least 2 filled options`,
      });
    }

    if (new Set(normalized).size !== normalized.length) {
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
): Record<string, string[]> =>
  errors.reduce<Record<string, string[]>>((acc, error) => {
    acc[error.field] = [...(acc[error.field] ?? []), error.message];
    return acc;
  }, {});

export const getFirstFieldError = (
  errorMap: Record<string, string[]>,
  field: string,
): string | null => errorMap[field]?.[0] ?? null;
