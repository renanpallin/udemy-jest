// Configuração com Quality Gate de Cobertura
//
// coverageThreshold faz o Jest FALHAR se a cobertura ficar abaixo dos limites.
// Isso é especialmente útil em pipelines de CI/CD.
//
// Como usar: copie este conteúdo para seu jest.config.ts e ajuste os valores.

import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",

  // Ativa a coleta de cobertura automaticamente ao rodar jest
  collectCoverage: true,

  // Define de onde coletar a cobertura (exclui arquivos de teste e config)
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/**/__mocks__/**",
  ],

  // Formatos de relatório:
  //   'text'    → imprime no terminal
  //   'lcov'    → gera pasta coverage/ para ferramentas como Codecov/SonarQube
  //   'html'    → relatório visual em coverage/lcov-report/index.html
  coverageReporters: ["text", "lcov", "html"],

  // ─────────────────────────────────────────────────────────────
  // QUALITY GATE: a suíte FALHA se a cobertura ficar abaixo do limite
  // Mesmo que todos os testes passem!
  // ─────────────────────────────────────────────────────────────
  coverageThreshold: {
    global: {
      // Percentuais mínimos para toda a codebase
      branches: 80, // if/else, switch, ternários
      functions: 80, // funções/métodos
      lines: 80, // linhas de código
      statements: -10, // permite no máximo 10 statements não cobertos
    },

    // Também é possível definir por arquivo específico:
    // "./src/user.service.ts": {
    //   branches: 100,
    //   functions: 100,
    //   lines: 100,
    //   statements: 100,
    // },
  },
};

export default config;
