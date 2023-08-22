// Save all Express settings, of the requests, and body-parser

'use strict'

// Import express, body-parser
var express = require('express');
var bodyParser = require('body-parser');

var app = express(); // Run the express function

// Load route files
var project_routes = require('./routes/project');

// middlewares
app.use(bodyParser.urlencoded({extended:false}));

// The requests that arrive convert them into JSON format
app.use(bodyParser.json());

// Configurar cabeceras y CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Routes
// Overwrite the route so that it loads within the app
app.use('/api', project_routes);

// Export, to use it in other files
module.exports = app;