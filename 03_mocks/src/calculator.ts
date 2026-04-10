// Exemplos para jest.spyOn()
// Diferença-chave entre jest.fn() e jest.spyOn():
//   jest.fn()      → cria uma função mock do ZERO (não existe antes)
//   jest.spyOn()   → "envolve" uma função que JÁ EXISTE em um objeto

// Objeto simples — para demonstrar spyOn sem substituir a implementação
export const calculator = {
  add: (a: number, b: number): number => a + b,
  subtract: (a: number, b: number): number => a - b,
  multiply: (a: number, b: number): number => a * b,
};

// Classe — para demonstrar spyOn em métodos de classe
export class CalculatorService {
  private log: string[] = [];

  add(a: number, b: number): number {
    const result = a + b;
    this.log.push(`add(${a}, ${b}) = ${result}`);
    return result;
  }

  subtract(a: number, b: number): number {
    const result = a - b;
    this.log.push(`subtract(${a}, ${b}) = ${result}`);
    return result;
  }

  getLogs(): string[] {
    return [...this.log];
  }
}
