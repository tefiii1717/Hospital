'use strict';
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Camas', [
      { numero: '101', piso: 1, estado: 'disponible',
        createdAt: new Date(), updatedAt: new Date() },
      { numero: '102', piso: 1, estado: 'disponible',
        createdAt: new Date(), updatedAt: new Date() },
      { numero: '201', piso: 2, estado: 'disponible',
        createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Camas', null, {});
  }
};
