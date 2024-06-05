const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./utils/errorHandler');
const logger = require('./utils/logger');
const removeHeaders = require('./utils/removeHeaders');
require('dotenv').config();

// Esta es nuestra aplicación
const app = express();

app.set('etag', false);
// Middlewares 
app.use(express.json());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

app.use(cors());
app.use(logger)
app.use(removeHeaders);
app.use(router);
app.get('/', (req, res) => {
    return res.send("Welcome to express!");
})

// middlewares después de las rutas
app.use(errorHandler)

module.exports = app;
