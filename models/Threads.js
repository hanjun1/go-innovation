'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.myAssociation = this.hasOne(models.User, { foreignKey: "user1"})
        this.myAssociation = this.hasOne(models.User, { foreignKey: "user2"})
      // define association here
    }
  };
  Thread.init({
    user1: DataTypes.INTEGER,
    user2: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Threads',
  });
  return Thread;
};