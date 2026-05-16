'use strict';

// Conecta con los modelos de Persona 1
const { Paciente } = require('../../infrastructure/database/models/index.js');

/**
 * GET /api/v1/pacientes
 * Roles permitidos: Admin, Medico, Enfermero
 */
const listarPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll({
      attributes: ['id', 'nombre', 'fechaNacimiento'], // nunca exponer campos sensibles de más
    });
    return res.json(pacientes);
  } catch (error) {
    console.error('Error listarPacientes:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

/**
 * GET /api/v1/pacientes/:id
 * Roles permitidos: Admin, Medico, Enfermero
 */
const obtenerPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) {
      return res.status(404).json({ message: 'Paciente no encontrado.' });
    }
    return res.json(paciente);
  } catch (error) {
    console.error('Error obtenerPaciente:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

module.exports = { listarPacientes, obtenerPaciente };