// Mockando módulos inteiros com jest.mock()
// jest.mock('nome-do-modulo') é HOISTED para o topo do arquivo pelo Jest.
// Isso significa que ele é executado ANTES dos imports, garantindo que
// quando o módulo é importado no código de produção, ele já está mockado.

import axios from "axios";
import { fetchUser, createUser, deleteUser } from "../src/userApiService";

// Substitui o módulo axios inteiro por uma versão mockada
jest.mock("axios");

// Cast necessário para ter acesso aos métodos mock no TypeScript
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("userApiService — jest.mock()", () => {
  // Limpar todos os mocks antes de cada teste para evitar interferência
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchUser", () => {
    it("deve retornar um usuário quando a chamada à API tem sucesso", async () => {
      const mockUser = { id: 1, name: "Renan", email: "renan@example.com" };

      // Configura o que axios.get vai retornar NESTE teste
      mockedAxios.get.mockResolvedValue({ data: mockUser });

      const result = await fetchUser(1);

      // Valida o resultado
      expect(result).toEqual(mockUser);

      // Valida que o axios.get foi chamado com os argumentos corretos
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://api.example.com/users/1",
      );
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    it("deve lançar erro quando a chamada à API falha", async () => {
      mockedAxios.get.mockRejectedValue(new Error("Erro de rede"));

      await expect(fetchUser(1)).rejects.toThrow("Erro de rede");
    });

    it("deve chamar a API com o id de usuário correto", async () => {
      mockedAxios.get.mockResolvedValue({
        data: { id: 42, name: "Maria", email: "maria@example.com" },
      });

      await fetchUser(42);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://api.example.com/users/42",
      );
    });
  });

  describe("createUser", () => {
    it("deve criar e retornar o novo usuário", async () => {
      const newUserData = { name: "João", email: "joao@example.com" };
      const createdUser = { id: 3, ...newUserData };

      mockedAxios.post.mockResolvedValue({ data: createdUser });

      const result = await createUser(newUserData);

      expect(result).toEqual(createdUser);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "https://api.example.com/users",
        newUserData,
      );
    });
  });

  describe("deleteUser", () => {
    it("deve chamar o delete com a URL correta", async () => {
      mockedAxios.delete.mockResolvedValue({});

      await deleteUser(1);

      expect(mockedAxios.delete).toHaveBeenCalledWith(
        "https://api.example.com/users/1",
      );
    });
  });
});
