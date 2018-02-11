const fs = require("fs");
require("./connect");
var model = require("./model").courseModel;


//function to load the JSON into database
function load_json(){
    return new Promise(function(resolve,reject){

        fs.open(__dirname +'/all_data.json','r',function(error,file_descriptor){

                if(error) reject(error);

                var count = 0;

                fs.readFile(file_descriptor,'utf8',function(error,data){

                    if(error) throw error

                    var obj = JSON.parse(data);

                    obj.forEach(function(info){

                        var element = new model(info);
                        element.save().then(function(){
                            count++;
                            console.log("saved an entry" + count.toString());
                        });

                    });

                    resolve("Done loading JSON into mongodb");

                });
        });

    })
}






model.find({}).then(function(data){
    if(data.length === 0){
        load_json().then(function(result){
            console.log(result);
        });
    }

    else{
        console.log("Already loaded the data to database");
    }
});
