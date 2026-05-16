'use strict';

const AltaService = require('../../domain/services/AltaService');

// POST /api/v1/altas
const registrarAlta = async (req, res) => {
  try {
    const { ingresoId, medicoId, motivoAlta, epicrisis } = req.body;
    if (!ingresoId || !medicoId) {
      return res.status(400).json({ message: 'ingresoId y medicoId son obligatorios.' });
    }
    const alta = await AltaService.darAlta(ingresoId, medicoId, motivoAlta, epicrisis);
    return res.status(201).json(alta);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { registrarAlta };