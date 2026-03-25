export const GET_FORMS = `
  query GetForms {
    forms {
      id
      title
      description
      questions {
        id
        title
        type
        options
      }
    }
  }
`;

export const GET_FORM = `
  query GetForm($id: ID!) {
    form(id: $id) {
      id
      title
      description
      questions {
        id
        title
        type
        options
      }
    }
  }
`;
