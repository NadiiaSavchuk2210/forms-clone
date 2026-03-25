# Google Forms Lite Clone

Monorepo application that recreates the core Google Forms flow:

- create a form
- fill a form
- submit answers
- review submitted responses

The project uses a typed GraphQL API on the server, RTK Query on the client, and shared TypeScript contracts across packages.

## Tech Stack

- `client`: React, TypeScript, Vite, Redux Toolkit, RTK Query, React Router
- `server`: Node.js, Apollo Server 5, GraphQL
- `shared`: shared domain types used by client and server
- storage: in-memory arrays on the server

## Monorepo Structure

```text
.
├── client   # React app
├── server   # GraphQL API
├── shared   # Shared TypeScript types
└── package.json
```

## Features

### Back-End

- GraphQL schema with:
  - `Form`
  - `Question`
  - `Response`
  - `Answer`
- Queries:
  - `forms`
  - `form(id: ID!)`
  - `responses(formId: ID!)`
- Mutations:
  - `createForm(title, description, questions)`
  - `submitResponse(formId, answers)`
- In-memory storage
- Validation for form creation and response submission
- Unit tests for resolvers

### Front-End

- Homepage with list of forms
- Form builder for creating new forms
- Support for:
  - text questions
  - multiple choice questions
  - checkbox questions
  - date questions
- Add, remove and reorder questions in the builder
- Add and remove options for multiple choice and checkbox questions
- Form filling page
- Responses page with answers mapped back to question titles
- RTK Query for GraphQL requests and caching
- GraphQL code generation
- Basic client-side validation and loading/error states

## Requirements

- Node.js `20+`
- npm `10+`

## Installation

Install all workspace dependencies from the root:

```bash
npm install
```

## Development

Run client and server together:

```bash
npm run dev
```

Available local apps:

- client: `http://localhost:5173`
- server: `http://localhost:4000/graphql`

## Available Scripts

From the repository root:

```bash
npm run dev
npm run build
npm run test
npm run type-check
npm run codegen
```

What they do:

- `npm run dev` starts client and server concurrently
- `npm run build` builds `shared`, `server`, and `client`
- `npm run test` runs server and client tests
- `npm run type-check` runs TypeScript checks in all workspaces
- `npm run codegen` regenerates GraphQL types and RTK Query endpoints

## GraphQL Codegen

Client API types are generated from:

- GraphQL operations in `client/src/shared/api/graphql/forms.graphql`
- GraphQL schema in `server/src/schema.ts`

Run this after changing GraphQL schema or GraphQL operations:

```bash
npm run codegen
```

## How Data Storage Works

The server stores forms and responses in memory:

- data exists while the server process is running
- data is cleared after server restart
- no database setup is required

This behavior is intentional for the test task.

## Testing

Implemented automated checks:

- server unit tests for GraphQL resolvers
- client unit tests for RTK Query GraphQL integration
- full monorepo type-check
- production build verification

Run everything:

```bash
npm run test
npm run type-check
npm run build
```

## API Summary

### Query `forms`

Returns all forms.

### Query `form(id: ID!)`

Returns one form by id.

### Query `responses(formId: ID!)`

Returns all responses for a specific form.

### Mutation `createForm(...)`

Creates a new form with a list of questions.

### Mutation `submitResponse(...)`

Stores a response for a specific form.

## Notes

- No authentication is implemented, as required by the task.
- The project is intentionally split into `client`, `server`, and `shared`.
- Shared typing helps keep GraphQL-related client and server code aligned.
