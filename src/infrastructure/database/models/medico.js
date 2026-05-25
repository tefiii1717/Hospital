'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Medico extends Model {
    static associate(models) {
      Medico.hasMany(models.Cita);
      Medico.hasMany(models.NotaMedica);
      Medico.hasMany(models.Receta);
      Medico.hasMany(models.Alta);
    }
  }
  Medico.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    especialidad: DataTypes.STRING,
    cedula: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rol: DataTypes.ENUM('Medico', 'Enfermero', 'Admin')
  }, {
    sequelize,
    modelName: 'Medico',
  });
  return Medico;
};