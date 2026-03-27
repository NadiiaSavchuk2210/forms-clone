import { describe, expect, it } from 'vitest';

import { validateFormData } from './validateFormData';

const MAX_FORM_TITLE_LENGTH = 200;
const MAX_FORM_DESCRIPTION_LENGTH = 1000;
const MAX_QUESTION_TITLE_LENGTH = 300;

describe('validateFormData', () => {
  it('returns required field errors for an empty draft', () => {
    expect(
      validateFormData({
        title: '   ',
        description: '',
        questions: [],
      }),
    ).toEqual([
      {
        field: 'form-title',
        message: 'Form title is required',
      },
      {
        field: 'questions',
        message: 'Add at least one question before saving',
      },
    ]);
  });

  it('collects validation errors for long fields and invalid questions', () => {
    const errors = validateFormData({
      title: 'a'.repeat(MAX_FORM_TITLE_LENGTH + 1),
      description: 'b'.repeat(MAX_FORM_DESCRIPTION_LENGTH + 1),
      questions: [
        {
          id: 'q-1',
          title: '',
          type: '',
        },
        {
          id: 'q-2',
          title: 'c'.repeat(MAX_QUESTION_TITLE_LENGTH + 1),
          type: 'TEXT',
        },
      ],
    });

    expect(errors).toEqual([
      {
        field: 'form-title',
        message: `Form title must not exceed ${MAX_FORM_TITLE_LENGTH} characters`,
      },
      {
        field: 'form-description',
        message: `Description must not exceed ${MAX_FORM_DESCRIPTION_LENGTH} characters`,
      },
      {
        field: 'question-q-1-title',
        message: 'Question 1 title is required',
      },
      {
        field: 'question-q-1-type',
        message: 'Question 1 type is required',
      },
      {
        field: 'question-q-2-title',
        message: `Question 2 title must not exceed ${MAX_QUESTION_TITLE_LENGTH} characters`,
      },
    ]);
  });

  it('accepts a valid form draft', () => {
    expect(
      validateFormData({
        title: 'Customer feedback',
        description: 'Quick survey',
        questions: [
          {
            id: 'q-1',
            title: 'How was your day?',
            type: 'TEXT',
          },
        ],
      }),
    ).toEqual([]);
  });
});
