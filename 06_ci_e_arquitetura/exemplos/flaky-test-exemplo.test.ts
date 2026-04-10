// Exemplos de Flaky Tests e como corrigi-los
//
// Um "flaky test" é um teste que falha de forma INTERMITENTE
// sem mudanças no código. É o pesadelo de qualquer CI/CD.
//
// Causas mais comuns:
//   1. Assincronicidade mal tratada
//   2. Dependência de estado global entre testes
//   3. Dependência de tempo real (new Date(), setTimeout sem fake timers)
//   4. Ordem de execução dos testes

// ─────────────────────────────────────────────────────────────
// CAUSA 1: Race condition (assincronicidade mal tratada)
// ─────────────────────────────────────────────────────────────

// ❌ RUIM: Não esperamos a Promise ser resolvida
// Este teste pode passar ou falhar dependendo do timing:
// it("flaky - race condition", () => {
//   let result = "";
//   Promise.resolve("dados").then((data) => { result = data; });
//   expect(result).toBe("dados"); // Falha! A Promise ainda não resolveu.
// });

// ✅ BOM: Sempre espere Promises com async/await
it("estável — corretamente assíncrono", async () => {
  let result = "";
  await Promise.resolve("dados").then((data) => {
    result = data;
  });
  expect(result).toBe("dados");
});

// ─────────────────────────────────────────────────────────────
// CAUSA 2: Estado global compartilhado entre testes
// ─────────────────────────────────────────────────────────────

// Estado compartilhado — causa flakiness dependendo da ORDEM de execução
const sharedState = { count: 0 };

// ❌ RUIM: Depende do estado deixado pelo teste anterior
// it("flaky - depende da ordem", () => {
//   expect(sharedState.count).toBe(0); // Pode falhar se outro teste modificou
// });

// ✅ BOM: Reset o estado antes de cada teste
beforeEach(() => {
  sharedState.count = 0;
});

it("estável — estado isolado", () => {
  sharedState.count += 1;
  expect(sharedState.count).toBe(1);
});

it("estável — ainda isolado", () => {
  expect(sharedState.count).toBe(0); // sempre começa zerado
});

// ─────────────────────────────────────────────────────────────
// CAUSA 3: Dependência de tempo real
// ─────────────────────────────────────────────────────────────

// ❌ RUIM: Depende do horário real — pode falhar em diferentes fusos ou datas
// it("flaky - depende do tempo real", () => {
//   const now = new Date();
//   expect(now.getFullYear()).toBe(2024); // Falha em 2025!
// });

// ✅ BOM: Use jest.useFakeTimers() ou injete a data como dependência
it("estável — tempo controlado", () => {
  const mockDate = new Date("2024-01-01T00:00:00.000Z");
  expect(mockDate.getFullYear()).toBe(2024); // Sempre passa
});

// ─────────────────────────────────────────────────────────────
// Dica: como identificar e depurar flaky tests
// ─────────────────────────────────────────────────────────────
//
// 1. Rode o teste em loop: jest --testNamePattern="nome do teste" --repeat=10
// 2. Rode em modo serial: jest --runInBand (desativa paralelismo)
// 3. Se passa em --runInBand mas falha normal: causa é race condition ou estado compartilhado
// 4. Adicione logs temporários para entender o estado no momento da falha
