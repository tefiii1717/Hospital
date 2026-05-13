'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NotaMedica extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NotaMedica.init({
    contenido: DataTypes.TEXT,
    fecha: DataTypes.DATE,
    MedicoId: DataTypes.INTEGER,
    HistoriaClinicaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NotaMedica',
  });
  return NotaMedica;
};