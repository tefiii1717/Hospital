'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Alta.belongsTo(models.Ingreso);
      Alta.belongsTo(models.Medico);
      // define association here
    }
  }
  Alta.init({
    fechaAlta: DataTypes.DATE,
    motivoAlta: DataTypes.STRING,
    epicrisis: DataTypes.TEXT,
    IngresoId: DataTypes.INTEGER,
    MedicoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Alta',
  });
  return Alta;
};