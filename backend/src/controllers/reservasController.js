const reservasService = require('../services/reservasService');

const create = async (req, res) => {
  try {
    const reserva = await reservasService.create(req.body, req.user.id);
    res.status(201).json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const cancel = async (req, res) => {
  try {
    const reserva = await reservasService.cancel(req.params.id, req.user.id);
    res.json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const list = async (req, res) => {
  try {
    const reservas = await reservasService.list(req.user.id);
    res.json(reservas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addSuplente = async (req, res) => {
  try {
    const reserva = await reservasService.addSuplente(req.params.id, req.body.userId);
    res.json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const reagendar = async (req, res) => {
  try {
    const reserva = await reservasService.reagendar(req.params.id, req.body.novaData, req.user.id);
    res.json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const confirmarPresenca = async (req, res) => {
  try {
    const reserva = await reservasService.confirmarPresenca(req.params.id, req.user.id);
    res.json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { create, cancel, list, addSuplente, reagendar, confirmarPresenca };
