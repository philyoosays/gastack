require('dotenv').config();
const express = require('express');
const app = express();

const pgp = require('pg-promise')({
});

const config = {
  host: process.env.DATABASE_URL,
  port: 5432,
  database: process.env.DATABASE,
};

module.exports = config;
