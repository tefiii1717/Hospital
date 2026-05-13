'use strict';
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Pacientes', [
      { nombre: 'Carlos', apellido: 'Perez', cedula: '12345678',
        fechaNacimiento: '1985-03-15', telefono: '3001234567',
        email: 'carlos@email.com', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Maria', apellido: 'Lopez', cedula: '87654321',
        fechaNacimiento: '1990-07-22', telefono: '3109876543',
        email: 'maria@email.com', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Pacientes', null, {});
  }
};
