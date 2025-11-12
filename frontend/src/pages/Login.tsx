import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Validação básica
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    // Preparado para integração futura com endpoint /login
    console.log("Login:", { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Seção de Login */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-24">
            {/* Título à esquerda */}
            <div className="flex items-center justify-center lg:justify-start">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                Entrar no AllCut
              </h1>
            </div>

            {/* Formulário à direita */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Campo E-mail */}
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
                    className="border-input"
                  />
                  <p className="text-sm text-muted-foreground">
                    O email deve ser institucional.
                  </p>
                </div>

                {/* Campo Senha */}
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
                    className="border-input"
                  />
                  <p className="text-sm text-muted-foreground">
                    A senha deve ter pelo menos 8 caracteres.
                  </p>
                </div>

                {/* Checkbox Lembrar-me */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    aria-label="Lembrar-me"
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Lembrar-me
                  </Label>
                </div>

                {/* Botões */}
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
                  >
                    Entrar
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Seção de Dicas */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-12">
            {/* Título à esquerda */}
            <div className="flex items-center justify-center lg:justify-start">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Dicas
              </h2>
            </div>

            {/* Caixa de dicas à direita */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="border border-border rounded-lg p-6 bg-background">
                <h3 className="font-semibold text-foreground mb-3">Dicas</h3>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Usar e-mail institucional</li>
                  <li>• Manter dados atualizados…</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Link Esqueci minha senha */}
          <div className="text-center lg:text-left lg:ml-[calc(50%+3rem)]">
            <button
              type="button"
              className="text-sm text-foreground hover:text-muted-foreground transition-colors underline"
              onClick={() => alert("Funcionalidade em desenvolvimento")}
            >
              Esqueci minha senha
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
