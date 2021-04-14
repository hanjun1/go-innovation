'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.addColumn("Reminders", "startDate", Sequelize.DATE)
        .then(_=> queryInterface.addColumn("Reminders", "endDate", Sequelize.DATE))
        .then(_=> queryInterface.addColumn("Reminders", "ThreadId", Sequelize.INTEGER))
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
