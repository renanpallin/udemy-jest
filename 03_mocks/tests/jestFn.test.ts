// Criando seu primeiro mock com jest.fn()
// jest.fn() cria uma "função espiã" que rastreia:
//   - Quantas vezes foi chamada (.mock.calls.length)
//   - Com quais argumentos foi chamada (.mock.calls[i])
//   - O que retornou (.mock.results[i])

import { forEach } from "../src/forEach";

describe("jest.fn() — Rastreando chamadas", () => {
  it("deve rastrear quantas vezes o callback foi chamado", () => {
    const mockCallback = jest.fn();
    forEach([1, 2, 3], mockCallback);

    expect(mockCallback).toHaveBeenCalledTimes(3);
    // Equivale a: expect(mockCallback.mock.calls.length).toBe(3)
  });

  it("deve rastrear com quais argumentos o callback foi chamado", () => {
    const mockCallback = jest.fn();
    forEach([10, 20], mockCallback);

    expect(mockCallback).toHaveBeenCalledWith(10);
    expect(mockCallback).toHaveBeenCalledWith(20);

    // Inspecionando manualmente o objeto .mock
    expect(mockCallback.mock.calls[0][0]).toBe(10);
    expect(mockCallback.mock.calls[1][0]).toBe(20);
  });

  it("deve rastrear especificamente a última chamada", () => {
    const mockCallback = jest.fn();
    forEach(["a", "b", "c"], mockCallback);

    expect(mockCallback).toHaveBeenLastCalledWith("c");
    expect(mockCallback).toHaveBeenNthCalledWith(2, "b");
  });
});

describe("jest.fn() — Configurando valores de retorno", () => {
  it("mockReturnValue: retorna o mesmo valor em todas as chamadas", () => {
    const mockGetId = jest.fn().mockReturnValue(42);

    expect(mockGetId()).toBe(42);
    expect(mockGetId()).toBe(42);
    expect(mockGetId).toHaveBeenCalledTimes(2);
  });

  it("mockReturnValueOnce: retorna valores diferentes por chamada", () => {
    const mockFn = jest
      .fn()
      .mockReturnValueOnce("primeira")
      .mockReturnValueOnce("segunda")
      .mockReturnValue("outros");

    expect(mockFn()).toBe("primeira");
    expect(mockFn()).toBe("segunda");
    expect(mockFn()).toBe("outros");
    expect(mockFn()).toBe("outros"); // continua retornando o outros
  });

  it("mockImplementation: substitui a implementação por completo", () => {
    const mockSum = jest.fn().mockImplementation((a: number, b: number) => {
      return a * b; // implementação diferente da real
    });

    expect(mockSum(2, 3)).toBe(6); // retorna 6 (2*3) ao invés de 5 (2+3)
  });

  it("mockResolvedValue: para funções assíncronas", async () => {
    const mockFetchData = jest.fn().mockResolvedValue({ id: 1, name: "Renan" });

    const result = await mockFetchData();
    expect(result).toEqual({ id: 1, name: "Renan" });
  });

  it("mockRejectedValue: para simular falhas assíncronas", async () => {
    const mockFetchData = jest
      .fn()
      .mockRejectedValue(new Error("Erro de rede"));

    await expect(mockFetchData()).rejects.toThrow("Erro de rede");
  });
});
