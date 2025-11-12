import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService"; // 🔹 import do novo service

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);

      // 🔹 envia os dados pro backend via service
      const result = await login({ email, password });

      // 🔹 sucesso
      alert(result.message || "Login realizado com sucesso!");

      // se quiser guardar o token:
      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      // redireciona pra home
      navigate("/");

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Falha ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-24">
            <div className="flex items-center justify-center lg:justify-start">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                Entrar no AllCut
              </h1>
            </div>

            <div className="w-full max-w-md mx-auto lg:mx-0">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    E-mail institucional
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="E-mail institucional"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground font-medium">
                    Senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-label="Senha"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Lembrar-me
                  </Label>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    asChild
                  >
                    <Link to="/cadastro">Registrar-se</Link>
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="flex-1"
                    disabled={loading}
                  >
                    {loading ? "Entrando..." : "Entrar"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
