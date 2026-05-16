'use strict';

const AdmisionService = require('../../domain/services/AdmisionService');

// POST /api/v1/admisiones
const registrarIngreso = async (req, res) => {
  try {
    const { pacienteId, camaId, motivoIngreso } = req.body;
    if (!pacienteId || !camaId) {
      return res.status(400).json({ message: 'pacienteId y camaId son obligatorios.' });
    }
    const ingreso = await AdmisionService.admitirPaciente(pacienteId, camaId, motivoIngreso);
    return res.status(201).json(ingreso);
  } catch (error) {
    const esReglaNegocio = error.message.startsWith('RN');
    return res.status(esReglaNegocio ? 409 : 500).json({ message: error.message });
  }
};

module.exports = { registrarIngreso };