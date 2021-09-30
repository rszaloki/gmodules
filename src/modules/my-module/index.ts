import * as schema from './schema/my-module.graphql';
import { createModule, gql } from 'graphql-modules';

export const myModule = createModule({
  id: 'my-module',
  dirname: __dirname,
  typeDefs: schema,
  resolvers: {
    Query: {
      user(_, { id }) {
        return {
          _id: id,
          username: 'jhon',
        };
      },
    },
    User: {
      id(user) {
        return user._id;
      },
      username(user) {
        return user.username;
      },
    },
  },
});