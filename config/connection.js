require('dotenv').config();
const express = require('express');
const app = express();

app.set('database', process.env.DATABASE_URL)

const pgp = require('pg-promise')({
  query: q => console.log(q.query),
});

const config = {
  host: 'localhost',
  port: 5432,
  database: app.get('database')
};

const db = pgp(process.env.DATABASE_URL || config);

module.exports = db;
