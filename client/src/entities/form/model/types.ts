import type { GetFormQuery } from '@/shared/api/generated';

export type FormRecord = NonNullable<GetFormQuery['form']>;
export type FormQuestion = FormRecord['questions'][number];
export type FormQuestionType = FormQuestion['type'];
