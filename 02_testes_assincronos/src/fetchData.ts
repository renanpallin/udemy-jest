// Código assíncrono para testar com async/await,
// .resolves e .rejects

export interface UserData {
  id: number;
  name: string;
  email: string;
}

// Simula uma chamada de API que retorna dados de um usuário
export const fetchUser = (id: number): Promise<UserData> => {
  if (id <= 0) {
    return Promise.reject(
      new Error("ID de usuário inválido: deve ser maior que 0"),
    );
  }

  if (id > 100) {
    return Promise.reject(
      new Error("ID de usuário inválido: deve ser menor ou igual a 100"),
    );
  }

  return Promise.resolve({
    id,
    name: "Renan",
    email: "renan@example.com",
  });
};

// Simula uma operação que pode falhar (ex: usuário não encontrado)
export const fetchUserOrFail = (id: number): Promise<UserData> => {
  const knownIds = [1, 2, 3];

  if (!knownIds.includes(id)) {
    return Promise.reject(new Error(`Usuário com id ${id} não encontrado`));
  }

  return Promise.resolve({ id, name: "Renan", email: "renan@example.com" });
};

// Simula uma chamada de API para uma lista de usuários
export const fetchUsers = (): Promise<UserData[]> => {
  return Promise.resolve([
    { id: 1, name: "Renan", email: "renan@example.com" },
    { id: 2, name: "Maria", email: "maria@example.com" },
  ]);
};
