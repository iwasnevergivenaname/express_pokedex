'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'pokemons',
      'order',
      Sequelize.TEXT
    );

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('pokemons', 'order');

  }
};
