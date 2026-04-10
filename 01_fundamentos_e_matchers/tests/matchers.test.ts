// Arsenal de matchers além de .toBe() e .toEqual()
// Referência completa: https://jestjs.io/docs/expect

import {
  createUser,
  getFruits,
  getNumbers,
  getConfig,
  greet,
} from "../src/matchers-examples";

describe("Matchers — Igualdade", () => {
  it("toBe: verifica igualdade primitiva (usa Object.is)", () => {
    expect(1 + 1).toBe(2);
    expect("hello").toBe("hello");
  });

  it("toEqual: verifica igualdade profunda de objetos/arrays", () => {
    const user1 = createUser();
    const user2 = createUser(); // mesmas propriedades, instâncias diferentes

    expect(user1).toEqual(user2); // ✅ passa — compara os valores
    expect(user1).not.toBe(user2); // ✅ passa — são objetos diferentes na memória
  });
});

describe("Matchers — Objetos", () => {
  it("toHaveProperty: verifica a existência (e valor) de uma propriedade", () => {
    const user = createUser();

    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("name", "Renan");
    expect(user).toHaveProperty("role", "user");
  });

  it("toMatchObject: verifica subconjunto de propriedades", () => {
    const user = createUser();

    // Não precisa incluir todas as propriedades — só as que importam
    expect(user).toMatchObject({ name: "Renan", age: 30 });
  });
});

describe("Matchers — Números", () => {
  it("toBeGreaterThan / toBeLessThan", () => {
    const user = createUser();

    expect(user.age).toBeGreaterThan(18);
    expect(user.age).toBeLessThan(100);
    expect(user.age).toBeGreaterThanOrEqual(30);
  });

  it("toBeCloseTo: para comparar números de ponto flutuante", () => {
    // 0.1 + 0.2 === 0.30000000000000004 em JavaScript!
    expect(0.1 + 0.2).toBeCloseTo(0.3);
  });
});

describe("Matchers — Strings", () => {
  it("toContain: verifica se a string contém uma substring", () => {
    const greeting = greet("Renan");

    expect(greeting).toContain("Renan");
    expect(greeting).toContain("Falaê");
  });

  it("toMatch: verifica se a string corresponde a um padrão (regex)", () => {
    const email = "renan@example.com";

    expect(email).toMatch(/@/);
    expect(email).toMatch(/example\.com$/);
    expect("Christoph").toMatch(/stop/);
  });
});

describe("Matchers — Arrays", () => {
  it("toContain: verifica se o array contém um item", () => {
    const fruits = getFruits();

    expect(fruits).toContain("banana");
    expect(fruits).not.toContain("grape");
  });

  it("toHaveLength: verifica o tamanho do array", () => {
    const fruits = getFruits();
    const numbers = getNumbers();

    expect(fruits).toHaveLength(3);
    expect(numbers).toHaveLength(5);
  });

  it("arrayContaining: verifica se o array contém determinados itens (em qualquer ordem)", () => {
    const fruits = getFruits();

    expect(fruits).toEqual(expect.arrayContaining(["orange", "apple"]));
  });
});

describe("Matchers — Nulos e Indefinidos", () => {
  it("toBeNull / toBeUndefined / toBeDefined", () => {
    const config = getConfig();

    expect(config.database).toBeNull();
    expect(config.host).toBeDefined();
    expect(config.host).not.toBeNull();

    const user = createUser({ email: null });
    expect(user.email).toBeNull();
  });

  it("toBeTruthy / toBeFalsy", () => {
    expect("texto").toBeTruthy();
    expect(1).toBeTruthy();
    expect(0).toBeFalsy();
    expect("").toBeFalsy();
    expect(null).toBeFalsy();
  });
});
