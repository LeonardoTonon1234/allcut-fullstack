
const relatoriosService = require('../services/relatoriosService');

/**
 * Gera e retorna o relatório geral do sistema
 * Inclui estatísticas de máquinas, reservas e presença
 */
const getUsageReports = async (req, res) => {
  try {
    const relatorio = await relatoriosService.getUsageReports();

    res.status(200).json({
      sucesso: true,
      mensagem: '📊 Relatório gerado com sucesso.',
      dados: relatorio
    });
  } catch (error) {
    console.error('Erro ao gerar relatório:', error.message);
    res.status(500).json({
      sucesso: false,
      erro: 'Erro ao gerar relatório.',
      detalhes: error.message
    });
  }
};

module.exports = { getUsageReports };
