const {Ingreso, Cama, Paciente} = require('../../infrastructure/database/models');

class AdmisionService {
    async admitirPaciente(pacienteId, camaId, motivoIngreso) {
        const paciente = await Paciente.findByPk(pacienteId);
        if (!paciente) {
            throw new Error('El paciente no existe');
        }

        const ingresoActivo = await Ingreso.findOne({where: {PacienteId: pacienteId, estado: 'activo'}});
        if (ingresoActivo) {
            throw new Error('El paciente ya tiene un ingreso activo.');
        }

        const cama = await Cama.findByPk(camaId);
        if (!cama) {
            throw new Error('La cama no existe.');
        }
        if (cama.estado !== 'disponible') {
            throw new Error('RN8: La cama no está disponible.');
        }

        const ingreso = await Ingreso.create({
            PacienteId: pacienteId,
            CamaId: camaId,
            motivoIngreso: motivoIngreso,
            fechaIngreso: new Date(),
            estado: 'activo'
        });

        await cama.update({estado: 'ocupada'});
        return ingreso;
    }
}
module.exports = new AdmisionService();