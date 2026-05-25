'use strict';

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const { login } = require('../controllers/authController');
const { listarPacientes, obtenerPaciente, crearPaciente, eliminarPaciente } = require('../controllers/pacienteController');
const { agendarCita, citasPorMedico, citasPorPaciente, cancelarCita } = require('../controllers/citaController');
const { crearHistoria, consultarHistoriaPorPaciente, anadirNota } = require('../controllers/historiaClinicaController');
const { registrarIngreso } = require('../controllers/admisionController');
const { registrarAlta } = require('../controllers/altaController');
const { crearReceta, recetasPorHistoria, eliminarReceta } = require('../controllers/recetaController');

// ─── AUTH ─────────────────────────────────────────────────────────────────────
router.post('/auth/login', login);

// ─── PACIENTES ────────────────────────────────────────────────────────────────
router.get('/pacientes',      authMiddleware(['Medico', 'Admin', 'Enfermero']), listarPacientes);
router.get('/pacientes/:id',  authMiddleware(['Medico', 'Admin', 'Enfermero']), obtenerPaciente);
router.post('/pacientes',     authMiddleware(['Medico', 'Admin']),              crearPaciente);
router.delete('/pacientes/:id', authMiddleware(['Medico', 'Admin']), eliminarPaciente);

// ─── HISTORIAS CLÍNICAS ───────────────────────────────────────────────────────
router.post('/historias',                       authMiddleware(['Medico', 'Admin']), crearHistoria);
router.get('/historias/paciente/:pacienteId',   authMiddleware(['Medico', 'Admin']), consultarHistoriaPorPaciente);
router.post('/historias/:id/notas',             authMiddleware(['Medico']),          anadirNota);

// ─── CITAS ────────────────────────────────────────────────────────────────────
router.post('/citas',                     authMiddleware(['Medico', 'Admin']),              agendarCita);
router.get('/citas/medico/:medicoId',     authMiddleware(['Medico', 'Admin', 'Enfermero']), citasPorMedico);
router.get('/citas/paciente/:pacienteId', authMiddleware(['Medico', 'Admin', 'Enfermero']), citasPorPaciente);
router.put('/citas/:id/cancelar',         authMiddleware(['Medico', 'Admin']),              cancelarCita);

// ─── ADMISIONES ───────────────────────────────────────────────────────────────
router.post('/admisiones', authMiddleware(['Medico', 'Admin', 'Enfermero']), registrarIngreso);

// ─── ALTAS ────────────────────────────────────────────────────────────────────
router.post('/altas', authMiddleware(['Medico', 'Admin']), registrarAlta);

// ─── RECETAS ──────────────────────────────────────────────────────────────────
router.post('/recetas',                             authMiddleware(['Medico']),                        crearReceta);
router.get('/recetas/historia/:historiaClinicaId',  authMiddleware(['Medico', 'Admin', 'Enfermero']), recetasPorHistoria);
router.delete('/recetas/:id',                       authMiddleware(['Medico', 'Admin']),               eliminarReceta);

module.exports = router;