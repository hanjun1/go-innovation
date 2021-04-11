const {DataTypes} = require('sequelize');

let UserModel = {
    // Model attributes are defined here
    firstName: {type: DataTypes.STRING},
    lastName: {type: DataTypes.STRING},
    displayName: {type: DataTypes.STRING},
    avatar: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING,
        allowNull: false},
    googleId: {type: DataTypes.STRING,
            allowNull: false},
  };
  
let UserModelOptions = {};
  
module.exports = {
    Model: UserModel,
    Options: UserModelOptions,
};