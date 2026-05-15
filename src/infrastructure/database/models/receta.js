'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Receta.belongsTo(models.HistoriaClinica);
      Receta.belongsTo(models.Medico);
      // define association here
    }
  }
  Receta.init({
    medicamento: DataTypes.STRING,
    dosis: DataTypes.STRING,
    indicaciones: DataTypes.TEXT,
    HistoriaClinicaId: DataTypes.INTEGER,
    MedicoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Receta',
  });
  return Receta;
};