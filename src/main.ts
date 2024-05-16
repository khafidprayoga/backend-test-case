import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { resolvers } from './resolver';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { container } from 'tsyringe';
import { incomingContextHandler } from './common/net/request.context';

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers,
    nullableByDefault: false,
    container: {
      get: cls => container.resolve(cls),
    },
  });

  const apolloServer = new ApolloServer({
    schema,
    includeStacktraceInErrorResponses: true,
  });

  const { url } = await startStandaloneServer(apolloServer, {
    listen: {
      port: 4000,
    },
    context: incomingContextHandler,
  });

  console.log(`GraphQL server ready at ${url}`);
};

bootstrap();
