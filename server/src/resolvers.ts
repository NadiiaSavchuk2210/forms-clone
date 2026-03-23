import { v4 as uuid } from 'uuid';
import { Form, Response, Question, QuestionType } from '@shared/types';
import { validateForm, validateResponse } from './utils/validation';
import { forms, responses } from './database';

export const resolvers = {
  Query: {
    forms: () => forms,
    form: (_: unknown, { id }: { id: string }) =>
      forms.find((f) => f.id === id),

    responses: (_: unknown, { formId }: { formId: string }) =>
      responses.filter((r) => r.formId === formId),
  },

  Mutation: {
    createForm: (
      _: unknown,
      args: {
        title: string;
        description?: string;
        questions?: Array<{ title: string; type: string; options?: string[] }>;
      },
    ): Form => {
      const validation = validateForm(args);
      if (!validation.valid) {
        throw new Error(validation.error || 'Form validation failed');
      }

      const questionsWithIds = (args.questions || []).map((q) => ({
        ...q,
        id: uuid(),
        type: q.type as QuestionType,
      }));

      const newForm: Form = {
        id: uuid(),
        title: args.title,
        description: args.description,
        questions: questionsWithIds as Question[],
      };
      forms.push(newForm);
      return newForm;
    },

    submitResponse: (
      _: unknown,
      { formId, answers }: { formId: string; answers: Response['answers'] },
    ): Response => {
      const form = forms.find((f) => f.id === formId);
      const validation = validateResponse({ formId, answers }, form);
      if (!validation.valid) {
        throw new Error(validation.error || 'Response validation failed');
      }

      const newResponse: Response = {
        id: uuid(),
        formId,
        answers,
      };
      responses.push(newResponse);
      return newResponse;
    },
  },
};
