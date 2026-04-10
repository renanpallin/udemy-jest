// Serviço que depende do axios — caso de uso para jest.mock()
// Em um teste unitário, não podemos fazer chamadas HTTP reais:
//   - São lentas e não confiáveis
//   - Dependem de uma API externa estar no ar
//   - Podem ter custos (rate limits, planos pagos)
// Solução: mockar o módulo 'axios' inteiro com jest.mock()

import axios from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
}

export const fetchUser = async (userId: number): Promise<User> => {
  const { data } = await axios.get<User>(
    `https://api.example.com/users/${userId}`,
  );
  return data;
};

export const createUser = async (userData: Omit<User, "id">): Promise<User> => {
  const { data } = await axios.post<User>(
    "https://api.example.com/users",
    userData,
  );
  return data;
};

export const deleteUser = async (userId: number): Promise<void> => {
  await axios.delete(`https://api.example.com/users/${userId}`);
};
