'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('movies', [
      {
        title: 'Interestelar',
        description: 'Exploradores viajam pelo espaço para salvar a humanidade.',
        genre: 'Ficção científica',
        releaseYear: 2014,
        url_image: 'http://localhost:3001/images/interestelar.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'O Poderoso Chefão',
        description: 'A história da família mafiosa Corleone e seu legado.',
        genre: 'Crime/Drama',
        releaseYear: 1972,
        url_image: 'http://localhost:3001/images/o_poderoso_chefao.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Matrix',
        description: 'Um hacker descobre a verdade sobre a realidade e luta contra as máquinas.',
        genre: 'Ficção científica',
        releaseYear: 1999,
        url_image: 'http://localhost:3001/images/matrix.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Clube da Luta',
        description: 'Um insatisfeito com a vida corporativa cria um clube secreto de lutas.',
        genre: 'Drama/Psicológico',
        releaseYear: 1999,
        url_image: 'http://localhost:3001/images/clube_da_luta.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Pulp Fiction',
        description: 'Histórias interligadas de criminosos em Los Angeles.',
        genre: 'Crime/Drama',
        releaseYear: 1994,
        url_image: 'http://localhost:3001/images/pulp_fiction.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('movies', null, {});
  },
};
