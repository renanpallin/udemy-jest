// Testando código assíncrono
//
// Três abordagens para o caso de SUCESSO:
//   1. async/await (mais comum e legível)
//   2. .resolves (mais declarativo)
//   3. expect.assertions() — garante que o expect foi executado
//
// Para REJEIÇÃO:
//   1. async/await + try/catch ou .rejects

import { fetchUser, fetchUserOrFail, fetchUsers } from "../src/fetchData";

// ─────────────────────────────────────────────────────────────
// async/await
// ─────────────────────────────────────────────────────────────

describe("fetchUser — async/await", () => {
  it("deve retornar os dados do usuário com async/await", async () => {
    const id = 1;
    const user = await fetchUser(id);

    expect(user).toBeDefined();
    expect(user.id).toBe(id);
    expect(user.name).toBe("Renan");
  });

  it("deve rejeitar quando o id for inválido", async () => {
    // Para testar rejeição com async/await, usamos .rejects
    await expect(fetchUser(-1)).rejects.toThrow("ID de usuário inválido");
  });
});

// ─────────────────────────────────────────────────────────────
// .resolves e .rejects (sintaxe declarativa)
// ─────────────────────────────────────────────────────────────

describe("fetchUser — .resolves e .rejects", () => {
  it(".resolves: extrai o valor da Promise resolvida", async () => {
    // O await é necessário: sem ele, a Promise não é avaliada antes do teste terminar
    await expect(fetchUser(1)).resolves.toHaveProperty("name", "Renan");
  });

  it(".resolves: permite encadear outros matchers", async () => {
    await expect(fetchUsers()).resolves.toHaveLength(2);
    await expect(fetchUsers()).resolves.toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "Renan" })]),
    );
  });

  it(".rejects: extrai o erro da Promise rejeitada", async () => {
    await expect(fetchUser(0)).rejects.toThrow("ID de usuário inválido");
    await expect(fetchUser(-5)).rejects.toThrow("ID de usuário inválido");
    await expect(fetchUser(150)).rejects.toThrow("ID de usuário inválido");
  });

  it("Caminho feliz do fetchUserOrFail", async () => {
    await expect(fetchUserOrFail(1)).resolves.toHaveProperty("name", "Renan");
  });

  it(".rejects: também funciona para erros de 'não encontrado'", async () => {
    await expect(fetchUserOrFail(999)).rejects.toThrow(
      "Usuário com id 999 não encontrado",
    );
  });
});

// ─────────────────────────────────────────────────────────────
// expect.assertions — prevenindo falsos positivos
// ─────────────────────────────────────────────────────────────

describe("expect.assertions()", () => {
  it("garante que o expect assíncrono foi realmente executado", async () => {
    // Se fetchUser rejeitar inesperadamente, sem expect.assertions o teste passaria!
    expect.assertions(2);

    const user = await fetchUser(1);
    expect(user.name).toBe("Renan");
    expect(user.id).toBe(1);
  });

  it("should handle error", async () => {
    try {
      await fetchUser(42);
      // se fetchUser NÃO rejeitar, o catch nunca executa
      // e o teste passa sem verificar nada
    } catch (error) {
      expect(error).toBeDefined();
      expect((error as Error).message).toBe("User not found");
    }
  });

  it("garante que um erro seja lançado", async () => {
    expect.assertions(2); // Garante que 2 asserts sejam executados
    try {
      await fetchUser(600);
      // se fetchUser NÃO rejeitar, o catch nunca executa
      // e o teste passa sem verificar nada
    } catch (error) {
      expect(error).toBeDefined();
      expect((error as Error).message).toMatch(/ID de usuário inválido/);
    }
  });
});
