import type {
  ResponseAnswerRecord,
  ResponseRecord,
} from '@/entities/response/model';
import { getResponseTitle } from './formResponses.formatters';

export interface IndexedResponse {
  answerByQuestionId: Map<string, ResponseAnswerRecord>;
  response: ResponseRecord;
  title: string;
}

const createAnswerLookup = (
  response: ResponseRecord,
): Map<string, ResponseAnswerRecord> =>
  new Map(response.answers.map((answer) => [answer.questionId, answer]));

export const indexResponses = (
  responses: ResponseRecord[],
): IndexedResponse[] => {
  const totalResponses = responses.length;

  return [...responses].reverse().map((response, responseIndex) => ({
    answerByQuestionId: createAnswerLookup(response),
    response,
    title: getResponseTitle(responseIndex, totalResponses),
  }));
};
