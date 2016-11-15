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
        type: Sequelize.INTEGER
      },
      second: {
        type: Sequelize.INTEGER
      },
      third: {
        type: Sequelize.INTEGER
      },
      fourth: {
        type: Sequelize.INTEGER
      },
      fifth: {
        type: Sequelize.INTEGER
      },
      sixth: {
        type: Sequelize.INTEGER
      },
      jolly: {
        type: Sequelize.INTEGER
      },
      star: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      GameId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Games',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Drafts');
  }
};
