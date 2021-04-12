const fs = require("fs");
const { Sequelize, DataTypes } = require("sequelize");
const dbExport = {};
const db = {
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  host: process.env.DB_HOST,
  ssl: {
    rejectUnauthorized: false,
    //server cert
    ca: fs.readFileSync("config/pem/server-ca.pem").toString(),
    //client key
    key: fs.readFileSync("config/pem/client-key.pem").toString(),
    //client cert
    cert: fs.readFileSync("config/pem/client-cert.pem").toString(),
  },
};

const sequelize = new Sequelize(db.name, db.user, db.pass, {
  host: db.host,
  dialect: "postgres",
  dialectOptions: {
    ssl: db.ssl,
  },
});


module.exports = sequelize;
