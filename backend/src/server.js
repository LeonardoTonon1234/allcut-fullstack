// ==========================
// 🔧 Importações principais
// ==========================
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

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
// 🔹 Ajuste correto dos caminhos (sem /src/)
const authRoutes = require('./routes/auth');
const maquinasRoutes = require('./routes/maquinas');
const reservasRoutes = require('./routes/reservas');
const relatoriosRoutes = require('./routes/relatorios');

// ==========================
// 🔒 Middlewares de segurança
// ==========================
const { auth } = require('./middleware/auth');

// ==========================
// 🌐 Rotas principais
// ==========================
app.get('/', (req, res) => {
  res.send('✅ API AllCut rodando com sucesso!');
});

// Rotas da aplicação
app.use('/api/auth', authRoutes);
app.use('/api/maquinas', maquinasRoutes);
app.use('/api/reservas', reservasRoutes);
app.use('/api/relatorios', relatoriosRoutes);

// ==========================
// 📦 Servindo frontend (modo produção)
// ==========================
const distPath = path.resolve(__dirname, '..', '..', 'frontend', 'dist');
app.use(express.static(distPath));

// ✅ Express 5 não aceita '*' nem '/*', então usamos regex
app.get(/^\/(?!api).*/, (req, res) => {
  return res.sendFile(path.join(distPath, 'index.html'));
});

// ==========================
// 🚀 Inicialização do servidor
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
