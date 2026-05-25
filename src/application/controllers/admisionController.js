'use strict';

const AdmisionService = require('../../domain/services/AdmisionService');

const registrarIngreso = async (req, res) => {
  try {
    const { pacienteId, motivoIngreso, diasHospitalizacion } = req.body;
    if (!pacienteId || !diasHospitalizacion) {
      return res.status(400).json({ message: 'pacienteId y diasHospitalizacion son obligatorios.' });
    }
    const ingreso = await AdmisionService.admitirPaciente(pacienteId, motivoIngreso, diasHospitalizacion);
    return res.status(201).json(ingreso);
  } catch (error) {
    const esReglaNegocio = error.message.startsWith('RN');
    return res.status(esReglaNegocio ? 409 : 500).json({ message: error.message });
  }
};

module.exports = { registrarIngreso };