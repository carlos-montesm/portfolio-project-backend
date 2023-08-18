'use strict'

// Import mongoose, with mongoose the model is created
var mongoose = require('mongoose');

// Define a model schema, and load the schema object
var Schema = mongoose.Schema;

// The Project schema is created, with the Schema object
// new documents are created in the database
var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: [String]
});

// Export module, to be able to use it in other files with the import statement
// The Project schema is used as a model
module.exports = mongoose.model('Project', ProjectSchema);