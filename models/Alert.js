'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Alert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
        this.myAssociation = this.belongsTo(models.Reminder, { foreignKey: "reminderId"})
        this.myAssociation = this.belongsTo(models.User, { foreignKey: "senderId"})
        this.myAssociation = this.belongsTo(models.User, { foreignKey: "userId"})
    }

  };
  Alert.init({
    reminderId: DataTypes.STRING,
    senderId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Alert',
  });
  return Alert;
};