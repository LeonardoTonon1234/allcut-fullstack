// frontend/src/services/authService.js
import axios from "axios";

// 🧩 Configura a URL base da API (ajuste se estiver no Codespaces)
const api = axios.create({
  baseURL: "http://localhost:5000/api/auth", 
  // 🔹 Se estiver no GitHub Codespaces, use esta linha abaixo no lugar:
  // baseURL: "https://shiny-space-umbrella-x5w65jp969g936q95-5000.app.github.dev/api/auth",
});

// ==========================
// 🧾 Registro de novo usuário
// ==========================
export async function register(userData) {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error("Erro no register:", error);
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
    console.error("Erro no login:", error);
    throw error.response?.data || { message: "Erro ao fazer login." };
  }
}
