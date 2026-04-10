// Hooks — beforeEach e afterAll
//
// O PROBLEMA que os hooks resolvem:
//   Sem beforeEach: cada teste precisaria de `const calculator = new Calculator()`
//   O histórico de um teste "vazaria" para o próximo se a instância fosse compartilhada.
//
// SOLUÇÃO: beforeEach garante uma instância nova (e limpa) antes de CADA teste.
// afterAll executa UMA VEZ depois de TODOS os testes (ex: fechar conexão com banco).

import { Calculator } from "../src/Calculator";

describe("Calculator", () => {
  let calculator: Calculator;

  // beforeEach: executa ANTES de cada it(). Garante uma instância limpa.
  beforeEach(() => {
    calculator = new Calculator();
  });

  // afterAll: executa UMA VEZ depois de todos os testes do describe.
  // Exemplo de uso real: fechar conexão com banco de dados.
  afterAll(() => {
    // database.close();
  });

  it("deve somar dois números corretamente", () => {
    expect(calculator.add(2, 3)).toBe(5);
  });

  it("deve subtrair dois números corretamente", () => {
    expect(calculator.subtract(10, 4)).toBe(6);
  });

  it("deve multiplicar dois números corretamente", () => {
    expect(calculator.multiply(3, 4)).toBe(12);
  });

  it("deve dividir dois números corretamente", () => {
    expect(calculator.divide(10, 2)).toBe(5);
  });

  it("deve lançar erro ao dividir por zero", () => {
    expect(() => calculator.divide(10, 0)).toThrow(
      "Não é possível dividir por zero.",
    );
  });

  it("deve registrar o histórico de operações", () => {
    calculator.add(2, 3);
    calculator.subtract(10, 4);

    expect(calculator.getHistory()).toEqual([5, 6]);
  });

  it("deve começar com histórico vazio (isolamento garantido pelo beforeEach)", () => {
    // Se não houvesse beforeEach, o teste anterior teria "contaminado" o histórico
    expect(calculator.getHistory()).toEqual([]);
  });
});
