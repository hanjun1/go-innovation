'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // this.myAssociation = this.belongsTo(models.Thread, { foreignKey: "threadId"})
        // this.myAssociation = this.hasMany(models.Message)
      // define association here
    }
  };
  Message.init({
    threadId: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    sender: DataTypes.INTEGER,
    receiver: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};