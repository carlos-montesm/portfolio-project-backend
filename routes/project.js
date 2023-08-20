// Route configuration file for the project controller
'use strict'

var express = require('express'); // Load the express module
var ProjectController = require('../controllers/project'); // Load the controller project

var router = express.Router(); // Load the Router object, to use get, post, ...

router.get('/home', ProjectController.home); // Route /home
router.post('/test', ProjectController.test); // Route /test

// Added save-project route to save a project with post method
router.post('/save-project', ProjectController.saveProject);

// Added project route that returns a document from the database, with get method
router.get('/project/:id?', ProjectController.getProject); // id? optional

module.exports = router; // Export, to use it in other files