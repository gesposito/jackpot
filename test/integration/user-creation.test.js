'use strict';

const app      = require('../../app');
const Bluebird = require('bluebird');
const expect   = require('expect.js');
const request  = require('supertest');

describe('game creation page', function () {
  before(function () {
      return require('../../models').sequelize.sync();
  });

  beforeEach(function () {
    this.models = require('../../models');

    return Bluebird.all([
      this.models.Draft.destroy({ truncate: true }),
      this.models.Game.destroy({ truncate: true })
    ]);
  });

  it('loads correctly', function (done) {
    request(app).get('/').expect(200, done);
  });

  it('lists a game if there is one', function (done) {
    this.models.Game.create({ gamename: 'johndoe' }).then(function () {
      request(app).get('/').expect(/johndoe/, done);
    })
  });

  it('lists the tickets for the game if available', function (done) {
    this.models.Game.create({ gamename: 'johndoe' }).bind(this).then(function (game) {
      return this.models.Draft.create({ title: 'johndoe draft', GameId: game.id });
    }).then(function () {
      request(app).get('/').expect(/johndoe draft/, done);
    });
  });
});
