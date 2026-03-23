import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: PORT },
  context: async () => ({}),
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
