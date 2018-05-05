require('dotenv').config();

const pgp = require('pg-promise')({
  query: q => console.log(q.query),
});

const config = {
  host: process.env.DATABASE_URL,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE,
};

// const config = {
//   host: 'localhost',
//   port: 5432,
//   database: 'gastackoverflow'
// }

module.exports = config;
