'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Alta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaAlta: {
        type: Sequelize.DATE
      },
      motivoAlta: {
        type: Sequelize.STRING
      },
      epicrisis: {
        type: Sequelize.TEXT
      },
      IngresoId: {
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
    await queryInterface.dropTable('Alta');
  }
};