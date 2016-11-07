'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Drafts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first: {
        type: Sequelize.INT
      },
      second: {
        type: Sequelize.INT
      },
      third: {
        type: Sequelize.INT
      },
      fourth: {
        type: Sequelize.INT
      },
      fifth: {
        type: Sequelize.INT
      },
      sixth: {
        type: Sequelize.INT
      },
      jolly: {
        type: Sequelize.INT
      },
      star: {
        type: Sequelize.INT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Drafts');
  }
};