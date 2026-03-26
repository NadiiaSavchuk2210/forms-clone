import type { DocumentNode } from 'graphql';

type StringLike = {
  toString(): string;
};

export interface GraphQLRequest {
  document: string | DocumentNode | StringLike;
  variables?: Record<string, unknown> | void;
}

export interface GraphQLError {
  status: number;
  data: string;
}

export interface GraphQLResponse {
  data?: unknown;
  errors?: Array<{ message: string }>;
}
