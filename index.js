// NodeJS configuration file, server creation, connection to the database
'use strict'

var mongoose = require('mongoose'); // Import mongoose

// Promise
mongoose.Promise = global.Promise;

// to connect to the database, the URL of the database is passed to it as a parameter
// MongoDB default port: 27017
mongoose.connect('mongodb://0.0.0.0:27017/portfolio')
        .then(() => {
            console.log("Database connection established successfully...");
        })
        .catch(err => console.log(err)); // Show the error