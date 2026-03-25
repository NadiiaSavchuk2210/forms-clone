export const CREATE_FORM = `
  mutation CreateForm(
    $title: String!
    $description: String
    $questions: [QuestionInput]
  ) {
    createForm(
      title: $title
      description: $description
      questions: $questions
    ) {
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
