'use strict';

const Promise   = require('bluebird');
const fs        = require('fs');
const readFile  = Promise.promisify(fs.readFile);
const sortBy    = require('lodash').sortBy;

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Games', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return readFile(
      './data/games.json', 'utf8'
    )
    .then((result) => {
      const games = [];

      sortBy(
        JSON.parse(result), ['concorso.anno']
      )
      .map((result) => {
        const game = result.concorso;
        games.push({
          'number'    : game.numero,
          'year'      : game.anno,
          'date'      : new Date(result.dataEstrazione),
          'createdAt' : new Date(),
          'updatedAt' : new Date(),
        })
      });

      return games;
    })
    .then(
      (games) => queryInterface.bulkInsert('Games', games, {})
    );
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Games', null, {});
    */

    return queryInterface.bulkDelete('Games', null, {});
  }
};
