import Chance from "chance";

export const chance = new Chance(1111);

export const delay = (t: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, t);
  });
