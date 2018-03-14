const mongoose = require('mongoose');
const secret = require("../secret");

mongoose.connect(secret.mongoURL);

mongoose.connection.once("open",function(){
    console.log("connected to database");
}).on("error",function(error){
    console.log("error");
});
