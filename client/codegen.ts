import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',

  documents: ['src/**/*.graphql'],

  generates: {
    './src/shared/api/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-rtk-query'],
      config: {
        fetcher: 'fetch',
      },
    },
  },
};

export default config;
