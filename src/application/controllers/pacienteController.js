'use strict';

const { Paciente } = require('../../infrastructure/database/models/index.js');

const listarPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll({
      attributes: ['id', 'nombre', 'apellido', 'cedula', 'telefono', 'email', 'fechaNacimiento'],
    });
    return res.json(pacientes);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

const obtenerPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).json({ message: 'Paciente no encontrado.' });
    return res.json(paciente);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

const crearPaciente = async (req, res) => {
  try {
    const { nombre, apellido, cedula, telefono, email, fechaNacimiento } = req.body;
    if (!nombre || !apellido || !cedula) {
      return res.status(400).json({ message: 'nombre, apellido y cedula son obligatorios.' });
    }
    const paciente = await Paciente.create({ nombre, apellido, cedula, telefono, email, fechaNacimiento });
    return res.status(201).json(paciente);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

const eliminarPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).json({ message: 'Paciente no encontrado.' });
    await paciente.destroy();
    return res.json({ message: 'Paciente eliminado correctamente.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

module.exports = { listarPacientes, obtenerPaciente, crearPaciente, eliminarPaciente };