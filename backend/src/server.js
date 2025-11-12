// ==========================
// 🔧 Importações principais
// ==========================
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Carrega as variáveis do arquivo .env
dotenv.config();

// ==========================
// ⚙️ Inicialização do app
// ==========================
const app = express();
app.use(express.json());
app.use(cors());

// ==========================
// 🧱 Importação de rotas
// ==========================
const authRoutes = require('./src/routes/auth');
const maquinasRoutes = require('./src/routes/maquinas');
const reservasRoutes = require('./src/routes/reservas');
const relatoriosRoutes = require('./src/routes/relatorios');

// ==========================
// 🔒 Middlewares de segurança
// ==========================
const { auth } = require('./src/middleware/auth');

// ==========================
// 🌐 Rotas principais
// ==========================
app.get('/', (req, res) => {
  res.send('✅ API AllCut rodando com sucesso!');
});

app.use('/api/auth', authRoutes);
app.use('/api/maquinas', maquinasRoutes);
app.use('/api/reservas', reservasRoutes);
app.use('/api/relatorios', relatoriosRoutes);

// ==========================
// 📦 Static file serving (production)
// ==========================
const path = require('path');
const distPath = path.resolve(__dirname, '..', '..', 'frontend', 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  // Only handle non-API routes
  if (!req.path.startsWith('/api')) {
    return res.sendFile(path.join(distPath, 'index.html'));
  }
  return res.status(404).json({ error: 'Not found' });
});

// ==========================
// 🚀 Inicialização do servidor
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
