import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ScheduleStatus = "Confirmado" | "Pendente" | "Cancelado";

interface Schedule {
  id: number;
  date: string;
  time: string;
  cutter: string;
  description: string;
  status: ScheduleStatus;
}

const MeusAgendamentos = () => {
  const { toast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState<string>("Todos");
  const [filterDate, setFilterDate] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 1,
      date: "15/10/2025",
      time: "14:00",
      cutter: "Cortadora A",
      description: "Peça acadêmica",
      status: "Confirmado",
    },
    {
      id: 2,
      date: "18/10/2025",
      time: "10:00",
      cutter: "Cortadora B",
      description: "Projeto de pesquisa",
      status: "Confirmado",
    },
    {
      id: 3,
      date: "20/10/2025",
      time: "15:00",
      cutter: "Cortadora C",
      description: "Protótipo de design",
      status: "Pendente",
    },
    {
      id: 4,
      date: "22/10/2025",
      time: "11:00",
      cutter: "Cortadora A",
      description: "Maquete arquitetônica",
      status: "Confirmado",
    },
    {
      id: 5,
      date: "12/10/2025",
      time: "09:00",
      cutter: "Cortadora B",
      description: "Teste de material",
      status: "Cancelado",
    },
  ]);

  const handleCancelSchedule = (id: number) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === id ? { ...schedule, status: "Cancelado" as ScheduleStatus } : schedule
      )
    );
    toast({
      title: "Agendamento cancelado",
      description: "Seu agendamento foi cancelado com sucesso.",
    });
  };

  const getFilteredSchedules = () => {
    let filtered = [...schedules];

    // Filtrar por status
    if (selectedFilter !== "Todos") {
      filtered = filtered.filter((schedule) => schedule.status === selectedFilter);
    }

    // Filtrar por data
    if (filterDate) {
      const [year, month, day] = filterDate.split("-");
      const formattedDate = `${day}/${month}/${year}`;
      filtered = filtered.filter((schedule) => schedule.date === formattedDate);
    }

    // Filtrar por texto (cortadora ou descrição)
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (schedule) =>
          schedule.cutter.toLowerCase().includes(searchLower) ||
          schedule.description.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  };

  const filteredSchedules = getFilteredSchedules();

  const getStatusColor = (status: ScheduleStatus) => {
    switch (status) {
      case "Confirmado":
        return "text-foreground";
      case "Pendente":
        return "text-muted-foreground";
      case "Cancelado":
        return "text-muted-foreground/60";
      default:
        return "text-foreground";
    }
  };

  const filterButtons = ["Todos", "Confirmado", "Pendente", "Cancelado"];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Título principal */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Meus Agendamentos
            </h1>
            <p className="text-muted-foreground">
              Gerencie suas reservas de cortadoras de laser.
            </p>
          </div>

          {/* Lista de Agendamentos */}
          <section className="mb-16">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">Agendamentos</h2>
              <p className="text-sm text-muted-foreground">Lista de agendamentos</p>
            </div>

            <div className="space-y-4">
              {filteredSchedules.length === 0 ? (
                <div className="text-center py-12 border border-border rounded-lg">
                  <p className="text-muted-foreground">
                    Nenhum agendamento encontrado com os filtros aplicados.
                  </p>
                </div>
              ) : (
                filteredSchedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="flex items-center justify-between py-4 px-6 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-1">
                        <span className="font-medium text-foreground">
                          {schedule.date} | {schedule.time}
                        </span>
                      </div>
                      <p className={`text-sm ${getStatusColor(schedule.status)}`}>
                        {schedule.cutter} | {schedule.description} | {schedule.status}
                      </p>
                    </div>
                    {schedule.status !== "Cancelado" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCancelSchedule(schedule.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        [Cancelar]
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Filtros */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Filtros</h2>
              <p className="text-muted-foreground">Refine sua busca de agendamentos.</p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Filtrar por Status */}
              <div className="space-y-3">
                <Label className="text-base">Filtrar por Status</Label>
                <div className="flex gap-3 flex-wrap">
                  {filterButtons.map((filter) => (
                    <Button
                      key={filter}
                      type="button"
                      variant={selectedFilter === filter ? "default" : "outline"}
                      onClick={() => setSelectedFilter(filter)}
                      className="min-w-[100px]"
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Filtrar por Data */}
              <div className="space-y-3">
                <Label htmlFor="filterDate" className="text-base">
                  Filtrar por Data
                </Label>
                <Input
                  id="filterDate"
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="max-w-xs"
                />
                <p className="text-sm text-muted-foreground">
                  Selecione a data
                </p>
              </div>

              {/* Buscar por Cortadora ou Observação */}
              <div className="space-y-3">
                <Label htmlFor="searchText" className="text-base">
                  Buscar por Cortadora ou Observação
                </Label>
                <Input
                  id="searchText"
                  type="text"
                  placeholder="Digite aqui"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="max-w-md"
                />
              </div>

              {/* Botão Aplicar Filtros */}
              <div className="pt-4">
                <Button
                  type="button"
                  onClick={() => {
                    toast({
                      title: "Filtros aplicados",
                      description: "Os agendamentos foram filtrados conforme sua seleção.",
                    });
                  }}
                  className="min-w-[200px]"
                >
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          </section>

          {/* Calendário de Agendamentos */}
          <section className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-foreground">Calendário</h2>
              <p className="text-muted-foreground">Datas reservadas</p>
            </div>
            <div className="border border-border rounded-lg p-8 bg-background">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-foreground" />
                <h3 className="font-semibold text-foreground">Calendário Atual</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Datas com agendamentos destacados.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MeusAgendamentos;
