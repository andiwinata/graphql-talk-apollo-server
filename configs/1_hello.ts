import { ApolloServer, gql } from "apollo-server";
import { config } from "./shared";

const typeDefs = gql`
  type Query {
    hello: String!
    echo(msg: String!): String!
  }
`;

export const server = new ApolloServer({
  ...config,
  typeDefs,
  resolvers: {
    Query: {
      hello: () => "Hello world!",
      echo: (_parent, args) => `Echoing: ${args.msg}`
    }
  }
});

/*

query {
	hello
}

# 2 endpoints
query {
	hello
  echo(msg: "hey")
}

*/
