const {Client} = require ('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.DB_HOST,
  user: 'postgres',
  port: process.env.DB_PORT,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

client.connect()
  .then(() => {
    console.log(`Connected to ${process.env.DB_NAME}`)
  })
  .catch(err => {
    console.log(`Error connecting to ${process.env.DB_NAME}`, err)
  });

module.exports = client;
