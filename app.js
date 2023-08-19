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

// CORS

// Routes
// Overwrite the route so that it loads within the app
app.use('/api', project_routes);

// Export, to use it in other files
module.exports = app;