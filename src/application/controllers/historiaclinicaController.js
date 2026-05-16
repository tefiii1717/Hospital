'use strict';

const HistoriaClinicaService = require('../../domain/services/HistoriaClinicaService');

// POST /api/v1/historias
const crearHistoria = async (req, res) => {
  try {
    const { pacienteId } = req.body;
    if (!pacienteId) {
      return res.status(400).json({ message: 'pacienteId es obligatorio.' });
    }
    const historia = await HistoriaClinicaService.crearHistoriaClinica(pacienteId);
    return res.status(201).json(historia);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/v1/historias/paciente/:pacienteId
const consultarHistoriaPorPaciente = async (req, res) => {
  try {
    const historia = await HistoriaClinicaService.buscarPorPaciente(req.params.pacienteId);
    if (!historia) return res.status(404).json({ message: 'Historia clínica no encontrada.' });
    return res.json(historia);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/v1/historias/:id/notas
// RF3 + RN4: agregar nota queda registrada en NotaMedica
const anadirNota = async (req, res) => {
  try {
    const { medicoId, nota } = req.body;
    if (!medicoId || !nota) {
      return res.status(400).json({ message: 'medicoId y nota son obligatorios.' });
    }
    const notaCreada = await HistoriaClinicaService.anadirNota(req.params.id, medicoId, nota);
    return res.status(201).json(notaCreada);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { crearHistoria, consultarHistoriaPorPaciente, anadirNota };