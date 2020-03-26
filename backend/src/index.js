const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use(routes);

// listen
app.listen(3333);
