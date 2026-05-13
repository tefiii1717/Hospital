'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cama extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cama.init({
    numero: DataTypes.STRING,
    piso: DataTypes.INTEGER,
    estado: {
      type: DataTypes.ENUM('disponible', 'ocupada', 'mantenimiento'),
      allowNull: false,
      defaultValue: 'disponible'
    }
  }, {
    sequelize,
    modelName: 'Cama',
  });
  return Cama;
};