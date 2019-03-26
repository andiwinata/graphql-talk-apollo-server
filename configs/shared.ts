import Chance from "chance";

export const config = {
  playground: {
    settings: {
      "editor.theme": "light"
    } as any
  }
};


export const chance = new Chance(1111);

export const delay = (t: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, t);
  });
