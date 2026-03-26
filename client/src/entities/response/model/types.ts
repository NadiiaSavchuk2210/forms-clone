import type { GetResponsesQuery } from '@/shared/api/generated';

export type ResponseRecord = GetResponsesQuery['responses'][number];
export type ResponseAnswerRecord = ResponseRecord['answers'][number];
