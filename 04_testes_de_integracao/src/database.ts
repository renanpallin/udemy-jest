// Gerenciando o banco de dados nos testes
//
// Usamos SQLite (:memory:) para os testes de integração porque:
//   ✅ Não requer nenhuma configuração externa (sem Docker, sem instalação)
//   ✅ É destruído automaticamente ao fechar a conexão (sem resíduos)
//   ✅ É extremamente rápido (tudo em memória RAM)
//   ✅ Os conceitos são idênticos ao PostgreSQL (queries SQL, migrations, transações)
//
// node:sqlite é um módulo nativo do Node.js (a partir da versão 22).
// Isso significa: zero dependências externas, basta ter o Node instalado.

import { DatabaseSync } from "node:sqlite";

// Executa as "migrations" — cria a estrutura do banco
const runMigrations = (db: DatabaseSync): void => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      name      TEXT    NOT NULL,
      email     TEXT    NOT NULL UNIQUE,
      created_at TEXT   DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

// Cria e configura uma conexão com o banco de dados
// Aceita ':memory:' (para testes) ou um caminho de arquivo (para produção)
export const createDatabase = (dbPath: string = ":memory:"): DatabaseSync => {
  const db = new DatabaseSync(dbPath);

  // WAL mode melhora a performance em escritas concorrentes
  db.exec("PRAGMA journal_mode = WAL");

  runMigrations(db);

  return db;
};
