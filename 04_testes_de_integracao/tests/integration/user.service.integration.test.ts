// Testes de Integração
//
// O que diferencia este teste de um teste UNITÁRIO:
//   Teste Unitário:    UserService testado com UserRepository MOCKADO (jest.mock())
//   Teste Integração:  UserService testado com UserRepository REAL + banco SQLite real
//
// Vantagem: validamos que a colaboração entre UserService e UserRepository
// (incluindo as queries SQL) funciona corretamente de ponta a ponta.
//
// Estratégia de isolamento:
//   beforeAll:  cria o banco e as tabelas (executa UMA VEZ)
//   afterAll:   fecha a conexão (executa UMA VEZ)
//   beforeEach: limpa os dados para garantir que cada teste começa do zero

import { DatabaseSync } from "node:sqlite";
import { createDatabase } from "../../src/database";
import { UserRepository } from "../../src/user.repository";
import { UserService } from "../../src/user.service";

describe("UserService — Testes de Integração", () => {
  let db: DatabaseSync;
  let userRepository: UserRepository;
  let userService: UserService;

  // beforeAll: setup caro que não precisa ser repetido (criar o banco + tabelas)
  beforeAll(() => {
    db = createDatabase(":memory:");
    userRepository = new UserRepository(db);
    userService = new UserService(userRepository);
  });

  // afterAll: limpeza de recursos (fechar conexão com o banco)
  afterAll(() => {
    db.close();
  });

  // beforeEach: garantir estado limpo antes de cada teste
  beforeEach(() => {
    userRepository.deleteAll();
  });

  // ─────────────────────────────────────────────────────────────
  // Testes de criação
  // ─────────────────────────────────────────────────────────────

  it("deve criar um usuário e persistir no banco de dados", () => {
    const created = userService.createUser({
      name: "Renan",
      email: "renan@example.com",
    });

    expect(created.id).toBeDefined();
    expect(created.name).toBe("Renan");
    expect(created.email).toBe("renan@example.com");
  });

  it("deve recuperar o usuário criado pelo id", () => {
    const created = userService.createUser({
      name: "Renan",
      email: "renan@example.com",
    });

    const found = userService.getUserById(created.id);

    expect(found).toBeDefined();
    expect(found.name).toBe("Renan");
    expect(found.email).toBe("renan@example.com");
  });

  // ─────────────────────────────────────────────────────────────
  // Testes de regras de negócio
  // ─────────────────────────────────────────────────────────────

  it("deve lançar erro quando o nome estiver vazio", () => {
    expect(() =>
      userService.createUser({ name: "", email: "test@test.com" }),
    ).toThrow("O nome do usuário é obrigatório.");
  });

  it("deve lançar erro quando o e-mail for inválido", () => {
    expect(() =>
      userService.createUser({ name: "Renan", email: "nao-eh-um-email" }),
    ).toThrow("Um endereço de e-mail válido é obrigatório.");
  });

  it("deve lançar erro quando o e-mail já estiver em uso", () => {
    userService.createUser({ name: "Renan", email: "renan@example.com" });

    expect(() =>
      userService.createUser({ name: "Outro", email: "renan@example.com" }),
    ).toThrow("O e-mail 'renan@example.com' já está em uso.");
  });

  it("deve lançar erro ao tentar buscar um usuário inexistente", () => {
    expect(() => userService.getUserById(9999)).toThrow(
      "Usuário com id 9999 não encontrado.",
    );
  });

  // ─────────────────────────────────────────────────────────────
  // Testes de listagem e deleção
  // ─────────────────────────────────────────────────────────────

  it("deve retornar todos os usuários", () => {
    userService.createUser({ name: "Renan", email: "renan@example.com" });
    userService.createUser({ name: "Maria", email: "maria@example.com" });

    const users = userService.getAllUsers();

    expect(users).toHaveLength(2);
    expect(users.map((u) => u.name)).toEqual(["Renan", "Maria"]);
  });

  it("deve deletar um usuário pelo id", () => {
    const created = userService.createUser({
      name: "Renan",
      email: "renan@example.com",
    });

    userService.deleteUser(created.id);

    expect(() => userService.getUserById(created.id)).toThrow("não encontrado");
  });

  // ─────────────────────────────────────────────────────────────
  // Teste de isolamento (prova que beforeEach está funcionando)
  // ─────────────────────────────────────────────────────────────

  it("deve começar cada teste com o banco vazio (isolamento)", () => {
    const users = userService.getAllUsers();
    expect(users).toHaveLength(0);
  });
});
