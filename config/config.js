require('dotenv').config();
const express = require('express');
const app = express();

app.set('database', process.env.DATABASE)

const pgp = require('pg-promise')({
});

const config = {
  host: process.env.DATABASE_URL,
  port: 5432,
  database: process.env.DATABASE,
  // username: process.env.DATABASE_USER,
  // password: process.env.DATABASE_PASSWORD
};

module.exports = config;
