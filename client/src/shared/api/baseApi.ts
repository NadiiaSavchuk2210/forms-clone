import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { DocumentNode } from 'graphql';
import { print } from 'graphql';

import { API_BASE_URL } from '@/shared/constants';

import type { GraphQLError, GraphQLRequest, GraphQLResponse } from './types';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const graphqlBaseQuery: BaseQueryFn<GraphQLRequest, unknown, GraphQLError> =
  async ({ document, variables }, api, extraOptions) => {
    const query = typeof document === 'string' || document instanceof String
      ? document.toString()
      : print(document as unknown as DocumentNode);

    const result = await rawBaseQuery(
      {
        url: '',
        method: 'POST',
        body: {
          query,
          variables,
        },
      },
      api,
      extraOptions,
    );

    if (result.error) {
      return {
        error: {
          status: Number(result.error.status) || 500,
          data:
            typeof result.error.data === 'string'
              ? result.error.data
              : JSON.stringify(result.error.data ?? 'Server error'),
        },
      };
    }

    const response = result.data as GraphQLResponse;
    if (response.errors?.length) {
      return {
        error: {
          status: 400,
          data: response.errors.map((item) => item.message).join('; '),
        },
      };
    }

    return { data: response.data };
  };

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: graphqlBaseQuery,
  tagTypes: ['Forms', 'Form', 'Responses'],
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
