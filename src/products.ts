export type Product = {
  "id"?: number,
  "name": string,
  "desc": string
}

export const productsList: Product[] = [{
  id: 0,
  name: "Toyota",
  desc: "This is the best car in the world!"
}, {
  id: 1,
  name: "Fiat",
  desc: "This is the most economical car in the world!"
}];

const findHighestId = (): number => Math.max(...(productsList.map((p) => p.id)));

export const createNewProductFromData = (data: Product): Product => {
  return {
    id: findHighestId() + 1,
    ...data
  }
};
