// Simulação de "banco de dados" em memória
let maquinas = [];

/**
 * Cria uma nova máquina
 */
const create = async (maquinaData) => {
  const novaMaquina = {
    id: maquinas.length + 1,
    nome: maquinaData.nome,
    descricao: maquinaData.descricao,
    status: 'ativa',
    capacidade: maquinaData.capacidade || 1, // quantidade de pessoas que podem usar
    datasDisponiveis: maquinaData.datasDisponiveis || [],
    horariosDisponiveis: maquinaData.horariosDisponiveis || [],
    criadaEm: new Date()
  };
  maquinas.push(novaMaquina);
  return novaMaquina;
};

/**
 * Lista todas as máquinas
 */
const list = async () => maquinas;

/**
 * Busca uma máquina pelo ID
 */
const get = async (id) => maquinas.find(m => m.id === parseInt(id)) || null;

/**
 * Atualiza dados gerais da máquina (nome, descrição, capacidade, etc)
 */
const update = async (id, dadosAtualizados) => {
  const maquina = maquinas.find(m => m.id === parseInt(id));
  if (!maquina) throw new Error('Máquina não encontrada.');

  if (dadosAtualizados.nome) maquina.nome = dadosAtualizados.nome;
  if (dadosAtualizados.descricao) maquina.descricao = dadosAtualizados.descricao;
  if (dadosAtualizados.capacidade) maquina.capacidade = dadosAtualizados.capacidade;
  if (dadosAtualizados.status) maquina.status = dadosAtualizados.status;

  // Atualizar datas e horários, se enviados
  if (Array.isArray(dadosAtualizados.datasDisponiveis)) {
    maquina.datasDisponiveis = dadosAtualizados.datasDisponiveis;
  }
  if (Array.isArray(dadosAtualizados.horariosDisponiveis)) {
    maquina.horariosDisponiveis = dadosAtualizados.horariosDisponiveis;
  }

  return maquina;
};

/**
 * Remove uma máquina pelo ID
 */
const del = async (id) => {
  const index = maquinas.findIndex(m => m.id === parseInt(id));
  if (index === -1) throw new Error('Máquina não encontrada.');

  maquinas.splice(index, 1);
  return { msg: 'Máquina removida com sucesso.' };
};

/**
 * Adiciona uma data disponível
 */
const adicionarData = async (id, novaData) => {
  const maquina = maquinas.find(m => m.id === parseInt(id));
  if (!maquina) throw new Error('Máquina não encontrada.');

  if (!maquina.datasDisponiveis.includes(novaData)) {
    maquina.datasDisponiveis.push(novaData);
  }
  return maquina;
};

/**
 * Remove uma data disponível
 */
const removerData = async (id, dataRemovida) => {
  const maquina = maquinas.find(m => m.id === parseInt(id));
  if (!maquina) throw new Error('Máquina não encontrada.');

  maquina.datasDisponiveis = maquina.datasDisponiveis.filter(d => d !== dataRemovida);
  return maquina;
};

/**
 * Adiciona um horário disponível
 */
const adicionarHorario = async (id, novoHorario) => {
  const maquina = maquinas.find(m => m.id === parseInt(id));
  if (!maquina) throw new Error('Máquina não encontrada.');

  if (!maquina.horariosDisponiveis.includes(novoHorario)) {
    maquina.horariosDisponiveis.push(novoHorario);
  }
  return maquina;
};

/**
 * Remove um horário disponível
 */
const removerHorario = async (id, horarioRemovido) => {
  const maquina = maquinas.find(m => m.id === parseInt(id));
  if (!maquina) throw new Error('Máquina não encontrada.');

  maquina.horariosDisponiveis = maquina.horariosDisponiveis.filter(h => h !== horarioRemovido);
  return maquina;
};

module.exports = { 
  create, 
  list, 
  get, 
  update, 
  del, 
  adicionarData, 
  removerData, 
  adicionarHorario, 
  removerHorario 
};
