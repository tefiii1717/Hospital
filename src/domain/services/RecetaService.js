const {Receta, HistoriaClinica} = require('../../infrastructure/database/models');

class RecetaService {
    async crearReceta(historiaClinicaId, medicoId, medicamento, dosis, indicaciones) {
        const historia = await HistoriaClinica.findByPk(historiaClinicaId);
        if (!historia) {
            throw new Error('La historia clínica no existe.');
        }

        return await Receta.create({
            HistoriaClinicaId: historiaClinicaId,
            MedicoId: medicoId,
            medicamento: medicamento,
            dosis: dosis,
            indicaciones: indicaciones
        });
    }

    async recetasPorHistoria(historiaClinicaId) {
        return await Receta.findAll({
            where: {HistoriaClinicaId: historiaClinicaId}
        });
    }
}
module.exports = new RecetaService();