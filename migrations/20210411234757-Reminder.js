'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Reminder", [{
        title: "title",
        description: "this is a description",
        category: "Other",
        address: "711-2880 Nulla St. Mankato Mississippi 96522",
        repeat: false,
        recurrence: null,
        startDate: new Date(),
        endDate: new Date(),
        finalRepeat: null,
        privacy: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    }])
    
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("Reminder", null, {});
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
