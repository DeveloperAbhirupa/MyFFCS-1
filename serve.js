const express = require("express");

//handler for post requests
const bodyparser = require('body-parser');

//for routing functions
const route = require("./route");

//load database and save JSON data of courses in it
require("./database/load_in_db");

//set up a server
var app = express();

//set up a view engine
app.set("view engine","ejs");

//set up middleware for static files
app.use("/static",express.static("static"));

//set up body parser for handling post requests
var urlencodedParser = bodyparser.urlencoded({extended:false});

//call the routing function
route(app,urlencodedParser);

//listen on specified port
const port = 3000;

console.log("Listening on localhost: " + port.toString());

app.listen(3000);
