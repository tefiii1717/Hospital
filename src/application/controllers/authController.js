'use strict';

const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// Modelo de Persona 1 — descomenta cuando Persona 1 esté integrada
// const { Medico } = require('../../infrastructure/database/models');

const privateKey = process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'email y password son obligatorios.' });
  }

  try {
    // ── PASO 1: Buscar usuario real en BD ────────────────────────────────────
    // Descomenta esto cuando Persona 1 esté lista y borra el bloque mock:
    //
    // const medico = await Medico.findOne({ where: { email } });
    // if (!medico) return res.status(401).json({ message: 'Credenciales inválidas.' });
    //
    // const passwordValido = await bcrypt.compare(password, medico.passwordHash);
    // if (!passwordValido) return res.status(401).json({ message: 'Credenciales inválidas.' });
    //
    // const payload = { id: medico.id, nombre: medico.nombre, rol: medico.rol };

    // ── MOCK temporal (borra esto cuando integres BD) ─────────────────────────
    const usuarios = [
      { id: 1, nombre: 'Admin Principal', email: 'admin@hospital.com', password: '123456', rol: 'Admin' },
      { id: 2, nombre: 'Dr. García',      email: 'medico@hospital.com', password: '123456', rol: 'Medico' },
      { id: 3, nombre: 'Enf. Rodríguez',  email: 'enfermero@hospital.com', password: '123456', rol: 'Enfermero' },
    ];
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    if (!usuario) return res.status(401).json({ message: 'Credenciales inválidas.' });
    const payload = { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol };
    // ── FIN MOCK ──────────────────────────────────────────────────────────────

    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '8h' });

    return res.json({
      token,
      usuario: { id: payload.id, nombre: payload.nombre, rol: payload.rol },
    });
  } catch (error) {
    console.error('Error en login:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

module.exports = { login };