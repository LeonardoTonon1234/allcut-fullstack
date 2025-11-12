// Simulação de envio de e-mails
// (em uma versão futura, pode usar Nodemailer)

const sendConfirmationEmail = (email, reserva) => {
  console.log(`📩 Enviando e-mail de CONFIRMAÇÃO para ${email}`);
  console.log(`Reserva #${reserva.id} confirmada para ${reserva.data || 'data não informada'}`);
};

const sendCancellationEmail = (email, reserva) => {
  console.log(`📩 Enviando e-mail de CANCELAMENTO para ${email}`);
  console.log(`Reserva #${reserva.id} cancelada.`);
};

const sendReminderEmail = (email, reserva) => {
  console.log(`📅 Enviando lembrete de agendamento para ${email}`);
  console.log(`Lembrete da reserva #${reserva.id} marcada para ${reserva.data || 'data não informada'}`);
};

module.exports = {
  sendConfirmationEmail,
  sendCancellationEmail,
  sendReminderEmail
};
