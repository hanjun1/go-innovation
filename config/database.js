const { Sequelize } = require("sequelize");
/* to switch from development to test or production, mdify this require V */
const config = require('./config').development;

const sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = sequelize;
