// The controller of the project
// It is a kind of class that will have some methods or actions
// which uses the project entity
'use strict'

var Project = require('../models/project'); // Import the project model

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
    }
};

module.exports = controller; // Export, to use it in other files