'use strict';

var expect = require('expect.js');

describe('models/index', function () {
  it('returns the draft model', function () {
    var models = require('../../models');
    expect(models.Draft).to.be.ok();
  });

  it('returns the game model', function () {
    var models = require('../../models');
    expect(models.Game).to.be.ok();
  });
});
