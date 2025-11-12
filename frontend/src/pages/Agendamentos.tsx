import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";

const Agendamentos = () => {
  const [selectedCutter, setSelectedCutter] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    observations: "",
  });

  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.fullName || formData.fullName.length < 5) {
      alert("Nome deve ter pelo menos 5 caracteres");
      return;
    }
    if (!formData.email.includes("@")) {
      alert("E-mail institucional inválido");
      return;
    }
    if (!selectedCutter) {
      alert("Selecione uma cortadora");
      return;
    }
    if (!date) {
      alert("Selecione uma data");
      return;
    }
    if (!selectedTime) {
      alert("Selecione um horário");
      return;
    }
    if (!agreedToTerms) {
      alert("Você deve concordar com as regras de uso");
      return;
    }

    console.log("Agendamento confirmado:", {
      ...formData,
      cutter: selectedCutter,
      date,
      time: selectedTime,
    });
    alert("Agendamento realizado com sucesso!");
  };

  const isFormValid = 
    formData.fullName.length >= 5 &&
    formData.email.includes("@") &&
    selectedCutter &&
    date &&
    selectedTime &&
    agreedToTerms;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Título principal */}
          <h1 className="text-4xl font-bold text-foreground text-center mb-12">
            Agendar Corte a Laser
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Nome completo */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome completo</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Digite seu nome completo"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
              <p className="text-sm text-muted-foreground">
                Nome deve ter pelo menos 5 caracteres.
              </p>
            </div>

            {/* E-mail institucional */}
            <div className="space-y-2">
              <Label htmlFor="email">E-mail institucional</Label>
              <Input
                id="email"
                type="email"
                placeholder="seunome@instituicao.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <p className="text-sm text-muted-foreground">
                E-mail deve ser institucional.
              </p>
            </div>

            {/* Telefone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone para contato</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(99) 99999-9999"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">
                Formato: (DD) 99999-9999.
              </p>
            </div>

            {/* Escolha a cortadora */}
            <div className="space-y-3">
              <Label>Escolha a cortadora</Label>
              <RadioGroup value={selectedCutter} onValueChange={setSelectedCutter}>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="A" id="cutterA" />
                    <Label htmlFor="cutterA" className="font-normal cursor-pointer">
                      Cortadora A
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="B" id="cutterB" />
                    <Label htmlFor="cutterB" className="font-normal cursor-pointer">
                      Cortadora B
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="C" id="cutterC" />
                    <Label htmlFor="cutterC" className="font-normal cursor-pointer">
                      Cortadora C
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Dias de funcionamento */}
            <div className="space-y-2">
              <Label className="text-base">Dias de funcionamento</Label>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Cortadora A – Segunda a Sexta, das 09h00 às 18h00</p>
                <p>Cortadora B – Terça e Quinta, das 13h00 às 20h00</p>
                <p>Cortadora C – Quarta e Sábado, das 10h00 às 19h00</p>
              </div>
            </div>

            {/* Data do agendamento */}
            <div className="space-y-2">
              <Label>Data do agendamento</Label>
              <div className="border rounded-md p-4 bg-background">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  className="pointer-events-auto"
                />
              </div>
            </div>

            {/* Horário */}
            <div className="space-y-3">
              <Label>Horário</Label>
              <div className="flex gap-3 flex-wrap">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                    className="min-w-[80px]"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            {/* Observações */}
            <div className="space-y-2">
              <Label htmlFor="observations">Observações</Label>
              <Textarea
                id="observations"
                placeholder="Notas adicionais sobre o agendamento"
                value={formData.observations}
                onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                rows={4}
              />
            </div>

            {/* Concordo com as regras de uso */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <Label
                htmlFor="terms"
                className="font-normal cursor-pointer leading-tight"
              >
                Concordo com as regras de uso
              </Label>
            </div>

            {/* Botões de ação */}
            <div className="flex gap-4 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                asChild
              >
                <Link to="/meus-agendamentos">Ver meus agendamentos</Link>
              </Button>
              <Button
                type="submit"
                disabled={!isFormValid}
                className="min-w-[200px]"
              >
                Confirmar Agendamento
              </Button>
            </div>
          </form>

          {/* Calendário de Disponibilidade */}
          <section className="mt-16 grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-foreground">
                Calendário de Disponibilidade
              </h2>
              <p className="text-muted-foreground">
                Selecione uma data disponível para agendar seu corte a laser.
              </p>
            </div>
            <div className="border border-border rounded-lg p-6 bg-background">
              <h3 className="font-semibold text-foreground mb-2">
                Visualização do Calendário
              </h3>
              <p className="text-sm text-muted-foreground">
                Veja os dias disponíveis para agendar.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Agendamentos;
