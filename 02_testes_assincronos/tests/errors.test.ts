// Testando o caminho infeliz — erros e exceções
// Matcher principal: .toThrow()
//
// REGRA IMPORTANTE: a função que lança o erro deve ser envolvida em outra função:
//   ❌ expect(divide(10, 0)).toThrow()     → Jest captura ANTES do expect
//   ✅ expect(() => divide(10, 0)).toThrow() → Jest controla a execução

import { divide, sqrt, ValidationError } from "../src/divide";

describe("divide", () => {
  it("deve dividir corretamente no caminho feliz", () => {
    expect(divide(10, 2)).toBe(5);
    expect(divide(9, 3)).toBe(3);
  });

  it("toThrow(): verifica se algum erro foi lançado", () => {
    expect(() => divide(10, 0)).toThrow();
  });

  it("toThrow(mensagem): verifica a mensagem do erro", () => {
    expect(() => divide(10, 0)).toThrow("Não é possível dividir por zero.");
  });

  it("toThrow(regex): verifica a mensagem com expressão regular", () => {
    expect(() => divide(10, 0)).toThrow(/dividir por zero/i);
  });

  it("toThrow(ClasseDeErro): verifica o TIPO do erro lançado", () => {
    // Isso é mais específico: só passa se o erro for uma instância de ValidationError
    expect(() => divide(10, 0)).toThrow(ValidationError);
  });
});

describe("sqrt", () => {
  it("deve retornar a raiz quadrada correta", () => {
    expect(sqrt(9)).toBe(3);
    expect(sqrt(16)).toBe(4);
  });

  it("deve lançar RangeError para números negativos", () => {
    expect(() => sqrt(-1)).toThrow(RangeError);
    expect(() => sqrt(-1)).toThrow("Não é possível calcular a raiz quadrada");
  });
});
