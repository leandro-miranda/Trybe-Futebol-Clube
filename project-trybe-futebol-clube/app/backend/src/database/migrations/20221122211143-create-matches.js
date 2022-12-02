'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeTeam: {
        allowNull: false,
        foreignKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'teams',
          key: 'id',
        },
        field: 'home_team',
        type: Sequelize.INTEGER,
      },
      homeTeamGoals: {
        allowNull: false,
        field: 'home_team_goals',
        type: Sequelize.INTEGER,
      },
      awayTeam: {
        allowNull: false,
        foreignKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'teams',
          key: 'id',
        },
        field: 'away_team',
        type: Sequelize.INTEGER,
      },
      awayTeamGoals: {
        allowNull: false,
        field: 'away_team_goals',
        type: Sequelize.INTEGER,
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        field: 'in_progress',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
