// Testando a API com Supertest
//
// O que é o supertest e como funciona?
//   request(app) — passa a instância do Express. O supertest sobe o servidor
//   numa porta efêmera automaticamente (sem precisar de `app.listen()`).

import request from "supertest";
import app, { usersService } from "../src/app";

describe("GET /health", () => {
  it("deve retornar 200 com status ok", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});

describe("Users API", () => {
  // Limpar o estado antes de cada teste para garantir isolamento
  beforeEach(() => {
    usersService.reset();
  });

  // ─────────────────────────────────────────────────────────────
  // GET /users
  // ─────────────────────────────────────────────────────────────

  describe("GET /users", () => {
    it("deve retornar 200 e um array vazio quando não há usuários", async () => {
      const response = await request(app).get("/users");

      expect(response.status).toBe(200);
      // Validando o header Content-Type
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual([]);
    });

    it("deve retornar todos os usuários cadastrados", async () => {
      // Criar usuários diretamente no serviço para preparar o cenário
      usersService.create({ name: "Renan", email: "renan@example.com" });
      usersService.create({ name: "Maria", email: "maria@example.com" });

      const response = await request(app).get("/users");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty("name", "Renan");
    });
  });

  // ─────────────────────────────────────────────────────────────
  // GET /users/:id — validando status, headers e body
  // ─────────────────────────────────────────────────────────────

  describe("GET /users/:id", () => {
    it("deve retornar 200 com as propriedades corretas do usuário", async () => {
      const created = usersService.create({
        name: "Renan",
        email: "renan@example.com",
      });

      const response = await request(app).get(`/users/${created.id}`);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);

      // GET /users/:id — validando status, headers e body
      expect(response.body).toHaveProperty("id", created.id);
      expect(response.body).toHaveProperty("name", "Renan");
      expect(response.body).toHaveProperty("email");
    });

    // ─────────────────────────────────────────────────────────────
    // Cenários de Erro
    // ─────────────────────────────────────────────────────────────

    it("deve retornar 404 quando o usuário não for encontrado", async () => {
      const response = await request(app).get("/users/9999");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toContain("não encontrado");
    });

    it("deve retornar 400 quando o id não for um número", async () => {
      const response = await request(app).get("/users/nao-e-um-numero");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });

  // ─────────────────────────────────────────────────────────────
  // POST /users
  // ─────────────────────────────────────────────────────────────

  describe("POST /users", () => {
    it("deve criar um usuário e retornar 201 com os dados do novo usuário", async () => {
      const newUser = { name: "João", email: "joao@example.com" };

      const response = await request(app).post("/users").send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name", "João");
      expect(response.body).toHaveProperty("email", "joao@example.com");
    });

    it("deve retornar 400 quando o nome estiver ausente", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "sem-nome@example.com" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("deve retornar 400 quando o e-mail for inválido", async () => {
      const response = await request(app)
        .post("/users")
        .send({ name: "Renan", email: "email-invalido" });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain("e-mail");
    });

    it("deve retornar 400 quando o corpo da requisição estiver vazio", async () => {
      const response = await request(app).post("/users").send({});

      expect(response.status).toBe(400);
    });
  });

  // ─────────────────────────────────────────────────────────────
  // DELETE /users/:id
  // ─────────────────────────────────────────────────────────────

  describe("DELETE /users/:id", () => {
    it("deve retornar 204 quando o usuário for deletado com sucesso", async () => {
      const created = usersService.create({
        name: "Para Deletar",
        email: "delete@example.com",
      });

      const response = await request(app).delete(`/users/${created.id}`);

      expect(response.status).toBe(204);

      // Confirma que o usuário foi removido
      const getResponse = await request(app).get(`/users/${created.id}`);
      expect(getResponse.status).toBe(404);
    });

    it("deve retornar 404 ao tentar deletar um usuário inexistente", async () => {
      const response = await request(app).delete("/users/9999");

      expect(response.status).toBe(404);
    });
  });
});
