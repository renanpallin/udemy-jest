// Rotas da API de usuários

import { Router, Request, Response } from "express";
import { UsersService } from "./users.service";

export const createUsersRouter = (usersService: UsersService): Router => {
  const router = Router();

  // GET /users — lista todos os usuários
  router.get("/", (_req: Request, res: Response) => {
    const users = usersService.findAll();
    res.status(200).json(users);
  });

  // GET /users/:id — retorna um usuário pelo id
  router.get("/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "Id inválido: deve ser um número" });
      return;
    }

    const user = usersService.findById(id);

    if (!user) {
      res.status(404).json({ error: `Usuário com id ${id} não encontrado` });
      return;
    }

    res.status(200).json(user);
  });

  // POST /users — cria um novo usuário
  router.post("/", (req: Request, res: Response) => {
    const { name, email } = req.body;

    try {
      const user = usersService.create({ name, email });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  // DELETE /users/:id — deleta um usuário
  router.delete("/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "Id inválido: deve ser um número" });
      return;
    }

    const deleted = usersService.deleteById(id);

    if (!deleted) {
      res.status(404).json({ error: `Usuário com id ${id} não encontrado` });
      return;
    }

    res.status(204).send();
  });

  return router;
};
