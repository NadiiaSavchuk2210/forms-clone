import { describe, expect, it } from 'vitest';

import { QuestionType } from '@/shared/api/generated';

import { validateFormSubmission } from './validateFormSubmission';

describe('validateFormSubmission', () => {
  it('requires answers for every question', () => {
    expect(
      validateFormSubmission([], [
        {
          id: 'q-1',
          title: 'Your name',
          type: QuestionType.Text,
        },
      ]),
    ).toEqual([
      {
        field: 'q-1',
        message: '"Your name" is required',
      },
    ]);
  });

  it('rejects invalid date and invalid choice answers', () => {
    const errors = validateFormSubmission(
      [
        { questionId: 'date', value: ['2026-02-30'] },
        { questionId: 'single', value: ['A', 'B'] },
        { questionId: 'multi', value: ['A', 'A'] },
        { questionId: 'multi-invalid', value: ['Z'] },
      ],
      [
        {
          id: 'date',
          title: 'Pick a date',
          type: QuestionType.Date,
        },
        {
          id: 'single',
          title: 'Choose one',
          type: QuestionType.MultipleChoice,
          options: ['A', 'B'],
        },
        {
          id: 'multi',
          title: 'Choose many',
          type: QuestionType.Checkbox,
          options: ['A', 'B'],
        },
        {
          id: 'multi-invalid',
          title: 'Allowed values',
          type: QuestionType.Checkbox,
          options: ['A', 'B'],
        },
      ],
    );

    expect(errors).toEqual([
      {
        field: 'date',
        message: '"Pick a date" must be a valid date',
      },
      {
        field: 'single',
        message: 'Choose one answer for "Choose one"',
      },
      {
        field: 'multi',
        message: 'Answer for "Choose many" contains duplicate options',
      },
      {
        field: 'multi-invalid',
        message: 'Answer for "Allowed values" contains an invalid option',
      },
    ]);
  });

  it('accepts valid answers for every supported question type', () => {
    expect(
      validateFormSubmission(
        [
          { questionId: 'text', value: ['Alice'] },
          { questionId: 'single', value: ['B'] },
          { questionId: 'multi', value: ['A', 'C'] },
          { questionId: 'date', value: ['2026-03-27'] },
        ],
        [
          {
            id: 'text',
            title: 'Name',
            type: QuestionType.Text,
          },
          {
            id: 'single',
            title: 'Role',
            type: QuestionType.MultipleChoice,
            options: ['A', 'B', 'C'],
          },
          {
            id: 'multi',
            title: 'Skills',
            type: QuestionType.Checkbox,
            options: ['A', 'B', 'C'],
          },
          {
            id: 'date',
            title: 'Start date',
            type: QuestionType.Date,
          },
        ],
      ),
    ).toEqual([]);
  });
});
