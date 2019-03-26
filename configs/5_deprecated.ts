import { ApolloServer, gql } from "apollo-server";
import { config } from "./shared";

const typeDefs = gql`
  type Progress {
    status: String!
    progress: Float!
  }

  type Plan {
    name: String!
    progress: Progress @deprecated(reason: "Use top level progress; note: this directive is not in official spec")
  }

  type Query {
    progress: Progress!
    plan: Plan!
  }
`;

export const server = new ApolloServer({
  ...config,
  typeDefs,
  resolvers: {
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
  }
});

/*

query {
  plan {
    name
		progress {
      status
      progress
    }
  }
  
  progress {
    status
  }
}

*/
