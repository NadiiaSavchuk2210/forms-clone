import test from 'node:test';
import assert from 'node:assert/strict';

import { resolvers } from './resolvers';
import { forms, responses } from './database';
import { QuestionType } from '../../shared/src/types';

test.beforeEach(() => {
  forms.splice(0, forms.length);
  responses.splice(0, responses.length);
});

test('createForm creates normalized form data with generated question ids', () => {
  const created = resolvers.Mutation.createForm(undefined as never, {
    title: '  My Form  ',
    description: '  Desc  ',
    questions: [
      { title: '  Text Q  ', type: QuestionType.TEXT },
      {
        title: '  MC Q  ',
        type: QuestionType.MULTIPLE_CHOICE,
        options: ['  A  ', 'B', '   '],
      },
    ],
  });

  assert.equal(created.title, 'My Form');
  assert.equal(created.description, 'Desc');
  assert.equal(created.questions.length, 2);
  assert.ok(created.questions[0].id);
  assert.equal(created.questions[0].title, 'Text Q');
  assert.equal(created.questions[0].type, QuestionType.TEXT);
  assert.deepEqual(created.questions[0].options, []);

  assert.equal(created.questions[1].title, 'MC Q');
  assert.deepEqual(created.questions[1].options, ['A', 'B']);
  assert.equal(forms.length, 1);
});

test('createForm rejects forms without questions', () => {
  assert.throws(
    () => {
      resolvers.Mutation.createForm(undefined as never, {
        title: 'Bad Form',
        description: 'Desc',
        questions: [],
      });
    },
    /Form must have at least one question/,
  );
});

test('createForm rejects duplicate options for choice questions', () => {
  assert.throws(
    () => {
      resolvers.Mutation.createForm(undefined as never, {
        title: 'Bad Form',
        questions: [
          {
            title: 'Pick one',
            type: QuestionType.MULTIPLE_CHOICE,
            options: ['A', 'A'],
          },
        ],
      });
    },
    /options must be unique/,
  );
});

test('submitResponse stores normalized answers for valid form responses', () => {
  const form = resolvers.Mutation.createForm(undefined as never, {
    title: 'F',
    questions: [{ title: 'Q', type: QuestionType.TEXT }],
  });

  const questionId = form.questions[0].id;
  const response = resolvers.Mutation.submitResponse(undefined as never, {
    formId: ` ${form.id} `,
    answers: [{ questionId: ` ${questionId} `, value: ['  hello  '] }],
  });

  assert.equal(response.formId, form.id);
  assert.equal(response.answers[0].questionId, questionId);
  assert.deepEqual(response.answers[0].value, ['hello']);
  assert.equal(responses.length, 1);
});

test('submitResponse rejects answers with unknown question ids', () => {
  const form = resolvers.Mutation.createForm(undefined as never, {
    title: 'F',
    questions: [{ title: 'Q', type: QuestionType.TEXT }],
  });

  assert.throws(
    () => {
      resolvers.Mutation.submitResponse(undefined as never, {
        formId: form.id,
        answers: [{ questionId: 'bad-question', value: ['x'] }],
      });
    },
    /does not match form questions/,
  );
});

test('submitResponse rejects invalid multiple choice values', () => {
  const form = resolvers.Mutation.createForm(undefined as never, {
    title: 'F',
    questions: [
      {
        title: 'Pick one',
        type: QuestionType.MULTIPLE_CHOICE,
        options: ['A', 'B'],
      },
    ],
  });

  assert.throws(
    () => {
      resolvers.Mutation.submitResponse(undefined as never, {
        formId: form.id,
        answers: [{ questionId: form.questions[0].id, value: ['Z'] }],
      });
    },
    /contains an invalid option/,
  );
});

test('queries return saved forms, single form, and matching responses', () => {
  const form = resolvers.Mutation.createForm(undefined as never, {
    title: 'F',
    questions: [{ title: 'Q', type: QuestionType.TEXT }],
  });

  const questionId = form.questions[0].id;
  resolvers.Mutation.submitResponse(undefined as never, {
    formId: form.id,
    answers: [{ questionId, value: ['x'] }],
  });

  const formList = resolvers.Query.forms();
  assert.equal(formList.length, 1);
  assert.equal(formList[0].id, form.id);

  const fetchedForm = resolvers.Query.form(undefined as never, { id: form.id });
  assert.ok(fetchedForm);
  assert.equal(fetchedForm.id, form.id);

  const formResponses = resolvers.Query.responses(undefined as never, {
    formId: form.id,
  });
  assert.equal(formResponses.length, 1);
  assert.equal(formResponses[0].answers[0].value[0], 'x');
});
