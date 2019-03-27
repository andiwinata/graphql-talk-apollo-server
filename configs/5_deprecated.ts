import { ApolloServer, gql } from "apollo-server-express";
import { config } from "./shared";

/**
 * - Fragment
 * - Different file for each query and fragment
 * - Sharing fragment by importing
 */

export const typeDefs = gql`
  type Progress {
    status: String!
    progress: Float!
  }

  type Plan {
    name: String!
    progress: Progress
      @deprecated(
        reason: "Use top level progress; note: this directive is not in official spec"
      )
  }

  type Query {
    progress: Progress!
    plan: Plan!
  }
`;

export const resolvers = {
  Query: {
    progress: () => ({}),
    plan: () => ({})
  },
  Plan: {
    name: () => "plan name",
    progress: () => ({})
  },
  Progress: {
    status: () => "IN_PROGRESS",
    progress: () => 50.12
  }
};

export const server = new ApolloServer({
  ...config,
  typeDefs,
  resolvers
});

/*

query first {
  plan {
    name
    progress {
      ...progressExample
    }
  }
}

query second {
   progress {
    ...progressExample
  }
}

fragment progressExample on Progress {
  status
  progress
}

*/
