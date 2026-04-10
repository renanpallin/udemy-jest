// Camada de serviço — responsável pelas REGRAS DE NEGÓCIO
// O serviço usa o repositório mas não sabe como os dados são armazenados.
//
// Este é o componente que o teste de integração valida:
//   "O UserService, usando o UserRepository REAL, funciona corretamente?"

import { UserRepository, User, CreateUserInput } from "./user.repository";

export class UserService {
  constructor(private repository: UserRepository) {}

  createUser(input: CreateUserInput): User {
    // Regra de negócio #1: nome é obrigatório
    if (!input.name || input.name.trim() === "") {
      throw new Error("O nome do usuário é obrigatório.");
    }

    // Regra de negócio #2: email deve ter formato válido
    if (!input.email || !input.email.includes("@")) {
      throw new Error("Um endereço de e-mail válido é obrigatório.");
    }

    // Regra de negócio #3: email deve ser único (verificado no banco)
    const existing = this.repository.findByEmail(input.email);
    if (existing) {
      throw new Error(`O e-mail '${input.email}' já está em uso.`);
    }

    return this.repository.create({
      name: input.name.trim(),
      email: input.email.toLowerCase(),
    });
  }

  getUserById(id: number): User {
    const user = this.repository.findById(id);
    if (!user) {
      throw new Error(`Usuário com id ${id} não encontrado.`);
    }
    return user;
  }

  getAllUsers(): User[] {
    return this.repository.findAll();
  }

  deleteUser(id: number): void {
    // Garante que o usuário existe antes de tentar deletar
    this.getUserById(id);
    this.repository.deleteById(id);
  }
}
