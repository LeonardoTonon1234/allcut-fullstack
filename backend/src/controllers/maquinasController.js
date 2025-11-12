const maquinasService = require('../services/maquinasService');

// Criar nova máquina
const create = async (req, res) => {
  try {
    const maquina = await maquinasService.create(req.body);
    res.status(201).json(maquina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todas as máquinas
const list = async (req, res) => {
  try {
    const maquinas = await maquinasService.list();
    res.json(maquinas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Buscar uma máquina específica
const get = async (req, res) => {
  try {
    const maquina = await maquinasService.get(req.params.id);
    if (!maquina) {
      return res.status(404).json({ error: 'Máquina não encontrada.' });
    }
    res.json(maquina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar dados gerais (nome, descrição, capacidade, status, datas, horários)
const update = async (req, res) => {
  try {
    const maquina = await maquinasService.update(req.params.id, req.body);
    res.json(maquina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remover uma máquina
const del = async (req, res) => {
  try {
    const result = await maquinasService.del(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Adicionar uma nova data disponível à máquina
const adicionarData = async (req, res) => {
  try {
    const maquina = await maquinasService.adicionarData(req.params.id, req.body.data);
    res.json(maquina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remover uma data disponível da máquina
const removerData = async (req, res) => {
  try {
    const maquina = await maquinasService.removerData(req.params.id, req.body.data);
    res.json(maquina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Adicionar um horário disponível à máquina
const adicionarHorario = async (req, res) => {
  try {
    const maquina = await maquinasService.adicionarHorario(req.params.id, req.body.horario);
    res.json(maquina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remover um horário disponível da máquina
const removerHorario = async (req, res) => {
  try {
    const maquina = await maquinasService.removerHorario(req.params.id, req.body.horario);
    res.json(maquina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Atualizar apenas a capacidade da máquina
const atualizarCapacidade = async (req, res) => {
  try {
    const { capacidade } = req.body;
    const maquina = await maquinasService.update(req.params.id, { capacidade });
    res.json(maquina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Exporta todas as funções do controller
module.exports = {
  create,
  list,
  get,
  update,
  del,
  adicionarData,
  removerData,
  adicionarHorario,
  removerHorario,
  atualizarCapacidade
};
