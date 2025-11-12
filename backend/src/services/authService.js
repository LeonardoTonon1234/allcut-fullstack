const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Usuários salvos temporariamente na memória (simulação)
const users = [];

// Função para registrar novo usuário
const register = async (email, password, role = 'aluno') => {
  const userExists = users.find(u => u.email === email);
  if (userExists) throw new Error('Usuário já cadastrado.');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, email, password: hashedPassword, role };
  users.push(newUser);

  return { id: newUser.id, email: newUser.email, role: newUser.role };
};

// Função para login
const login = async (email, password) => {
  const user = users.find(u => u.email === email);
  if (!user) throw new Error('Credenciais inválidas.');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Credenciais inválidas.');

  const payload = { user: { id: user.id, role: user.role } };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
};

module.exports = { register, login };
