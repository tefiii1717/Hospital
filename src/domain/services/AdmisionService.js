const { Ingreso, Cama, Paciente } = require('../../infrastructure/database/models');

class AdmisionService {
  async admitirPaciente(pacienteId, motivoIngreso, diasHospitalizacion) {
    const paciente = await Paciente.findByPk(pacienteId);
    if (!paciente) throw new Error('El paciente no existe');

    const ingresoActivo = await Ingreso.findOne({
      where: { PacienteId: pacienteId, estado: 'activo' }
    });
    if (ingresoActivo) throw new Error('RN7: El paciente ya tiene un ingreso activo.');

    const cama = await Cama.findOne({ where: { estado: 'disponible' } });
    if (!cama) throw new Error('RN8: No hay camas disponibles en este momento.');

    const fechaIngreso = new Date();
    const fechaAlta = new Date();
    fechaAlta.setDate(fechaAlta.getDate() + parseInt(diasHospitalizacion));

    const ingreso = await Ingreso.create({
      PacienteId: pacienteId,
      CamaId: cama.id,
      motivoIngreso,
      fechaIngreso,
      estado: 'activo'
    });

    await cama.update({ estado: 'ocupada' });

    return {
      ...ingreso.dataValues,
      cama: cama.numero,
      piso: cama.piso,
      fechaAltaEstimada: fechaAlta
    };
  }
}

module.exports = new AdmisionService();