'use strict';
module.exports = function(sequelize, DataTypes) {
  var Draft = sequelize.define('Draft', {
    first : DataTypes.INTEGER,
    second: DataTypes.INTEGER,
    third : DataTypes.INTEGER,
    fourth: DataTypes.INTEGER,
    fifth : DataTypes.INTEGER,
    sixth : DataTypes.INTEGER,
    jolly : DataTypes.INTEGER,
    star  : DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Draft.belongsTo(models.Game, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Draft;
};
