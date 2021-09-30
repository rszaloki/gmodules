import * as schema from './schema.graphql';
import { createModule, gql } from 'graphql-modules';
import { UserModule } from './generated';


const resolvers:UserModule.Resolvers = {
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

}

export const myModule = createModule({
  id: 'user',
  dirname: __dirname,
  typeDefs: schema,
  resolvers
});