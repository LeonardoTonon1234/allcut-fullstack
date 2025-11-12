// Simulação de base de dados com histórico de reservas e máquinas
const { reservas } = require('./reservasService');
const { maquinas } = require('./maquinasService');

// Função de geração de relatório simples
const getUsageReports = async () => {
  // Monta estatísticas básicas
  const totalReservas = reservas ? reservas.length : 0;
  const totalMaquinas = maquinas ? maquinas.length : 0;
  const reservasAtivas = reservas ? reservas.filter(r => r.status === 'confirmada').length : 0;
  const reservasCanceladas = reservas ? reservas.filter(r => r.status === 'cancelada').length : 0;

  return {
    totalMaquinas,
    totalReservas,
    reservasAtivas,
    reservasCanceladas,
    geradoEm: new Date()
  };
};

module.exports = { getUsageReports };
