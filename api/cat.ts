import { chance, delay } from "./utils";

type Cat = {
  name: string;
  isCute: boolean;
};

const cats: Array<Cat> = Array.from({ length: 5 }, () => ({
  name: chance.first(),
  isCute: chance.bool({ likelihood: 30 })
}));

export const getCount = async () => {
  await delay(500);
  return cats.length;
};

export const getCat = async (name?: string) => {
  await delay(500);
  return name ? cats.find(x => x.name === name) : cats[0];
};

export const getCatId = async (id: number) => {
  if (id >= cats.length) {
    return undefined;
  }

  await delay(200);
  return cats[id];
};
