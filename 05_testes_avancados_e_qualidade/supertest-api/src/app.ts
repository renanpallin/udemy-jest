// A instância do Express — separada do servidor
//
// IMPORTANTE: Exportamos o `app` sem chamar `app.listen()`.
// Isso permite que o supertest inicialize o servidor na porta certa
// sem conflito durante os testes.
// O `server.ts` (ponto de entrada) chama o listen() apenas em produção.

import express from "express";
import { UsersService } from "./users/users.service";
import { createUsersRouter } from "./users/users.routes";

// Instância do serviço — exportada para que os testes possam fazer reset()
export const usersService = new UsersService();

const app = express();

// Middleware para parsear JSON no body das requisições
app.use(express.json());

// Rotas
app.use("/users", createUsersRouter(usersService));

// Rota de health check
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
