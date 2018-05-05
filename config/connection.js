require('dotenv').config();
const express = require('express');
const app = express();
const config = require('./config')

const pgp = require('pg-promise')({
});

const db = pgp(process.env.DATABASE_URL || config);
// const db = pgp(config);


module.exports = db;
