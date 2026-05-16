const {HistoriaClinica, NotaMedica, Paciente} = require('../../infrastructure/database/models');

class HistoriaClinicaService{
    async crearHistoriaClinica(pacienteId) {
        const paciente = await Paciente.findByPk(pacienteId);
        if (!paciente){
            throw new Error('El paciente no existe');
        }

        const existente = await HistoriaClinica.findOne({where: {PacienteId: pacienteId}});
        if (existente) {
            throw new Error('Ya existe una historia clínica del paciente.');
        }

        return await HistoriaClinica.create({
            PacienteId: pacienteId,
            fechaApertura: new Date()
        });
    }

    async anadirNota(historiaClinicaId, medicoId, nota) {
        const historia = await HistoriaClinica.findByPk(historiaClinicaId);
        if (!historia) {
            throw new Error('La historia clínica no existe.');
        }

        return await NotaMedica.create({
            HistoriaClinicaId: historiaClinicaId,
            MedicoId: medicoId,
            nota: nota,
            fecha: new Date()
        });
    }

    async buscarPorPaciente(pacienteId) {
        return await HistoriaClinica.findOne({
            where: {PacienteId: pacienteId},
            include: ['NotaMedicas', 'Recetas']
        });
    }
}
module.exports = new HistoriaClinicaService();