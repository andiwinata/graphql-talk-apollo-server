import { ApolloServer, gql } from "apollo-server-express";
import { config } from "./shared";

/**
 * - Declaration of type
 * - 1 way to resolve type is by return object
 * - other way is to create root resolver in the root
 * - Child resolver will get access to parent resolver return value
 * - GraphQL Named query and variable
 */

export const typeDefs = gql`
  type Query {
    """
    Returns plan
    """
    plan(id: ID!): Plan
    """
    Returns progress of plan id
    """
    progress(id: ID!): Progress
  }

  type Plan {
    id: ID!
    name: String!
  }

  type Progress {
    status: String!
    progressNum: Float!
  }
`;

export const resolvers = {
  Query: {
    plan: () => ({
      id: "plan-id-1",
      name: "this is plan name"
    }),
    progress: () => ({ baseProgress: 20 })
  },
  Progress: {
    status: () => "IN_PROGRESS",
    progressNum: parent => parent.baseProgress + 10.5
  }
};

export const server = new ApolloServer({
  ...config,
  typeDefs,
  resolvers
});

/*

query first {
  plan(id: "123") {
    id
  }
}

query second {
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
    progressNum
  }
}
{
  "id": "123"
}
*/
