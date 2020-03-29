const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use(routes);

app.use(errors());

module.exports = app;
