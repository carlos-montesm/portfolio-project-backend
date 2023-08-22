// Route configuration file for the project controller
'use strict'

var express = require('express'); // Load the express module
var ProjectController = require('../controllers/project'); // Load the controller project

var router = express.Router(); // Load the Router object, to use get, post, ...

// Import connect-multiparty module to upload files to the server
var multipart = require('connect-multiparty');

// Middleware,   The files are saved in the './' directory
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', ProjectController.home); // Route /home
router.post('/test', ProjectController.test); // Route /test

// Added save-project route to save a project with post method
router.post('/save-project', ProjectController.saveProject);

// Added project route that returns a document from the database, with get method
router.get('/project/:id?', ProjectController.getProject); // id? optional

// Added projects route that returns all projects in the database, with get method
router.get('/projects', ProjectController.getProjects);

// Added project/:id route that updates a document/project from the database, with put method
router.put('/project/:id', ProjectController.updateProject);

// Added project/:id route that delete a project from the database, with delete method
router.delete('/project/:id', ProjectController.deleteProject);

// Added upload-image/:id route that upload an image to the server, with post method, and multipartMiddleware
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);

module.exports = router; // Export, to use it in other files