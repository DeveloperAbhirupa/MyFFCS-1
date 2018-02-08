const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/ffcs");

mongoose.connection.once("open",function(){
    console.log("connected to database");
}).on("error",function(error){
    console.log("error");
});
