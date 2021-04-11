const fs = require('fs');
const Sequelize = require('sequelize');
console.log(process.env.DB_HOST)
const host = process.env.DB_HOST

const db = {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    host: process.env.DB_HOST, 
    ssl: {
      rejectUnauthorized: false,
    //server cert
      ca: fs.readFileSync('config/pem/server-ca.pem').toString(),
    //client key
      key: fs.readFileSync('config/pem/client-key.pem').toString(),
    //client cert
      cert: fs.readFileSync('config/pem/client-cert.pem').toString(),
    },
  }
const sequelize = new Sequelize(db.name, db.user, db.pass, 
    {
        host: db.host,
        dialect: 'postgres',
        dialectOptions: {
            ssl: db.ssl
        }
    });

(async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
)().catch(err =>{
    console.log(err);
});
  
