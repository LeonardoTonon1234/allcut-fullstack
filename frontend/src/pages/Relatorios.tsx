import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FileDown, FileSpreadsheet } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Relatorios = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Últimas 2 semanas");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Dados simulados para resumo
  const summary = {
    total: 24,
    confirmados: 18,
    pendentes: 4,
    cancelados: 2,
  };

  // Dados para gráfico de barras
  const weeklyData = [
    { semana: "Sem 1", agendamentos: 5 },
    { semana: "Sem 2", agendamentos: 8 },
    { semana: "Sem 3", agendamentos: 6 },
    { semana: "Sem 4", agendamentos: 5 },
  ];

  // Dados para gráfico de pizza
  const statusData = [
    { name: "Confirmados", value: 18, color: "#000000" },
    { name: "Pendentes", value: 4, color: "#666666" },
    { name: "Cancelados", value: 2, color: "#CCCCCC" },
  ];

  // Dados da tabela
  const appointments = [
    { date: "15/10/2025", cutter: "Cortadora A", user: "João Silva", obs: "Peça acadêmica", status: "Confirmado" },
    { date: "16/10/2025", cutter: "Cortadora B", user: "Maria Santos", obs: "Protótipo", status: "Confirmado" },
    { date: "17/10/2025", cutter: "Cortadora C", user: "Pedro Costa", obs: "Trabalho final", status: "Pendente" },
    { date: "18/10/2025", cutter: "Cortadora A", user: "Ana Oliveira", obs: "Maquete", status: "Confirmado" },
    { date: "19/10/2025", cutter: "Cortadora B", user: "Carlos Souza", obs: "Projeto pessoal", status: "Cancelado" },
  ];

  const handleGenerateReport = () => {
    toast({
      title: "Relatório gerado",
      description: "Os dados foram filtrados com sucesso.",
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "Exportando PDF",
      description: "O download do relatório em PDF será iniciado em breve.",
    });
  };

  const handleExportExcel = () => {
    toast({
      title: "Exportando Excel",
      description: "O download da planilha será iniciado em breve.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-4 text-sm text-muted-foreground">
            Início &gt; Relatórios
          </div>

          {/* Título */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Relatórios</h1>
            <p className="text-muted-foreground">
              Visualize e analise seus agendamentos de forma prática e estruturada.
            </p>
          </div>

          {/* Filtros */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Filtrar Relatórios</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {/* Período */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Período
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Últimas 2 semanas", "Último mês", "Últimos 3 meses", "Personalizado"].map((period) => (
                        <Button
                          key={period}
                          variant={selectedPeriod === period ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedPeriod(period)}
                          className="text-xs"
                        >
                          {period}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Data inicial */}
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-foreground mb-2">
                      Data inicial
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    />
                  </div>

                  {/* Data final */}
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-foreground mb-2">
                      Data final
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Status
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Todos", "Confirmados", "Pendentes", "Cancelados"].map((status) => (
                        <Button
                          key={status}
                          variant={selectedStatus === status ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedStatus(status)}
                          className="text-xs"
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <Button onClick={handleGenerateReport} className="w-full md:w-auto">
                  Gerar Relatório
                </Button>
              </CardContent>
            </Card>
          </section>

          {/* Resumo em Números */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Resumo em números</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">{summary.total}</CardTitle>
                  <CardDescription>Total de Agendamentos</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">{summary.confirmados}</CardTitle>
                  <CardDescription>Agendamentos Confirmados</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">{summary.pendentes}</CardTitle>
                  <CardDescription>Agendamentos Pendentes</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">{summary.cancelados}</CardTitle>
                  <CardDescription>Agendamentos Cancelados</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>

          {/* Visualizações */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Visualizações</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de Barras */}
              <Card>
                <CardHeader>
                  <CardTitle>Agendamentos por Semana</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="semana" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="agendamentos" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Gráfico de Pizza */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry: any) => `${entry.name}: ${((entry.value / summary.total) * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Tabela de Agendamentos */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Tabela de Agendamentos</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Cortadora</TableHead>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Observações</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments.map((appointment, index) => (
                        <TableRow key={index}>
                          <TableCell>{appointment.date}</TableCell>
                          <TableCell>{appointment.cutter}</TableCell>
                          <TableCell>{appointment.user}</TableCell>
                          <TableCell>{appointment.obs}</TableCell>
                          <TableCell>
                            <span
                              className={
                                appointment.status === "Confirmado"
                                  ? "text-foreground font-medium"
                                  : appointment.status === "Pendente"
                                  ? "text-muted-foreground"
                                  : "text-muted-foreground/50"
                              }
                            >
                              {appointment.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Exportar */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Exportar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleExportPDF}>
                <CardContent className="flex items-center gap-4 pt-6">
                  <FileDown className="w-12 h-12 text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Exportar PDF</h3>
                    <p className="text-sm text-muted-foreground">Download estruturado</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleExportExcel}>
                <CardContent className="flex items-center gap-4 pt-6">
                  <FileSpreadsheet className="w-12 h-12 text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Exportar Excel</h3>
                    <p className="text-sm text-muted-foreground">Planilha para análise</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Relatorios;
