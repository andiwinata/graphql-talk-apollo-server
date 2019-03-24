import { chance, delay } from "./utils";

type City = {
  name: string;
  isWildCatAllowed: boolean;
};

const cities: Array<City> = Array.from(
  { length: 5 },
  (): City => ({
    name: chance.city(),
    isWildCatAllowed: chance.bool({ likelihood: 30 })
  })
);

export const getCount = async () => {
  await delay(200);
  return cities.length;
};

export const getCity = async (name?: string) => {
  await delay(200);
  return name ? cities.find(x => x.name === name) : cities[0];
};
