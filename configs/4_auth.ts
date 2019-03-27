import { ApolloServer, gql, AuthenticationError } from "apollo-server-express";
import { config } from "./shared";

export const typeDefs = gql`
  type Query {
    protected: String!
  }
`;

export const resolvers = {
  Query: {
    protected: (_parent, _args, context) => {
      if (!context.token) {
        throw new AuthenticationError("no token exists");
      }
      return `Your token is ${context.token}`;
    }
  }
};

export const server = new ApolloServer({
  ...config,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization;
    return { token };
  },
  typeDefs,
  resolvers
});

/*

query {
  protected
}

{
  "authorization": "1234"
}

*/
