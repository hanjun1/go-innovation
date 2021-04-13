'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    displayName: DataTypes.STRING,
    avatar: DataTypes.STRING,
<<<<<<< HEAD
    email: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    googleId: {
        type: DataTypes.STRING,
        allowNull: false
    },
=======
    email: DataTypes.STRING,
    googleId: DataTypes.STRING,
>>>>>>> main
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};