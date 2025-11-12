const jwt = require('jsonwebtoken');

// Middleware para autenticação de usuários
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'Acesso negado. Token ausente.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido.' });
  }
};

// Middleware para verificar se é administrador
const admin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Acesso restrito a administradores.' });
  }
  next();
};

module.exports = { auth, admin };
