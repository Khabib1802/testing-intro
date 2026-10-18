const products = require("../../src/data/products");
const { filterByCategory } = require("../../src/catalog");

describe("filterByCategory", () => {
  test("'all' возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    expect(filterByCategory(products, "all")).toEqual(products);
  });

  test("undefined возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    expect(filterByCategory(products, undefined)).toEqual(products);
  });

  test("пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    expect(filterByCategory(products, "")).toEqual(products);
  });

  test("'electronics' возвращает товары с ID [1, 2]", () => {
    expect(filterByCategory(products, "electronics")).toEqual([
      products.find((p) => p.id === 1),
      products.find((p) => p.id === 2),
    ]);
  });

  test("'books' возвращает товары с ID [3, 6]", () => {
    expect(filterByCategory(products, "books")).toEqual([
      products.find((p) => p.id === 3),
      products.find((p) => p.id === 6),
    ]);
  });

  test("'home' возвращает товары с ID [4, 5]", () => {
    expect(filterByCategory(products, "home")).toEqual([
      products.find((p) => p.id === 4),
      products.find((p) => p.id === 5),
    ]);
  });

  test("'clothes' возвращает пустой массив", () => {
    expect(filterByCategory(products, "clothes")).toEqual([]);
  });

  test("'toys' возвращает пустой массив", () => {
    expect(filterByCategory(products, "toys")).toEqual([]);
  });

  test("'sports' возвращает пустой массив", () => {
    expect(filterByCategory(products, "sports")).toEqual([]);
  });
});
