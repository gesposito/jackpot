'use strict';

const Promise   = require('bluebird');
const fs        = require('fs');
const readFile  = Promise.promisify(fs.readFile);
const find      = require('lodash').find;
const models    = require('../models');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Drafts', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return Promise.all([
      readFile(
        './data/games.json', 'utf8'
      ),
      models.Game.findAll({
      })
    ])
    .then((result) => {
      const drafts    = [];
      const games     = {};

      const data      = result[0];
      const instances = result[1];

      instances.map(
        (result) => {
          const game    = result.get();
          games[game.year] = games[game.year] || {};
          games[game.year][game.number] = game.id;
        }
      )

      JSON.parse(
        data
      )
      .map((result) => {
        const game    = result.concorso;
        const numbers = result.combinazioneVincente;

        if (numbers) drafts.push({
          'GameId'    : games[game.anno][game.numero],
          'first'     : numbers.estratti[0],
          'second'    : numbers.estratti[1],
          'third'     : numbers.estratti[2],
          'fourth'    : numbers.estratti[3],
          'fifth'     : numbers.estratti[4],
          'sixth'     : numbers.estratti[5],
          'jolly'     : numbers.numeroJolly,
          'star'      : numbers.superstar,
          'createdAt' : new Date(),
          'updatedAt' : new Date(),
        });
      })

      return drafts;
    })
    .then(
      (drafts) => queryInterface.bulkInsert('Drafts', drafts, {})
    );

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Drafts', null, {});
    */

    return queryInterface.bulkDelete('Drafts', null, {});
  }
};
