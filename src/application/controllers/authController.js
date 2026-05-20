'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Medico } = require('../../infrastructure/database/models');

const privateKey = process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'email y password son obligatorios.' });
  }

  try {
    const medico = await Medico.findOne({ where: { email } });
    if (!medico) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const passwordValido = await bcrypt.compare(password, medico.dataValues.password);
    if (!passwordValido) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const payload = { id: medico.id, nombre: medico.nombre, rol: medico.rol };
    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '8h' });

    return res.json({
      token,
      usuario: { id: medico.id, nombre: medico.nombre, rol: medico.rol }
    });

  } catch (error) {
    console.error('Error en login:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

module.exports = { login };