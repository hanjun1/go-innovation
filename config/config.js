require('dotenv').config();
const fs = require('fs')
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

module.exports={
  "development": {
    "username":db.user,
    "password": db.pass,
    "database": db.name,
    "host": db.host,
    "dialect": "postgres",
    "dialectOptions": {
        "ssl": db.ssl
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
