// Save all Express settings, of the requests, and body-parser

'use strict'

// Import express, body-parser
var express = require('express');
var bodyParser = require('body-parser');

var app = express(); // Run the express function

// Load route files

// middlewares
app.use(bodyParser.urlencoded({extended:false}));

// The requests that arrive convert them into JSON format
app.use(bodyParser.json());

// CORS

// Routes
// Test routes
app.get('/', (req, res) => { // Http get method
    res.status(200).send( // Server response successful
        "<h1>Homepage</h1>"
    );
});

app.post('/test/:id', (req, res) => { // Http post method
    console.log(req.body.name);
    console.log(req.query.web);
    console.log(req.params.id);

    res.status(200).send({ // Server response successful
        message: "Hello World from my NodeJS API"
    });
});

// Export
module.exports = app;