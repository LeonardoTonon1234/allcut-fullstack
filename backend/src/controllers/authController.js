const db = require('../database');

// ==========================
// 🧾 Registro de novo usuário
// ==========================
exports.register = (req, res) => {
  const { nome, email, senha, telefone, tipoUsuario } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
  }

  const query = `
    INSERT INTO usuarios (nome, email, senha, telefone, tipoUsuario)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [nome, email, senha, telefone || null, tipoUsuario || 'aluno'], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint')) {
        return res.status(400).json({ message: 'E-mail já cadastrado.' });
      }
      console.error('Erro ao inserir usuário:', err.message);
      return res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
    }

    console.log('✅ Usuário cadastrado com ID:', this.lastID);
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', id: this.lastID });
  });
};

// ==========================
// 🔐 Login de usuário
// ==========================
exports.login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Informe e-mail e senha.' });
  }

  const query = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`;

  db.get(query, [email, senha], (err, user) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err.message);
      return res.status(500).json({ message: 'Erro ao realizar login.' });
    }

    if (!user) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }

    console.log('✅ Login realizado por:', user.email);
    res.status(200).json({
      message: 'Login realizado com sucesso!',
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipoUsuario: user.tipoUsuario,
      },
      token: 'fake-jwt-token'
    });
  });
};

// ==========================
// 📋 Listar todos os usuários (teste)
// ==========================
exports.listUsers = (req, res) => {
  db.all('SELECT id, nome, email, telefone, tipoUsuario FROM usuarios', (err, rows) => {
    if (err) {
      console.error('Erro ao listar usuários:', err.message);
      return res.status(500).json({ message: 'Erro ao listar usuários.' });
    }

    res.json(rows);
  });
};
