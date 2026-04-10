// O que é um Teste de Snapshot?
//
// Na primeira execução, .toMatchSnapshot() cria um arquivo .snap
// contendo a "fotografia" do objeto.
// Nas execuções seguintes, ele COMPARA com a fotografia salva.
// Se algo mudou, o teste FALHA — alertando sobre a mudança.
//
// Para atualizar o snapshot (quando a mudança é intencional):
//   npm run test:update
//   ou: jest --updateSnapshot
//   ou: pressione 'u' no modo watch

import { formatUserProfile, buildApiResponse } from "../src/formatUser";

describe("Snapshots de objetos JSON", () => {
  it("deve corresponder ao snapshot do perfil do usuário", () => {
    const profile = formatUserProfile(1);

    // Na primeira vez: cria o arquivo __snapshots__/json-snapshot.test.ts.snap
    // Nas próximas vezes: compara com o arquivo salvo
    expect(profile).toMatchSnapshot();
  });

  it("deve corresponder ao snapshot do envelope de resposta da API", () => {
    const profile = formatUserProfile(1);
    const response = buildApiResponse(profile);

    expect(response).toMatchSnapshot();
  });

  it("inline snapshot — snapshot embutido no código", () => {
    const profile = formatUserProfile(1);

    // toMatchInlineSnapshot: o snapshot fica DENTRO do arquivo de teste
    // Útil para snapshots pequenos e focados
    // Na primeira execução, o Jest preenche o conteúdo automaticamente!
    expect(profile.role).toMatchInlineSnapshot(`"editor"`);
    expect(profile.preferences.theme).toMatchInlineSnapshot(`"dark"`);
  });
});

describe("Snapshots — Boas Práticas", () => {
  it("RUIM: snapshot de um objeto enorme é difícil de revisar", () => {
    // Um snapshot muito grande é difícil de revisar quando falha
    // Você não sabe o que mudou de importante
    const profile = formatUserProfile(1);
    expect(profile).toMatchSnapshot("perfil-completo");
  });

  it("BOM: snapshot focado só na estrutura importante", () => {
    // Prefira snapshots de partes específicas e bem definidas
    const profile = formatUserProfile(1);
    expect(profile.preferences).toMatchSnapshot("preferencias-do-usuario");
    expect(profile.stats).toMatchSnapshot("estatisticas-do-usuario");
  });
});
