// Espionando implementações com jest.spyOn()
//
// Quando usar cada um:
//   jest.fn()      → quando a função NÃO EXISTE ainda (ex: um callback)
//   jest.spyOn()   → quando a função JÁ EXISTE em um objeto e você quer:
//                    a) apenas observar se foi chamada (sem alterar o comportamento)
//                    b) substituir temporariamente a implementação

import { calculator, CalculatorService } from "../src/calculator";

describe("jest.spyOn() — Observando sem substituir", () => {
  it("deve detectar quando o método foi chamado", () => {
    const addSpy = jest.spyOn(calculator, "add");

    const result = calculator.add(2, 3);

    // Verifica que o spy rastreou a chamada
    expect(addSpy).toHaveBeenCalledWith(2, 3);
    expect(addSpy).toHaveBeenCalledTimes(1);

    // A implementação ORIGINAL ainda funciona
    expect(result).toBe(5);

    // Importante: restaurar o método original após o teste
    addSpy.mockRestore();
  });
});

describe("jest.spyOn() — Substituindo temporariamente", () => {
  it("deve permitir substituir o valor de retorno", () => {
    // .mockReturnValue substitui o retorno, .mockImplementation substitui a lógica
    const addSpy = jest.spyOn(calculator, "add").mockReturnValue(999);

    const result = calculator.add(2, 3);

    expect(result).toBe(999); // retorno substituído
    expect(addSpy).toHaveBeenCalled();

    // Restaura a implementação original
    addSpy.mockRestore();

    // Agora a implementação original voltou
    expect(calculator.add(2, 3)).toBe(5);
  });
});

describe("jest.spyOn() — Classes", () => {
  it("deve espionar métodos de uma instância de classe", () => {
    const service = new CalculatorService();
    const addSpy = jest.spyOn(service, "add");

    service.add(10, 5);

    expect(addSpy).toHaveBeenCalledWith(10, 5);
    expect(service.getLogs()).toHaveLength(1);
    expect(service.getLogs()[0]).toContain("add(10, 5) = 15");
  });

  it("deve espionar console.log sem poluir o output do terminal", () => {
    // Caso clássico: spy em console.log para testar se ele foi chamado
    // sem poluir o output do terminal
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    console.log("mensagem de teste");

    expect(consoleSpy).toHaveBeenCalledWith("mensagem de teste");

    consoleSpy.mockRestore();
  });
});

describe("jest.spyOn() — Diferença entre spyOn e mock", () => {
  it("spyOn sem mockImplementation preserva o comportamento original", () => {
    const multiplySpy = jest.spyOn(calculator, "multiply");

    // Comportamento original preservado
    expect(calculator.multiply(3, 4)).toBe(12);
    expect(multiplySpy).toHaveBeenCalled();

    multiplySpy.mockRestore();
  });

  it("spyOn com mockImplementation substitui o comportamento", () => {
    const multiplySpy = jest
      .spyOn(calculator, "multiply")
      .mockImplementation(() => 0); // sempre retorna 0

    expect(calculator.multiply(3, 4)).toBe(0); // comportamento substituído

    multiplySpy.mockRestore();
  });
});
