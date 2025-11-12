// frontend/src/services/authService.js

/**
 * Função para registrar um novo usuário no sistema.
 * Envia os dados do formulário (nome, email, senha etc.) para o backend via HTTP POST.
 */

export async function register(userData) {
  try {
    const response = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao registrar: ${errorText}`);
    }

    const data = await response.json();
    return data; // retorna a resposta do backend
  } catch (error) {
    console.error("Erro no authService:", error);
    throw error;
  }
}

/**
 * Função para login de usuário.
 * Envia email e senha para o backend e recebe um token (se for o caso).
 */
export async function login(credentials) {
  try {
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao fazer login: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro no loginService:", error);
    throw error;
  }
}
