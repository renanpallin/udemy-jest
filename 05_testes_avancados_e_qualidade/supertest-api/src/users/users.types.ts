// Tipos compartilhados da entidade User

export interface User {
  id: number;
  name: string;
  email: string;
}

export type CreateUserBody = Omit<User, "id">;
