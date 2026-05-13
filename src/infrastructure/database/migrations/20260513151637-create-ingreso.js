'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ingresos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaIngreso: {
        type: Sequelize.DATE
      },
      motivoIngreso: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      PacienteId: {
        type: Sequelize.INTEGER
      },
      CamaId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ingresos');
  }
};