import { QuestionType } from '@/shared/api/generated';

export const FORM_BUILDER_STORAGE_KEY = 'forms-clone:form-builder-draft';

export const QUESTION_TYPE_OPTIONS = [
  { value: QuestionType.Text, label: 'Text input', hint: 'Short or long text' },
  {
    value: QuestionType.MultipleChoice,
    label: 'Multiple choice',
    hint: 'Pick one option',
  },
  {
    value: QuestionType.Checkbox,
    label: 'Checkboxes',
    hint: 'Pick several options',
  },
  { value: QuestionType.Date, label: 'Date', hint: 'Choose a date' },
] as const;

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  [QuestionType.Text]: 'Text input',
  [QuestionType.MultipleChoice]: 'Multiple choice',
  [QuestionType.Checkbox]: 'Checkboxes',
  [QuestionType.Date]: 'Date',
};
