// The controller of the project
// It is a kind of class that will have some methods or actions
// which uses the project entity
'use strict'

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
    }
};

module.exports = controller; // Export, to use it in other files