import type { ValidationError } from './types';

export type ValidationErrorMap = Record<string, string[]>;

export const buildValidationErrorMap = (
  errors: ValidationError[],
): ValidationErrorMap =>
  errors.reduce<ValidationErrorMap>((acc, error) => {
    acc[error.field] = [...(acc[error.field] ?? []), error.message];
    return acc;
  }, {});

export const getFirstFieldError = (
  errorMap: ValidationErrorMap,
  field: string,
): string | null => errorMap[field]?.[0] ?? null;

export const getVisibleValidationErrors = (
  shouldShowErrors: boolean,
  validationErrors: ValidationError[],
): ValidationError[] => {
  if (!shouldShowErrors) {
    return [];
  }

  return validationErrors;
};
