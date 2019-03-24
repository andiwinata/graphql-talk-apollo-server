import { ApolloServer, gql } from "apollo-server";
import { getCat } from "../api/cat";
import { config } from './shared';

const simpleSchema = gql`
  type Field4 {
    nestedField1: Boolean
  }

  type Simple {
    field1: ID!
    field2: String
    field3: Int!
    field4: Field4!
  }

  type Simple2 {
    field1: String
    field2: Float!
    fieldWithAuth: String!
  }
`;

const catSchema = gql`
  type Cat {
    name: String
    isCute: Boolean
  }
`;

const typeDefs = gql`
  ${simpleSchema}
  ${catSchema}

  type Query {
    hello: String!
    simple2: Simple2!
    simple: Simple!
    cat: [Cat!]
    getCat(id: String): Cat
  }
`;

export const server = new ApolloServer({
  ...config,
  typeDefs,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || "";
    return { token };
  },
  resolvers: {
    Query: {
      hello: () => "Hello world!",

      simple2: (_parent, _args, context) => ({
        field1: "Simple 2 field 1",

        field2: Promise.resolve(15.23),
        
        fieldWithAuth: context.token || "no token provided"
      }),

      simple: () => ({}),

      cat: async () => {
        return [await getCat()];
      }
    },
    Field4: {
      nestedField1: ({ param }) => param === "hehe"
    },
    Simple: {
      field1: () => "ThisIsId",
      field2: () => null,
      field3: () => Promise.resolve(5),
      field4: () => ({ param: "hehe", nestedField1: "overriden by children" })
    },
  },
});

/*
Query example:

query {
  simple {
    field1
    field2
    field3
    field4 {
      nestedField1
    }
  }
}

*/
