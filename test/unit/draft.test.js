'use strict';

var expect = require('expect.js');

describe('models/draft', function () {
  before(function () {
      return require('../../models').sequelize.sync();
  });

  beforeEach(function () {
    this.Game = require('../../models').Game;
    this.Draft = require('../../models').Draft;
  });

  describe('create', function () {
    it('creates a draft', function () {
      return this.Game.create({ username: 'johndoe' }).bind(this).then(function (user) {
        return this.Draft.create({ title: 'a title', GameId: user.id }).then(function (draft) {
          expect(draft.title).to.equal('a title');
        });
      });
    });
  });
});
