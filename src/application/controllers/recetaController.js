'use strict';

const RecetaService = require('../../domain/services/RecetaService');

// POST /api/v1/recetas
const crearReceta = async (req, res) => {
  try {
    const { historiaClinicaId, medicoId, medicamento, dosis, indicaciones } = req.body;
    if (!historiaClinicaId || !medicoId || !medicamento) {
      return res.status(400).json({ message: 'historiaClinicaId, medicoId y medicamento son obligatorios.' });
    }
    const receta = await RecetaService.crearReceta(historiaClinicaId, medicoId, medicamento, dosis, indicaciones);
    return res.status(201).json(receta);
  } catch (error) {
    const esReglaNegocio = error.message.startsWith('RN');
    return res.status(esReglaNegocio ? 409 : 500).json({ message: error.message });
  }
};

// GET /api/v1/recetas/historia/:historiaClinicaId
const recetasPorHistoria = async (req, res) => {
  try {
    const recetas = await RecetaService.recetasPorHistoria(req.params.historiaClinicaId);
    return res.json(recetas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { crearReceta, recetasPorHistoria };