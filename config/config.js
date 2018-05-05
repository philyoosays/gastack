require('dotenv').config();
const express = require('express');
const app = express();

const config = {
  host: 'ip-172-26-3-124',
  port: 5432,
  database: 'gastackoverflow',
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD
};

module.exports = config;
