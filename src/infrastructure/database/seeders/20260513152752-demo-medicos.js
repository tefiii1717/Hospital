'use strict';
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Medicos', [
      { nombre: 'Ana', apellido: 'Garcia', especialidad: 'Cardiologia',
        cedula: '11111111', email: 'ana@hospital.com',
        createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Luis', apellido: 'Martinez', especialidad: 'Pediatria',
        cedula: '22222222', email: 'luis@hospital.com',
        createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Medicos', null, {});
  }
};
