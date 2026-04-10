import { sum } from "../src/sum";

describe("sum", () => {
  it("deve retornar 4 ao somar 2 e 2", () => {
    expect(sum(2, 2)).toBe(4);
  });

  it("deve retornar 0 ao somar 0 e 0", () => {
    expect(sum(0, 0)).toBe(0);
  });

  it("deve lidar com números negativos", () => {
    expect(sum(-1, 1)).toBe(0);
  });

  it("deve lidar com números grandes", () => {
    expect(sum(1000, 2000)).toBe(3000);
  });
});
