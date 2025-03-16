'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    const hashedPassword = await bcrypt.hash('Admin@123', 10); // Senha segura

    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin User',
        username: 'admin',
        email: 'admin@nanoflix.com',
        password: hashedPassword,
        role: 'admin', // Definição do papel
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', { email: 'admin@nanoflix.com' }, {});
  }
};
