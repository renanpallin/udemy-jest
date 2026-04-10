// Camada de repositório — responsável por PERSISTIR e RECUPERAR dados
// O repositório só conhece o banco de dados — não conhece regras de negócio.

import { DatabaseSync } from "node:sqlite";

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export type CreateUserInput = Pick<User, "name" | "email">;

export class UserRepository {
  constructor(private db: DatabaseSync) {}

  create(input: CreateUserInput): User {
    const stmt = this.db.prepare(
      "INSERT INTO users (name, email) VALUES (?, ?) RETURNING *",
    );
    return stmt.get(input.name, input.email) as unknown as User;
  }

  findById(id: number): User | undefined {
    const stmt = this.db.prepare("SELECT * FROM users WHERE id = ?");
    return stmt.get(id) as unknown as User | undefined;
  }

  findByEmail(email: string): User | undefined {
    const stmt = this.db.prepare("SELECT * FROM users WHERE email = ?");
    return stmt.get(email) as unknown as User | undefined;
  }

  findAll(): User[] {
    const stmt = this.db.prepare("SELECT * FROM users ORDER BY id ASC");
    return stmt.all() as unknown as User[];
  }

  deleteById(id: number): void {
    const stmt = this.db.prepare("DELETE FROM users WHERE id = ?");
    stmt.run(id);
  }

  // Usado nos testes: limpar todos os dados antes de cada teste (afterEach / beforeEach)
  deleteAll(): void {
    this.db.exec("DELETE FROM users");
  }
}
