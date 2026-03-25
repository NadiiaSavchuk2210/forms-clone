import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  require: ['ts-node/register'],
  schema: '../server/src/schema.ts',
  documents: ['src/**/*.graphql'],
  generates: {
    'src/shared/api/generated/index.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-rtk-query'],
      config: {
        importBaseApiFrom: '../baseApi',
        importBaseApiAlternateName: 'baseApi',
        exportHooks: true,
        addTagTypes: true,
        documentMode: 'string',
      },
    },
  },
};

export default config;
