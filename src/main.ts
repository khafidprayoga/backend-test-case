import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { resolvers } from './resolver';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers,
    nullableByDefault: true,
  });

  const apolloServer = new ApolloServer({
    schema,
    includeStacktraceInErrorResponses: true,
  });

  const { url } = await startStandaloneServer(apolloServer, {
    listen: {
      port: 4000,
    },
  });

  console.log(`GraphQL server ready at ${url}`);
};

bootstrap();
