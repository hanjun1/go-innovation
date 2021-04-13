const { DataTypes } = require('sequelize');
const db = require("../config/database");

const Reminder = db.sequelize.define("Reminder", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
    },
    repeat: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
    },
    recurrence: {
        type: DataTypes.STRING,
    },
    startDate: {
        type: DataTypes.DATE,
    },
    endDate: {
        type: DataTypes.DATE,
    },
    finalRepeat: {
        type: DataTypes.DATE,
    },
    privacy: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false
    }
}, {

})
  // Other model options go here
module.exports = Reminder