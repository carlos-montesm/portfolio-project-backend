// The controller of the project
// It is a kind of class that will have some methods or actions
// which uses the project entity
'use strict'

var Project = require('../models/project'); // Import the project model
var fs = require('fs'); // Import fs module, to remove files, ..., etc, work with the file system
var path = require('path'); // Load physical paths from a file

var controller = {
    // req: user request, res: server response
    home: function(req, res){
        return res.status(200).send({ // Server response successful
            message: 'The home'
        });
    },
    // req: user request, res: server response
    test: function(req, res){
        return res.status(200).send({ // Server response successful
            message: 'Test method or action of the project controller'
        });
    },

    // API method to save a project type object in the database
    saveProject: function(req, res){ // req: user request, res: server response
        var project = new Project(); // Project model object

        var params = req.body; // The data comes in the body of the user's request

        // The project object has been assigned the values to its attributes
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        // With the Mongoose ORM the object is saved (save method) in 
        // the database, the project model uses Mongoose
        project.save().then((projectStored) => {
            return res.status(200).send({ // Server response successful, saved project
                project: projectStored
            });
        })

        // Error, the project was not saved
        .catch((error) => {
            if(!projectStored) return res.status(404).send({ // ProjectStored does not exist
                message: 'Failed to save project.' // Error message
            });

            if(error) return res.status(500).send({ // Failed to save
                message: 'Error saving document.' // Error message
            });
        });
    },

    // API method that returns a document from the database
    getProject: function(req, res){ // req: user request, res: server response
        
        // We take the id value that comes to us from the URL, 
        // to know which project to find
        var projectId = req.params.id;

        // If the route does not have the ID, /project/:id?, id? optional
        if(projectId == null) return res.status(404).send({message: 'The project does not exist.'});

        // Mongoose function (findById), find an object in the database whose ID is passed by parameter
        Project.findById(projectId)
        .then((project) => {

            if(!project) { // project does not exist, it returns an error
                return res.status(404).send({
                    message: 'The project does not exist.'
                });
            }

            return res.status(200).send({ // Server response successful, it returns a project
                project
            });
        })

        // Error
        .catch((error) => {
            return res.status(500).send({
                message: 'Error returning data'
            });
        });
    },

    // API method that returns all projects in the database
    getProjects: function(req, res) { // req: user request, res: server response

        // Mongoose function (find), find all projects in the database
        Project.find().then((projects) => {

            if(!projects) { // projects do not exist, it returns an error
                return res.status(404).send({
                    message: 'The project does not exist.'
                });
            }

            return res.status(200).send({ // Server response successful, returns all projects
                projects
            });
        })

        .catch((error) => {
            return res.status(500).send({
                message: 'Error returning data.'
            });
        });
    },

    // API method that updates a document/project from the database
    updateProject: function(req, res) { // req: user request, res: server response

        // We take the id value that comes to us from the URL, 
        // to know which project to update
        var projectId = req.params.id;

        // The information to update that comes from the request body
        var update = req.body;

        // Mongoose function (findByIdAndUpdate), The id is passed by parameter, 
        // and the object to update the database document with the object 
        // that has been passed to it. This parameter {new:true}, 
        // it is so that it returns the updated project, and not the old one.
        Project.findByIdAndUpdate(projectId, update, {new:true}).then((projectUpdated) => {

            if(!projectUpdated) { // project to update do not exist, it returns an error
                return res.status(404).send({
                    message: 'The project to update does not exist.'
                });
            }

            return res.status(200).send({ // Server response successful, updates a project
                project: projectUpdated
            });
        })

        .catch((error) => {
            return res.status(500).send({
                message: 'Failed to update.'
            });
        });
    },

    // API method that remove a document from the database
    deleteProject: function(req, res) { // req: user request, res: server response
        
        // We take the id value that comes to us from the URL, 
        // to know which project to remove
        var projectId = req.params.id;

        // Mongoose function (findByIdAndRemove), remove an object in the database whose ID is passed by parameter
        Project.findByIdAndRemove(projectId).then((projectRemoved) => {

            if(!projectRemoved) { // project to delete do not exist, it returns an error
                return res.status(404).send({
                    message: 'Failed to delete project.'
                });
            }

            return res.status(200).send({ // Server response successful, delete a project
                project: projectRemoved
            });
        })

        .catch((error) => {
            return res.status(500).send({
                message: 'The project could not be deleted.'
            });
        });
    },

    // API method that upload an image to the server, an image for each project
    // connect-multiparty module that allows us to upload files to the server
    uploadImage: function(req, res) { // req: user request, res: server response
        
        // We take the id value that comes to us from the URL, 
        // to know which project to upload an image
        var projectId = req.params.id;
        var fileName = 'Image not uploaded...'; // Image file name

        if(req.files){

            // Get the name of the image from the path where the image was on disk
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\'); // Separate the path by \\
            var fileName = fileSplit[1]; // Image file name
            var extSplit = fileName.split('\.'); // Separates the name and the extension of the image
            var fileExt = extSplit[1]; // The extension of the image

            // Save images with valid extensions
            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

                // Method that updates the project, to add the name of the image
                // {new: true}: Returns the last object saved in the database, not the previous one
                Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}).then((projectUpdated) => {
                    
                    if(!projectUpdated) { // project to update do not exist, it returns an error
                        return res.status(404).send({
                            message: 'The project does not exist and the image has not been assigned.'
                        });
                    }

                    return res.status(200).send({ // Server response successful, updates a project
                        project: projectUpdated
                    });
                })

                .catch((error) => {
                    return res.status(500).send({
                        message: 'The image has not been uploaded.'
                    });
                });

            }else{ // Remove file with fs module
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'The extension is invalid'});
                });
            }
  
        }else{ // Image not uploaded
            return res.status(200).send({
                message: fileName
            });
        }
    },

    // Method for the backend to return an image
    getImageFile: function(req, res){
        
        // We take the image value that comes to us from the URL, It is the image name
        var file = req.params.image;
        var path_file = './uploads/'+file; // Image's route/path
        
        fs.exists(path_file, (exists) => {
            if(exists){ // If the file path exists
                return res.sendFile(path.resolve(path_file)); // Return an image
            }else{
                return res.status(200).send({
                    message: "The image does not exist..." // Error message
                });
            }
        });
    }

};

module.exports = controller; // Export, to use it in other files