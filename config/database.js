const { Sequelize } = require("sequelize");
/* to switch from development to test or production, mdify this require V */
const config = require('./config').development;

const sequelize = new Sequelize(config.database, config.username, config.password, config);

<<<<<<< HEAD
sequelize.authenticate()
    .then(() => console.log("Database connected..."))
    .catch(err =>  console.log("Error: " + err))

const UserModel = require("../models/UserModel");
const User = sequelize.define(
  "User",
  UserModel.Model,
  UserModel.Options,
);

//  HOW DO I MAKED MIGRATE??!!

/*  (async ()=>{
    User.sync({force: true});
})()  */

dbExport.sequelize = sequelize;
dbExport.Sequelize = Sequelize;

module.exports = dbExport;
=======
module.exports = sequelize;
>>>>>>> b0829a21011d4eb11e76982773f65764e8d7f048
