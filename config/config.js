require('dotenv').config();
const express = require('express');
const app = express();

const config = {
  host: 'localhost',
  port: 5432,
  database: 'gastackoverflow'
};

module.exports = config;
