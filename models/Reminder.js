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
        // this.myAssociation = this.hasOne(models.Threads, { foreignKey: ""})
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
      private: {
          type: DataTypes.BOOLEAN,
          default: false
      },
      checked: {
          type: DataTypes.BOOLEAN,
          default: false
        },
      ReminderChainId: {
          type: DataTypes.INTEGER,
          unique: true,
      } 
    }, {
    sequelize,
    modelName: 'Reminder',
  });
  return Reminder;
};