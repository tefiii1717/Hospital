const {Cita, Medico, Paciente} = require('../../infrastructure/database/models');
const {Op} = require('sequelize');

class CitaService {
    async crearCita(pacienteId, medicoId, fechaHora) {
        const paciente = await Paciente.findByPk(pacienteId);
        if (!paciente) {
            throw new Error('El paciente no existe');
        }

        const medico = await Medico.findByPk(medicoId);
        if (!medico) {
            throw new Error('El médico no existe.');
        }

        const treintaMinutesAntes = new Date(new Date(fechaHora).getTime() - 30 * 60000);
        const treintaMinutesDespues = new Date(new Date(fechaHora).getTime() + 30 * 60000);

        const citaExistente = await Cita.findOne({
            where: {
                MedicoId: medicoId,
                estado: {[Op.ne]: 'cancelada'},
                fechaHora: {
                    [Op.between]: [treintaMinutesAntes, treintaMinutesDespues]
                }
            }
        });

        if (citaExistente) {
            throw new Error('RN5: El médico ya tiene una cita en ese horario.');
        }

        const cita = await Cita.create({
            PacienteId: pacienteId,
            MedicoId: medicoId,
            fechaHora: fechaHora,
            estado: 'pendiente'
        });

        return cita;
    }

    async citasPorMedico(medicoId) {
        return await Cita.findAll({
            where: {MedicoId: medicoId},
            include: ['Paciente', 'Medico']
        });
    }

    async citasPorPaciente(pacienteId) {
        return await Cita.findAll({
            where: {PacienteId: pacienteId},
            include: ['Paciente', 'Medico']
        });
    }

    async cancelarCita(citaId) {
        const cita = await Cita.findByPk(citaId);
        if (!cita) {
            throw new Error('La cita no existe.');
        }
        await cita.update({estado: 'cancelada'});
        return cita;
  }
}