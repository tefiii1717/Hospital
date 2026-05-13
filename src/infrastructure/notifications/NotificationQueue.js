'use strict';
const Queue = require('bull');
const NotificacionService = require('./NotificacionService');

const notificacionQueue = new Queue('notificaciones', {
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
});

notificacionQueue.process(async (job) => {
  const { tipo, destinatario, detalles } = job.data;

  switch (tipo) {
    case 'CONFIRMACION_CITA':
      await NotificacionService.enviarConfirmacionCita(destinatario, detalles);
      break;
    case 'RECORDATORIO_CITA':
      await NotificacionService.enviarRecordatorio(destinatario, detalles);
      break;
    case 'ALTA_MEDICA':
      await NotificacionService.enviarAltaMedica(destinatario, detalles);
      break;
    default:
      console.log(`Tipo de notificación desconocido: ${tipo}`);
  }
});

notificacionQueue.on('failed', (job, error) => {
  console.error(`Notificación fallida [${job.data.tipo}]:`, error.message);
});

module.exports = notificacionQueue;