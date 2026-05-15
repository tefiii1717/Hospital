const {Alta, Ingreso, Cama} = require('../../infrastructure/database/models');

class AltaService {
    async darAlta(ingresoId, medicoId, motivoAlta, epicrisis) {
        const ingreso = await Ingreso.findByPk(ingresoId, {include: ['Cama']});
        if (!ingreso) {
            throw new Error('El ingreso no existe.');
        }
        if (ingreso.estado !== 'activo') {
            throw new Error('El ingreso ya fue cerrado.');
        }

        const alta = await alta.create({
            IngresoId: ingresoId,
            MedicoId: medicoId,
            motivoAlta: motivoAlta,
            epicrisis: epicrisis,
            fechaAlta: new Date()
        });

        await ingreso.update({estado: 'cerrado'});
        await ingreso.Cama.update({estado: 'disponible'});
        return alta;
    }
}