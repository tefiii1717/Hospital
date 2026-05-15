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
      HistoriaClinica.belongsTo(models.Paciente);
      HistoriaClinica.hasMany(models.NotaMedica);
      HistoriaClinica.hasMany(models.Receta);
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
  HistoriaClinica.beforeDestroy(() => {
  throw new Error('RN3: La historia clínica no puede eliminarse.');
});
  return HistoriaClinica;
};