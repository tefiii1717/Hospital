'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cita extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cita.belongsTo(models.Paciente);
      Cita.belongsTo(models.Medico);
      // define association here
    }
  }
  Cita.init({
    fechaHora: DataTypes.DATE,
    estado: DataTypes.STRING,
    PacienteId: DataTypes.INTEGER,
    MedicoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cita',
  });
  return Cita;
};