'use strict';

const CitaService = require('../../domain/services/CitaService');

// POST /api/v1/citas
const agendarCita = async (req, res) => {
  try {
    const { pacienteId, medicoId, fechaHora } = req.body;
    if (!pacienteId || !medicoId || !fechaHora) {
      return res.status(400).json({ message: 'pacienteId, medicoId y fechaHora son obligatorios.' });
    }
    const cita = await CitaService.crearCita(pacienteId, medicoId, fechaHora);
    return res.status(201).json(cita);
  } catch (error) {
    const esReglaNegocio = error.message.startsWith('RN');
    return res.status(esReglaNegocio ? 409 : 500).json({ message: error.message });
  }
};

// GET /api/v1/citas/medico/:medicoId
const citasPorMedico = async (req, res) => {
  try {
    const citas = await CitaService.citasPorMedico(req.params.medicoId);
    return res.json(citas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/v1/citas/paciente/:pacienteId
const citasPorPaciente = async (req, res) => {
  try {
    const citas = await CitaService.citasPorPaciente(req.params.pacienteId);
    return res.json(citas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PUT /api/v1/citas/:id/cancelar
const cancelarCita = async (req, res) => {
  try {
    const cita = await CitaService.cancelarCita(req.params.id);
    return res.json(cita);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { agendarCita, citasPorMedico, citasPorPaciente, cancelarCita };