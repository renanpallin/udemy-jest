const sum = require("./sum");

describe("Função soma", () => {
  test("soma 1 + 2 para ser igual a 3", () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });

  test("soma 5 + 10 para ser igual a 15", () => {
    const result = sum(5, 10);
    expect(result).toBe(15);
  });

  test("soma -1 + -2 para ser igual a -3", () => {
    const result = sum(-1, -2);
    expect(result).toBe(-3);
  });
});
