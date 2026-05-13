'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoriaClinica extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HistoriaClinica.init({
    fechaApertura: DataTypes.DATE,
    PacienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HistoriaClinica',
  });
  return HistoriaClinica;
};