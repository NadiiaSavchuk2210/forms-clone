import type { FormQuestion } from '@/entities/form/model';
import { QUESTION_TYPE_LABELS } from '@/entities/form/model';
import type {
  ResponseAnswerRecord,
  ResponseRecord,
} from '@/entities/response/model';
import type {
  FormResponseCard,
  FormResponseCardAnswer,
  FormResponsesQuestionAnalyticsAnswer,
  FormResponsesQuestionAnalyticsRow,
  FormResponsesSummaryModel,
} from '../types';
import { EMPTY_ANSWER_LABEL } from './formResponses.constants';
import {
  formatAnswerValue,
  hasAnswerValues,
} from './formResponses.formatters';
import type { IndexedResponse } from './formResponses.indexing';
import { indexResponses } from './formResponses.indexing';

export interface FormResponsesViewData {
  responseCards: FormResponseCard[];
  responsesCount: number;
  summary: FormResponsesSummaryModel;
}

const createResponseCardAnswer = (
  question: FormQuestion,
  answer?: ResponseAnswerRecord,
): FormResponseCardAnswer => {
  const values = answer?.value ?? [];

  return {
    questionId: question.id,
    questionTitle: question.title,
    questionType: question.type,
    questionTypeLabel: QUESTION_TYPE_LABELS[question.type],
    values,
    displayValue: formatAnswerValue(question.type, values),
    hasAnswer: hasAnswerValues(values),
  };
};

const buildResponseCards = (
  questions: FormQuestion[],
  indexedResponses: IndexedResponse[],
): FormResponseCard[] =>
  indexedResponses.map(({ answerByQuestionId, response, title }) => {
    const answers = questions.map((question) =>
      createResponseCardAnswer(question, answerByQuestionId.get(question.id)),
    );
    const answeredCount = answers.filter((answer) => answer.hasAnswer).length;

    return {
      id: response.id,
      title,
      answeredCount,
      totalQuestions: questions.length,
      answers,
    };
  });

const appendAnalyticsAnswer = (
  answersMap: Map<string, FormResponsesQuestionAnalyticsAnswer>,
  response: ResponseRecord,
  responseTitle: string,
  formattedValue: string,
): void => {
  const existingAnswer = answersMap.get(formattedValue);

  if (existingAnswer) {
    existingAnswer.responseTitles.push(responseTitle);
    existingAnswer.responseIds.push(response.id);
    return;
  }

  answersMap.set(formattedValue, {
    value: formattedValue,
    responseTitles: [responseTitle],
    responseIds: [response.id],
  });
};

const buildQuestionAnalyticsRow = (
  question: FormQuestion,
  indexedResponses: IndexedResponse[],
): FormResponsesQuestionAnalyticsRow => {
  const answersMap = new Map<string, FormResponsesQuestionAnalyticsAnswer>();
  let answeredCount = 0;

  indexedResponses.forEach(({ answerByQuestionId, response, title }) => {
    const values = answerByQuestionId.get(question.id)?.value ?? [];

    if (!hasAnswerValues(values)) {
      return;
    }

    answeredCount += 1;

    const formattedValue = formatAnswerValue(question.type, values);

    if (formattedValue === EMPTY_ANSWER_LABEL) {
      return;
    }

    appendAnalyticsAnswer(answersMap, response, title, formattedValue);
  });

  return {
    questionId: question.id,
    questionTitle: question.title,
    questionTypeLabel: QUESTION_TYPE_LABELS[question.type],
    answeredCount,
    answers: [...answersMap.values()].slice(0, 3),
  };
};

const buildQuestionAnalytics = (
  questions: FormQuestion[],
  indexedResponses: IndexedResponse[],
): FormResponsesQuestionAnalyticsRow[] =>
  questions.map((question) => buildQuestionAnalyticsRow(question, indexedResponses));

const buildResponsesSummary = (
  questions: FormQuestion[],
  indexedResponses: IndexedResponse[],
  responseCards: FormResponseCard[],
): FormResponsesSummaryModel => {
  const collectedAnswersCount = responseCards.reduce(
    (total, responseCard) => total + responseCard.answeredCount,
    0,
  );
  const responsesCount = indexedResponses.length;
  const averageAnswersPerResponse =
    responsesCount === 0
      ? 0
      : Number((collectedAnswersCount / responsesCount).toFixed(1));

  return {
    responsesCount,
    questionsCount: questions.length,
    collectedAnswersCount,
    averageAnswersPerResponse,
    questionAnalytics: buildQuestionAnalytics(questions, indexedResponses),
  };
};

export const createFormResponsesViewData = (
  questions: FormQuestion[],
  responses: ResponseRecord[],
): FormResponsesViewData => {
  const indexedResponses = indexResponses(responses);
  const responseCards = buildResponseCards(questions, indexedResponses);

  return {
    responseCards,
    responsesCount: indexedResponses.length,
    summary: buildResponsesSummary(questions, indexedResponses, responseCards),
  };
};
