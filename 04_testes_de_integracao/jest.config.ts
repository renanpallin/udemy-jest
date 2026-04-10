import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
      },
    ],
  },
  // Nota: testTimeout é uma opção global. Quando rodado via multi-project (raiz),
  // configure no jest.config.ts raiz. Quando rodado isolado (npm run test:m4),
  // o Jest usa o default de 5000ms — suficiente para SQLite in-memory.
};

export default config;
