// Objeto complexo para demonstrar o primeiro snapshot
// Snapshots são úteis quando o objeto de retorno é grande e verificar
// cada propriedade individualmente seria tedioso.

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  preferences: {
    theme: "dark" | "light";
    language: string;
    notifications: boolean;
  };
  stats: {
    postsCount: number;
    followersCount: number;
  };
}

export const formatUserProfile = (id: number): UserProfile => ({
  id,
  name: "Renan Pallin",
  email: "renan@example.com",
  role: "editor",
  preferences: {
    theme: "dark",
    language: "pt-BR",
    notifications: true,
  },
  stats: {
    postsCount: 42,
    followersCount: 1337,
  },
});

// Simula o retorno de um endpoint de API
export const buildApiResponse = <T>(data: T) => ({
  status: "success",
  timestamp: "2024-01-01T00:00:00.000Z", // Data fixa para o snapshot ser estável
  data,
  meta: {
    version: "1.0",
    requestId: "abc-123",
  },
});
