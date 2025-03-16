'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('movies', [
      {
        title: 'Interestelar',
        description: 'Exploradores viajam pelo espaço para salvar a humanidade.',
        genre: 'Ficção científica',
        release_year: 2014,
        url_image: 'http://localhost:3001/images/interestelar.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'O Poderoso Chefão',
        description: 'A história da família mafiosa Corleone e seu legado.',
        genre: 'Crime/Drama',
        release_year: 1972,
        url_image: 'http://localhost:3001/images/o_poderoso_chefao.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Matrix',
        description: 'Um hacker descobre a verdade sobre a realidade e luta contra as máquinas.',
        genre: 'Ficção científica',
        release_year: 1999,
        url_image: 'http://localhost:3001/images/matrix.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Clube da Luta',
        description: 'Um insatisfeito com a vida corporativa cria um clube secreto de lutas.',
        genre: 'Drama/Psicológico',
        release_year: 1999,
        url_image: 'http://localhost:3001/images/clube_da_luta.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Pulp Fiction',
        description: 'Histórias interligadas de criminosos em Los Angeles.',
        genre: 'Crime/Drama',
        release_year: 1994,
        url_image: 'http://localhost:3001/images/pulp_fiction.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('movies', null, {});
  },
};
