// Dados e funções para demonstrar os matchers mais comuns

export interface User {
  id: number;
  name: string;
  age: number;
  email: string | null;
  role: "admin" | "user";
}

export const createUser = (overrides?: Partial<User>): User => ({
  id: 1,
  name: "Renan",
  age: 30,
  email: "renan@example.com",
  role: "user",
  ...overrides,
});

export const getFruits = (): string[] => ["apple", "banana", "orange"];

export const getNumbers = (): number[] => [1, 5, 10, 15, 20];

export const getConfig = (): Record<string, unknown> => ({
  host: "localhost",
  port: 3000,
  debug: true,
  database: null,
});

export const greet = (name: string): string => `Falaê, ${name}!`;
