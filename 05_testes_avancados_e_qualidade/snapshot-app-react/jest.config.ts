import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  // React components com react-test-renderer não precisam de DOM,
  // mas usando 'node' pode haver warnings. 'jsdom' é mais seguro.
  testEnvironment: "node",
  rootDir: ".",
  testMatch: ["<rootDir>/tests/**/*.test.{ts,tsx}"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
      },
    ],
  },
};

export default config;
