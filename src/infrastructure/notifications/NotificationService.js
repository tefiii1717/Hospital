'use strict';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const NotificacionService = {
  async enviarConfirmacionCita(destinatario, detalles) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: destinatario,
      subject: 'Confirmación de cita médica',
      text: `Su cita ha sido confirmada para el ${detalles.fecha} con el Dr. ${detalles.medico}`
    });
  },

  async enviarRecordatorio(destinatario, detalles) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: destinatario,
      subject: 'Recordatorio de cita médica',
      text: `Recuerde que tiene una cita mañana a las ${detalles.hora} con el Dr. ${detalles.medico}`
    });
  },

  async enviarAltaMedica(destinatario, detalles) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: destinatario,
      subject: 'Alta médica registrada',
      text: `Se ha registrado su alta médica el día ${detalles.fecha}. ${detalles.indicaciones}`
    });
  }
};

module.exports = NotificacionService;
