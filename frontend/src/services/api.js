// frontend/src/services/api.js
const API_BASE_URL = "https://shiny-space-umbrella-x5w65jp969g936q95-5000.app.github.dev/api";

/**
 * 🔹 Lista todas as máquinas cadastradas
 */
export async function listarMaquinas() {
  const res = await fetch(`${API_BASE_URL}/maquinas`);
  if (!res.ok) throw new Error("Erro ao buscar máquinas");
  return await res.json();
}

/**
 * 🔹 Cria uma nova máquina
 */
export async function criarMaquina(dados) {
  const res = await fetch(`${API_BASE_URL}/maquinas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error("Erro ao criar máquina");
  return await res.json();
}
