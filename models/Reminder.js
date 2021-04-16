'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reminder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.myAssociation = this.belongsTo(models.User, { foreignKey: "userId"})
      // define association here
    }
  };
  Reminder.init({
      settings: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      category: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      checked: {
          type: DataTypes.BOOLEAN,
          default: false
        },
      ReminderChainId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reminder',
  });
  return Reminder;
};