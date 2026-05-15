'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingreso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ingreso.belongsTo(models.Paciente);
      Ingreso.belongsTo(models.Cama);
      Ingreso.hasOne(models.Alta);
      // define association here
    }
  }
  Ingreso.init({
    fechaIngreso: DataTypes.DATE,
    motivoIngreso: DataTypes.STRING,
    estado: DataTypes.STRING,
    PacienteId: DataTypes.INTEGER,
    CamaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ingreso',
  });
  return Ingreso;
};