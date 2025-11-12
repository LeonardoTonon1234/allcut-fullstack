// 📁 services/reservasService.js
// Simulação de “banco de dados” em memória
let reservas = [];

const notificacoesService = require('./notificacoesService');

/**
 * Cria uma nova reserva
 */
const create = async (reservaData, userId) => {
  const newReserva = {
    id: reservas.length + 1,
    ...reservaData,
    userId,
    status: 'confirmada',
    criadaEm: new Date()
  };

  reservas.push(newReserva);
  notificacoesService.sendConfirmationEmail(reservaData.email, newReserva);
  return newReserva;
};

/**
 * Cancela uma reserva
 */
const cancel = async (reservaId, userId) => {
  const reserva = reservas.find(r => r.id === parseInt(reservaId) && r.userId === userId);
  if (!reserva) throw new Error('Reserva não encontrada.');

  reserva.status = 'cancelada';
  notificacoesService.sendCancellationEmail(reserva.email, reserva);
  return reserva;
};

/**
 * Lista as reservas de um usuário específico
 */
const list = async (userId) => reservas.filter(r => r.userId === userId);

/**
 * Lista TODAS as reservas (para uso administrativo e relatórios)
 */
const listAll = async () => reservas;

/**
 * Adiciona suplente à reserva
 */
const addSuplente = async (reservaId, suplenteId) => {
  const reserva = reservas.find(r => r.id === parseInt(reservaId));
  if (!reserva) throw new Error('Reserva não encontrada.');

  reserva.suplenteId = suplenteId;
  return reserva;
};

/**
 * Reagenda uma reserva
 */
const reagendar = async (reservaId, novaData, userId) => {
  const reserva = reservas.find(r => r.id === parseInt(reservaId) && r.userId === userId);
  if (!reserva) throw new Error('Reserva não encontrada.');

  reserva.data = novaData;
  reserva.status = 'reagendada';
  return reserva;
};

/**
 * Confirma presença do usuário
 */
const confirmarPresenca = async (reservaId, userId) => {
  const reserva = reservas.find(r => r.id === parseInt(reservaId) && r.userId === userId);
  if (!reserva) throw new Error('Reserva não encontrada.');

  reserva.status = 'presenca_confirmada';
  notificacoesService.sendConfirmationEmail(reserva.email, reserva);
  return reserva;
};

module.exports = { 
  create, 
  cancel, 
  list, 
  listAll, 
  addSuplente, 
  reagendar, 
  confirmarPresenca 
};
