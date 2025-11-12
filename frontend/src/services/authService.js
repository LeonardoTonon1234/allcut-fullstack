// frontend/src/services/authService.js
import axios from "axios";

/**
 * 🔧 Configuração dinâmica da URL base da API
 * - Se estiver no GitHub Codespaces → usa a URL pública.
 * - Se estiver rodando localmente → usa localhost:5000.
 */
const API_BASE_URL =
  window.location.hostname.includes("github.dev") ||
  window.location.hostname.includes("app.github.dev")
    ? "https://shiny-space-umbrella-x5w65jp969g936q95-5000.app.github.dev/api/auth"
    : "http://localhost:5000/api/auth";

// Cria instância do Axios com base na URL correta
const api = axios.create({
  baseURL: API_BASE_URL,
});

// ==========================
// 🧾 Registro de novo usuário
// ==========================
export async function register(userData) {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error("❌ Erro no register:", error);
    throw error.response?.data || { message: "Erro ao registrar usuário." };
  }
}

// ==========================
// 🔐 Login de usuário
// ==========================
export async function login(credentials) {
  try {
    const response = await api.post("/login", credentials);
    return response.data;
  } catch (error) {
    console.error("❌ Erro no login:", error);
    throw error.response?.data || { message: "Erro ao fazer login." };
  }
}
