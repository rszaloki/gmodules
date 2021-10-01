import * as schema from './schema.graphql';
import { createModule, gql } from 'graphql-modules';
import { UserModule } from './generated';
import { getUser } from '../../db';

const resolvers:UserModule.Resolvers = {
  Query: {
    async user(_, { id }) {
      const userResult = await getUser(id);
      return userResult;
    },
  },
  User: {
    id(user) {
      return user.id;
    },
    username(user) {
      return user.username;
    },
  },

}

export const userModule = createModule({
  id: 'user',
  dirname: __dirname,
  typeDefs: schema,
  resolvers
});