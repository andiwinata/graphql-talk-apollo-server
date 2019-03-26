import { ApolloServer, gql } from "apollo-server";
import { config, chance, delay } from "./shared";

// Animal API

type AnimalAndCity = {
  animal: string;
  cityId: string;
};

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

const getCity = async (id: string): Promise<City> => {
  await delay(500);
  return {
    id,
    name: chance.city(),
    country: chance.country({ full: true })
  };
};

// GraphQL stuffs

const typeDefs = gql`
  type City {
    id: ID!
    name: String!
    country: String!
  }

  type PopularAnimalByCity {
    animal: String!
    city: City!
  }

  type Query {
    popularAnimalByCity: [PopularAnimalByCity!]!
  }
`;

export const server = new ApolloServer({
  ...config,
  typeDefs,
  resolvers: {
    Query: {
      popularAnimalByCity: () => getAnimals() // e.g. [{ animal: 'Lion', cityId: '123' }, { animal: 'Elephant', cityId: '234' }]
    },
    PopularAnimalByCity: {
      // parent is e.g. { animal: 'Lion', cityId: '123' }
      animal: parent => parent.animal,
      city: parent => getCity(parent.cityId)
    }
  }
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
