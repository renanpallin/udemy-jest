// Camada de serviço com store em memória
// Usamos um array em memória (sem banco de dados) para focar
// nos testes HTTP, não na persistência.

import { User, CreateUserBody } from "./users.types";

export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  findAll(): User[] {
    return [...this.users];
  }

  findById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  create(body: CreateUserBody): User {
    if (!body.name || body.name.trim() === "") {
      throw new Error("O nome é obrigatório");
    }

    if (!body.email || !body.email.includes("@")) {
      throw new Error("Um e-mail válido é obrigatório");
    }

    const newUser: User = {
      id: this.nextId++,
      name: body.name.trim(),
      email: body.email.toLowerCase(),
    };

    this.users.push(newUser);
    return newUser;
  }

  deleteById(id: number): boolean {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }

  // Usado nos testes para limpar o estado entre execuções
  reset(): void {
    this.users = [];
    this.nextId = 1;
  }
}
