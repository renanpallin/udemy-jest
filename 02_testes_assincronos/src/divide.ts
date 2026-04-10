// Testando o caminho infeliz — erros e exceções
// Demonstra o uso do matcher .toThrow()

// Erro personalizado: permite testar o TIPO do erro, não só a mensagem
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export const divide = (a: number, b: number): number => {
  if (b === 0) {
    throw new ValidationError("Não é possível dividir por zero.");
  }
  return a / b;
};

export const sqrt = (n: number): number => {
  if (n < 0) {
    throw new RangeError(
      "Não é possível calcular a raiz quadrada de um número negativo.",
    );
  }
  return Math.sqrt(n);
};
