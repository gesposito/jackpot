'use strict';
module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('Game', {
    number: DataTypes.INTEGER,
    year  : DataTypes.INTEGER,
    date  : DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Game.hasOne(models.Draft)
      }
    }
  });
  return Game;
};
