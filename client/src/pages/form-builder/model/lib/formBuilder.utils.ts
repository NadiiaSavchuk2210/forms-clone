import {
  isChoiceQuestionType,
  normalizeQuestionOptions,
} from '@/entities/form/model';
import type { QuestionInput } from '@/shared/api/generated';
import type { ValidationError } from '@/shared/lib/validation';
import type { FormBuilderQuestionDraft } from '../slice/formBuilderSlice';

export const buildQuestionInput = (
  question: FormBuilderQuestionDraft,
): QuestionInput => {
  return {
    title: question.title.trim(),
    type: question.type,
    options: normalizeQuestionOptions(question.options),
  };
};

export const getChoiceQuestionsErrors = (
  questions: FormBuilderQuestionDraft[],
): ValidationError[] => {
  const errors: ValidationError[] = [];

  questions.forEach((question, index) => {
    if (!isChoiceQuestionType(question.type)) {
      return;
    }

    const normalizedOptions = normalizeQuestionOptions(question.options);

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
