import { ApolloServer, gql } from "apollo-server-express";
import { config, chance, delay } from "./shared";

/**
 * - Composing multiple API to 1 query
 */

// Animal API

type AnimalAndCity = {
  animal: string;
  cityId: string;
};

// [{ animal: 'Lion', cityId: '123' }, { animal: 'Elephant', cityId: '234' }]
const getAnimals = async (): Promise<Array<AnimalAndCity>> => {
  await delay(500);
  return Array.from({ length: 5 }, (_, id) => ({
    animal: chance.animal(),
    cityId: id.toString()
  }));
};

// City API

type City = {
  id: string;
  name: string;
  country: string;
};

// { id: "123", name: "Sydney", country: "USA" }
const getCity = async (id: string): Promise<City> => {
  await delay(500);
  return {
    id,
    name: chance.city(),
    country: chance.country({ full: true })
  };
};

// GraphQL stuffs

export const typeDefs = gql`
  type Query {
    popularAnimalByCity: [PopularAnimalByCity!]!
  }

  type PopularAnimalByCity {
    animal: String!
    city: City!
  }

  type City {
    id: ID!
    name: String!
    country: String!
  }
`;

export const resolvers = {
  Query: {
    popularAnimalByCity: () => getAnimals() // e.g. [{ animal: 'Lion', cityId: '123' }, { animal: 'Elephant', cityId: '234' }]
  },
  PopularAnimalByCity: {
    // parent is e.g. { animal: 'Lion', cityId: '123' }
    animal: parent => parent.animal,
    city: parent => getCity(parent.cityId)
  }
};

export const server = new ApolloServer({
  ...config,
  typeDefs,
  resolvers
});

/*

query {
  popularAnimalByCity {
    animal
    city {
      id
      name
      country
    }
  }
}

*/
