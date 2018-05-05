require('dotenv').config();
const express = require('express');
const app = express();

app.set('database', process.env.DATABASE)

const pgp = require('pg-promise')({
});

const config = {
  host: 'localhost',
  port: 5432,
  database: 'gastackoverflow',
  // username: process.env.DATABASE_USER,
  // password: process.env.DATABASE_PASSWORD
};

const db = pgp(process.env.DATABASE_URL || config);

module.exports = config;
