import type { DocumentNode } from 'graphql';

type StringLike = {
  toString(): string;
};

export interface GraphQLResponse<T = unknown> {
  data?: T;
  errors?: Array<{ message: string; extensions?: Record<string, unknown> }>;
}

export interface GraphQLRequest<TVariables = Record<string, unknown>> {
  document: string | DocumentNode | StringLike;
  variables?: TVariables | void;
}

export interface GraphQLError {
  status: number;
  data: string;
}
