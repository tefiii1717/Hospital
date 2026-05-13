'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Receta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      medicamento: {
        type: Sequelize.STRING
      },
      dosis: {
        type: Sequelize.STRING
      },
      indicaciones: {
        type: Sequelize.TEXT
      },
      HistoriaClinicaId: {
        type: Sequelize.INTEGER
      },
      MedicoId: {
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
    await queryInterface.dropTable('Receta');
  }
};