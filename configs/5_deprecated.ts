import { ApolloServer, gql } from "apollo-server-express";
import { config } from "./shared";

/**
 * - Fragment
 * - Different file for each query and fragment
 * - Sharing fragment by importing
 */

export const typeDefs = gql`
  type Query {
    progress: Progress!
    plan: Plan!
  }

  type Progress {
    status: String!
    progressNum: Float!
  }

  type Plan {
    name: String!
    progress: Progress
      @deprecated(
        reason: "Use top level progress; note: this directive is not in official spec"
      )
  }
`;

export const resolvers = {
  Query: {
    progress: () => ({ args: 'top level' }),
    plan: () => ({})
  },
  Progress: {
    status: (parent) => `${parent.args}: IN_PROGRESS`,
    progressNum: () => 50.12
  },
  Plan: {
    name: () => "plan name",
    progress: () => ({ args: 'inside plan' })
  },
};

export const server = new ApolloServer({
  ...config,
  typeDefs,
  resolvers
});

/*

query first {
  progress {
    ...progressExample
  }
}

fragment progressExample on Progress {
  status
  progressNum
}

query second {
  plan {
    name
    progress {
      ...progressExample
    }
  }
}

*/
