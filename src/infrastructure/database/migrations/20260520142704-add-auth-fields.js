'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Medicos', 'password', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Medicos', 'rol', {
      type: Sequelize.ENUM('Medico', 'Enfermero', 'Admin'),
      allowNull: true,
      defaultValue: 'Medico'
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('Medicos', 'password');
    await queryInterface.removeColumn('Medicos', 'rol');
  }
};