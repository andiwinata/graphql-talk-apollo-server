import { ApolloServer, gql, AuthenticationError } from "apollo-server";
import { config } from "./shared";

const typeDefs = gql`
  type Query {
    protected: String!
  }
`;

export const server = new ApolloServer({
  ...config,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization;
    return { token };
  },
  typeDefs,
  resolvers: {
    Query: {
      protected: (_parent, _args, context) => {
        if (!context.token) {
          throw new AuthenticationError("no token exists");
        }
        return `Your token is ${context.token}`;
      }
    }
  }
});

/*

query {
  protected
}

{
  "authorization": "1234"
}

*/
