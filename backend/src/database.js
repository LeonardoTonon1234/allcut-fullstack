// backend/src/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do banco dentro do projeto (será criado automaticamente)
const dbPath = path.resolve(__dirname, 'allcut.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('❌ Erro ao conectar ao SQLite:', err.message);
  else console.log('✅ Conectado ao SQLite:', dbPath);
});

// Liga suporte a chaves estrangeiras
db.exec('PRAGMA foreign_keys = ON');

// Criação das tabelas principais
db.serialize(() => {
  // Usuários
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      telefone TEXT,
      tipoUsuario TEXT CHECK (tipoUsuario IN ('aluno','admin')) DEFAULT 'aluno'
    )
  `);

  // Máquinas
  db.run(`
    CREATE TABLE IF NOT EXISTS maquinas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      status TEXT CHECK (status IN ('disponivel','manutencao','ocupada')) DEFAULT 'disponivel',
      descricao TEXT,
      capacidade INTEGER DEFAULT 1
    )
  `);

  // Reservas
  db.run(`
    CREATE TABLE IF NOT EXISTS reservas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuarioId INTEGER NOT NULL,
      maquinaId INTEGER NOT NULL,
      inicio TEXT NOT NULL,
      fim TEXT NOT NULL,
      status TEXT CHECK (status IN ('ativa','cancelada','concluida')) DEFAULT 'ativa',
      observacao TEXT,
      FOREIGN KEY (usuarioId) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (maquinaId) REFERENCES maquinas(id) ON DELETE CASCADE
    )
  `);

  // Relatórios
  db.run(`
    CREATE TABLE IF NOT EXISTS relatorios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT NOT NULL,
      periodoInicio TEXT NOT NULL,
      periodoFim TEXT NOT NULL,
      criadoEm TEXT DEFAULT (datetime('now'))
    )
  `);

  // Inserir máquinas de exemplo se estiver vazio
  db.get('SELECT COUNT(*) AS total FROM maquinas', (err, row) => {
    if (!err && row.total === 0) {
      const stmt = db.prepare('INSERT INTO maquinas (nome, status, descricao, capacidade) VALUES (?, ?, ?, ?)');
      stmt.run('AllCut 01', 'disponivel', 'Cortadora a laser CO2 60W', 1);
      stmt.run('AllCut 02', 'manutencao', 'Cortadora a laser fibra 30W', 1);
      stmt.run('AllCut 03', 'disponivel', 'Cortadora a laser CO2 80W', 2);
      stmt.finalize(() => console.log('🌱 Máquinas de exemplo inseridas.'));
    }
  });
});

module.exports = db;
