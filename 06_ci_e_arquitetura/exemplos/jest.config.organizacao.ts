// Estratégias de Organização de Arquivos de Teste
//
// Existem duas abordagens principais:
//
// ─────────────────────────────────────────────────────────────
// ABORDAGEM 1: Arquivos de teste JUNTO ao código-fonte
// ─────────────────────────────────────────────────────────────
//
//   src/
//   ├── users/
//   │   ├── users.service.ts
//   │   ├── users.service.test.ts  ← JUNTO ao arquivo de produção
//   │   └── users.repository.ts
//
//   PRÓS:
//   ✅ Fácil encontrar o teste de um arquivo (estão lado a lado)
//   ✅ Incentiva escrever testes enquanto desenvolve
//   ✅ Renomear/mover arquivos é mais fácil (arquivo + teste junto)
//
//   CONTRAS:
//   ❌ A pasta src/ fica misturada com arquivos de teste
//   ❌ O build de produção precisa excluir explicitamente os *.test.ts
//
// ─────────────────────────────────────────────────────────────
// ABORDAGEM 2: Arquivos de teste em pasta separada (__tests__ ou tests/)
// ─────────────────────────────────────────────────────────────
//
//   src/
//   ├── users/
//   │   ├── users.service.ts
//   │   └── users.repository.ts
//   tests/                         ← SEPARADO do código de produção
//   ├── unit/
//   │   └── users.service.test.ts
//   └── integration/
//       └── users.api.test.ts
//
//   PRÓS:
//   ✅ Código de produção e testes claramente separados
//   ✅ Fácil excluir a pasta de testes do build de produção
//   ✅ Boa para times maiores com muitos tipos de teste
//
//   CONTRAS:
//   ❌ Mais difícil navegar entre arquivo e seu teste
//   ❌ Estrutura de pastas pode ficar duplicada
//
// RECOMENDAÇÃO: Use a Abordagem 1 para projetos novos e pequenos.
// Use a Abordagem 2 quando tiver múltiplos tipos de teste (unit, integration, e2e).

import type { Config } from "jest";

// Exemplo: config para Abordagem 1 (testes junto ao código)
export const configAbordagem1: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts", "**/*.spec.ts", "**/__tests__/**/*.ts"],
};

// Exemplo: config para Abordagem 2 (testes em pasta separada)
export const configAbordagem2: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: [
    "<rootDir>/tests/unit/**/*.test.ts",
    "<rootDir>/tests/integration/**/*.test.ts",
  ],
};
