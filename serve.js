//https://stackoverflow.com/questions/16827987/expressjs-throw-er-unhandled-error-event
const express = require("express");

//session handler
var session = require("express-session");

//handler for post requests
const bodyparser = require('body-parser');

//for main routing functions
const main_router = require("./routes/route");

//slot saving router function
const saveslot_router = require("./routes/slot_saving");

//load database and save JSON data of courses in it
require("./database/load_in_db");

//set up a server
var app = express();

//for using urlencodedParser in post requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//set up a view engine
app.set("view engine","ejs");

//set up middleware for static files
app.use("/static",express.static("static"));

//set up a session (It uses cookies)
app.use(session({secret:"SecretCookieKey"}));

//call the main router
app.use(main_router);

//call slot router function
app.use("/timetable",saveslot_router);

//listen on specified port
const port = 3000;


app.listen(3000,function(){
    console.log("Listening on localhost: " + port.toString());
});
