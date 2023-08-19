// Route configuration file for the project controller
'use strict'

var express = require('express'); // Load the express module
var ProjectController = require('../controllers/project'); // Load the controller project

var router = express.Router(); // Load the Router object, to use get, post, ...

router.get('/home', ProjectController.home); // Route /home
router.post('/test', ProjectController.test); // Route /test

module.exports = router; // Export, to use it in other files