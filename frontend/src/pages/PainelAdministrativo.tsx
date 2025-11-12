import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SidebarAdmin from "@/components/SidebarAdmin";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Calendar, Scissors, AlertCircle, Search, Trash2, Edit, Plus, Wrench } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PainelAdministrativo = () => {
  const { toast } = useToast();
  const [searchUser, setSearchUser] = useState("");
  const [newMachine, setNewMachine] = useState("");

  // Mock data
  const [users] = useState([
    { id: 1, nome: "João Silva", email: "joao@instituicao.edu", tipo: "Usuário", status: "Ativo" },
    { id: 2, nome: "Maria Santos", email: "maria@instituicao.edu", tipo: "Administrador", status: "Ativo" },
    { id: 3, nome: "Pedro Costa", email: "pedro@instituicao.edu", tipo: "Usuário", status: "Inativo" },
    { id: 4, nome: "Ana Paula", email: "ana@instituicao.edu", tipo: "Usuário", status: "Ativo" },
  ]);

  const [machines, setMachines] = useState([
    { id: 1, nome: "Cortadora A", status: "Disponível" },
    { id: 2, nome: "Cortadora B", status: "Em uso" },
    { id: 3, nome: "Cortadora C", status: "Manutenção" },
  ]);

  const schedules = [
    { cortadora: "Cortadora A", dias: "Segunda e Sexta – 09:00 às 18:00" },
    { cortadora: "Cortadora B", dias: "Terça e Quinta – 13:00 às 20:00" },
    { cortadora: "Cortadora C", dias: "Quarta e Sábado – 10:00 às 19:00" },
  ];

  const handleEditUser = (id: number) => {
    toast({
      title: "Editar Usuário",
      description: `Editando usuário ID: ${id}`,
    });
  };

  const handleRemoveUser = (id: number) => {
    toast({
      title: "Remover Usuário",
      description: `Usuário ID: ${id} removido com sucesso`,
      variant: "destructive",
    });
  };

  const handleAddMachine = () => {
    if (newMachine.trim()) {
      setMachines([...machines, { id: machines.length + 1, nome: newMachine, status: "Disponível" }]);
      setNewMachine("");
      toast({
        title: "Cortadora Adicionada",
        description: `${newMachine} foi adicionada com sucesso`,
      });
    }
  };

  const handleEditMachine = (id: number) => {
    toast({
      title: "Editar Cortadora",
      description: `Editando cortadora ID: ${id}`,
    });
  };

  const handleDeactivateMachine = (id: number) => {
    toast({
      title: "Desativar Cortadora",
      description: `Cortadora ID: ${id} desativada`,
      variant: "destructive",
    });
  };

  const filteredUsers = users.filter(user =>
    user.nome.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 pt-16">
        <SidebarAdmin />
        
        <main className="flex-1 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <div className="text-sm text-muted-foreground mb-4">
              Início &gt; Painel Administrativo
            </div>

            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-2">Painel Administrativo</h1>
              <p className="text-muted-foreground">Gerencie os recursos da plataforma.</p>
            </div>

            {/* Resumo Rápido */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">Resumo Rápido</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">150</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Total de usuários com conta ativa
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Agendamentos em Fluxo</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Agendamentos em andamento
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Cortadoras em Uso</CardTitle>
                    <Scissors className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Máquinas operando no momento
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Solicitações Pendentes</CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Novos cadastros aguardando aprovação
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Tabela de Usuários */}
            <section id="usuarios" className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">Tabela de Usuários</h2>
              
              {/* Search */}
              <div className="mb-6 flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar Usuário"
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="border border-border rounded-lg overflow-hidden mb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.nome}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.tipo === "Administrador" ? "default" : "secondary"}>
                            {user.tipo}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Ativo" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditUser(user.id)}
                            className="mr-2"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remover
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>

            {/* Gerenciar Cortadoras */}
            <section id="cortadoras" className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">Gerenciar Cortadoras</h2>
              
              <div className="border border-border rounded-lg overflow-hidden mb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Cortadora</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {machines.map((machine) => (
                      <TableRow key={machine.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Wrench className="h-4 w-4 text-muted-foreground" />
                            {String(machine.id).padStart(2, '0')}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{machine.nome}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              machine.status === "Disponível"
                                ? "default"
                                : machine.status === "Em uso"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {machine.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditMachine(machine.id)}
                            className="mr-2"
                          >
                            Editar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeactivateMachine(machine.id)}
                          >
                            Desativar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Add Machine */}
              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Cortadora</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Nome da nova cortadora"
                      value={newMachine}
                      onChange={(e) => setNewMachine(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleAddMachine} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Adicionar Cortadora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Gerenciar Horários */}
            <section id="horarios" className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Gerenciar Horários Disponíveis e de Funcionamento
              </h2>
              
              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cortadora</TableHead>
                      <TableHead>Dias de Funcionamento</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedules.map((schedule, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{schedule.cortadora}</TableCell>
                        <TableCell>{schedule.dias}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default PainelAdministrativo;
