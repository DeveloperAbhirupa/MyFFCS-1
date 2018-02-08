const mongoose = require("mongoose");

//create a schema for courses
var schema = new mongoose.Schema({
    FACULTY:String,
    TYPE:String,
    CREDITS:String,
    SLOT:String,
    CODE:String,
    TITLE:String,
    VENUE:String
});

//create a model based on the schema
var model = mongoose.model('course',schema);

//export the model
module.exports = model;
