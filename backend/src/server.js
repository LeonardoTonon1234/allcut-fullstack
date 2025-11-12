// ==========================
// 🔧 Importações principais
// ==========================
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Carrega variáveis do .env
dotenv.config();

// ==========================
// ⚙️ Inicialização do app
// ==========================
const app = express();
app.use(express.json());

// ==========================
// 🌍 CORS configurado corretamente
// ==========================
app.use(
  cors({
    origin: [
      "http://localhost:5173", // ambiente local
      "https://shiny-space-umbrella-x5w65jp969g936q95-5173.app.github.dev", // frontend Codespaces
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// ==========================
// 🧱 Importação de rotas
// ==========================
const authRoutes = require("./routes/auth");
const maquinasRoutes = require("./routes/maquinas");
const reservasRoutes = require("./routes/reservas");
const relatoriosRoutes = require("./routes/relatorios");

// ==========================
// 🔒 Middlewares de segurança
// ==========================
const { auth } = require("./middleware/auth");

// ==========================
// 🌐 Rotas principais
// ==========================
app.get("/", (req, res) => {
  res.send("✅ API AllCut rodando com sucesso!");
});

// Rotas da aplicação
app.use("/api/auth", authRoutes);
app.use("/api/maquinas", maquinasRoutes);
app.use("/api/reservas", reservasRoutes);
app.use("/api/relatorios", relatoriosRoutes);

// ==========================
// 📦 Servindo frontend (modo produção)
// ==========================
const distPath = path.resolve(__dirname, "..", "..", "frontend", "dist");
app.use(express.static(distPath));

app.get(/^\/(?!api).*/, (req, res) => {
  return res.sendFile(path.join(distPath, "index.html"));
});

// ==========================
// 🚀 Inicialização do servidor
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(
    `🌍 Backend acessível em: https://shiny-space-umbrella-x5w65jp969g936q95-5000.app.github.dev`
  );
});
