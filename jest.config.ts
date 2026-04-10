import type { Config } from "jest";

// Configuração raiz: roda os testes dos módulos 01 a 04
// Para rodar apenas um módulo, use:
//   npm run test:m1   →  jest --config 01_fundamentos_e_matchers/jest.config.ts
//   npm run test:m2   →  jest --config 02_testes_assincronos/jest.config.ts
//   npm run test:m3   →  jest --config 03_mocks/jest.config.ts
//   npm run test:m4   →  jest --config 04_testes_de_integracao/jest.config.ts
const config: Config = {
  projects: [
    "<rootDir>/01_fundamentos_e_matchers",
    "<rootDir>/02_testes_assincronos",
    "<rootDir>/03_mocks",
    "<rootDir>/04_testes_de_integracao",
  ],
  collectCoverageFrom: [
    "<rootDir>/0{1,2,3,4}_*/src/**/*.ts",
    "!<rootDir>/**/dist/**",
  ],

  // portão de qualidade (quality gate)
  // Descomente abaixo para ativar limites de cobertura:
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10,
  //   },
  // },
};

export default config;
