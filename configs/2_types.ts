import { ApolloServer, gql } from "apollo-server";
import { config } from "./shared";

/**
 * - Declaration of type
 * - 1 way to resolve type is by return object
 * - other way is to create root resolver in the root
 * - Child resolver will get access to parent resolver return value
 * - GraphQL Named query and variable
 */

const typeDefs = gql`
  type Plan {
    id: ID!
    name: String!
  }

  type Progress {
    status: String!
    progress: Float!
  }

  type Query {
    plan(id: ID!): Plan
    progress(id: ID!): Progress
  }
`;

export const server = new ApolloServer({
  ...config,
  typeDefs,
  resolvers: {
    Query: {
      plan: () => ({
        id: "plan-id-1",
        name: "this is plan name"
      }),
      progress: () => ({ baseProgress: 20 })
    },
    Progress: {
      status: () => "IN_PROGRESS",
      progress: (parent) => parent.baseProgress + 10.5
    }
  }
});

/*

query {
  plan(id: "123") {
    id
  }
}

query {
  plan(id: "123") {
    id
    name
  }
}

query GetPlanProgress($id: ID!) {
  plan(id: $id) {
    id
    name
  }
  
  progress(id: $id) {
    status
    progress
  }
}
{
  "id": "123"
}
*/
