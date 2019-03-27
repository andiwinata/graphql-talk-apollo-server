import { ApolloServer, gql } from "apollo-server-express";
import { config } from "./shared";

export const typeDefs = gql`
  type Query {
    hello: String!
    echo(msg: String!): String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    echo: (_parent, args) => `Echoing: ${args.msg}`
  }
};

export const server = new ApolloServer({
  ...config,
  typeDefs,
  resolvers
});

/*

query first {
	hello
}

# 2 endpoints
query second {
	hello
  echo(msg: "hey")
}

*/
