import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Cadastro = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    userType: "aluno",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "O nome deve estar completo.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Use um e-mail institucional válido.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Use um e-mail institucional válido.";
    }

    if (!formData.password) {
      newErrors.password = "A senha deve conter pelo menos 8 caracteres.";
    } else if (formData.password.length < 8) {
      newErrors.password = "A senha deve conter pelo menos 8 caracteres.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast({
        title: "Cadastro em desenvolvimento",
        description: "A funcionalidade de cadastro será implementada em breve.",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <h1 className="text-4xl font-bold text-foreground mb-12 text-center">
            Cadastrar-se no AllCut
          </h1>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="mb-16">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-8">
              {/* Nome completo */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground font-normal">
                  Nome completo
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className={errors.fullName ? "border-red-500" : ""}
                  aria-label="Nome completo"
                />
                <p className="text-sm text-muted-foreground">
                  {errors.fullName || "O nome deve estar completo."}
                </p>
              </div>

              {/* E-mail institucional */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-normal">
                  E-mail institucional
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@university.edu"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                  aria-label="E-mail institucional"
                />
                <p className="text-sm text-muted-foreground">
                  {errors.email || "Use um e-mail institucional válido."}
                </p>
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-normal">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={errors.password ? "border-red-500" : ""}
                  aria-label="Senha"
                />
                <p className="text-sm text-muted-foreground">
                  {errors.password || "A senha deve conter pelo menos 8 caracteres."}
                </p>
              </div>

              {/* Confirmar senha */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground font-normal">
                  Confirmar senha
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                  aria-label="Confirmar senha"
                />
                <p className="text-sm text-muted-foreground">
                  {errors.confirmPassword || "Confirme sua senha."}
                </p>
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground font-normal">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  aria-label="Telefone"
                />
                <p className="text-sm text-muted-foreground">
                  Opcional, mas recomendado.
                </p>
              </div>

              {/* Tipo de usuário */}
              <div className="space-y-2">
                <Label className="text-foreground font-normal">
                  Tipo de usuário
                </Label>
                <RadioGroup
                  value={formData.userType}
                  onValueChange={(value) => handleInputChange("userType", value)}
                  className="flex flex-col space-y-2 pt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin" className="font-normal cursor-pointer">
                      Sou Administrador/Prefeitura
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="aluno" id="aluno" />
                    <Label htmlFor="aluno" className="font-normal cursor-pointer">
                      Sou Aluno
                    </Label>
                  </div>
                </RadioGroup>
                <p className="text-sm text-muted-foreground">
                  Selecione a opção que se aplica a você.
                </p>
              </div>
            </div>

            {/* Botões */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="min-w-[200px]"
                onClick={() => navigate("/login")}
              >
                Já possui conta? Entrar
              </Button>
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="min-w-[200px]"
              >
                Registrar
              </Button>
            </div>
          </form>

          {/* Seção de Dicas */}
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Dicas</h2>
            </div>
            <div className="border border-border rounded-lg p-6 bg-background">
              <ul className="space-y-2 text-foreground">
                <li>• Usar e-mail institucional</li>
                <li>• Manter dados atualizados...</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cadastro;
