import 'graphql-import-node';
import { ApolloServer } from 'apollo-server';
import { application } from './application';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

const schema = application.createSchemaForApollo();

const server = new ApolloServer({
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],  schema,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});