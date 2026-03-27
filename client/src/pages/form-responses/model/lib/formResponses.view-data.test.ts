import { describe, expect, it } from 'vitest';

import { QuestionType } from '@/shared/api/generated';

import { createFormResponsesViewData } from './formResponses.view-data';

describe('createFormResponsesViewData', () => {
  it('builds response cards and summary analytics from responses', () => {
    const questions = [
      {
        __typename: 'Question' as const,
        id: 'q-text',
        title: 'Name',
        type: QuestionType.Text,
        options: [],
      },
      {
        __typename: 'Question' as const,
        id: 'q-date',
        title: 'Date',
        type: QuestionType.Date,
        options: [],
      },
      {
        __typename: 'Question' as const,
        id: 'q-check',
        title: 'Tags',
        type: QuestionType.Checkbox,
        options: ['A', 'B'],
      },
    ];

    const responses = [
      {
        __typename: 'Response' as const,
        id: 'r-1',
        formId: 'form-1',
        answers: [
          { __typename: 'Answer' as const, questionId: 'q-text', value: ['Alice'] },
          { __typename: 'Answer' as const, questionId: 'q-date', value: ['2026-03-27'] },
          { __typename: 'Answer' as const, questionId: 'q-check', value: ['A', 'B'] },
        ],
      },
      {
        __typename: 'Response' as const,
        id: 'r-2',
        formId: 'form-1',
        answers: [
          { __typename: 'Answer' as const, questionId: 'q-text', value: ['Bob'] },
          { __typename: 'Answer' as const, questionId: 'q-date', value: [''] },
          { __typename: 'Answer' as const, questionId: 'q-check', value: ['A'] },
        ],
      },
    ];

    const viewData = createFormResponsesViewData(questions, responses);

    expect(viewData.responsesCount).toBe(2);
    expect(viewData.responseCards).toHaveLength(2);
    expect(viewData.responseCards[0].title).toBe('Response 2');
    expect(viewData.responseCards[0].answeredCount).toBe(2);
    expect(viewData.responseCards[0].answers[1].displayValue).toBe('No answer provided');

    expect(viewData.summary).toMatchObject({
      responsesCount: 2,
      questionsCount: 3,
      collectedAnswersCount: 5,
      averageAnswersPerResponse: 2.5,
    });

    expect(viewData.summary.questionAnalytics).toEqual([
      {
        questionId: 'q-text',
        questionTitle: 'Name',
        questionTypeLabel: 'Text input',
        answeredCount: 2,
        answers: [
          {
            value: 'Bob',
            responseTitles: ['Response 2'],
            responseIds: ['r-2'],
          },
          {
            value: 'Alice',
            responseTitles: ['Response 1'],
            responseIds: ['r-1'],
          },
        ],
      },
      {
        questionId: 'q-date',
        questionTitle: 'Date',
        questionTypeLabel: 'Date',
        answeredCount: 1,
        answers: [
          {
            value: 'Mar 27, 2026',
            responseTitles: ['Response 1'],
            responseIds: ['r-1'],
          },
        ],
      },
      {
        questionId: 'q-check',
        questionTitle: 'Tags',
        questionTypeLabel: 'Checkboxes',
        answeredCount: 2,
        answers: [
          {
            value: 'A',
            responseTitles: ['Response 2'],
            responseIds: ['r-2'],
          },
          {
            value: 'A, B',
            responseTitles: ['Response 1'],
            responseIds: ['r-1'],
          },
        ],
      },
    ]);
  });
});
