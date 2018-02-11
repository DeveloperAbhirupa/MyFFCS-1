const bcrypt = require("bcrypt");
const profileModel = require("./database/model").profileModel;
const salt = 10;



//Function to segregate data to lab/theory slots and morning/evening slots
module.exports.segregateData = function(data){

    var object = {
        theory:{ morning:[],evening:[] },
        lab:{ morning:[],evening:[]  },
        project:[]
    };

    data.forEach(function(element){


        //If venue is NIL then it specifies project component of the course
        if(element.VENUE === 'NIL'){
            object.project.push(element);
        }


        //If SLOT starts with L then its a lab slot
        else if(element.SLOT[0]==='L')
            {
                var n = element.SLOT.length;

                if( element.SLOT[n-2] === 'L' || element.SLOT[n-2] === '1' || element.SLOT[n-2] === '2' || (element.SLOT[n-2] === '3' && element.SLOT[n-1] === '0') )
                    object.lab.morning.push(element);

                //if L31 onwards then evening
                else
                    object.lab.evening.push(element);
            }

        //for theory slots
        else
            {
                //if last character of a theory class is '1' then its morning slot
                if( element.SLOT[ element.SLOT.length -1] === '1' )
                    object.theory.morning.push(element);
                else
                    object.theory.evening.push(element)
            }
    });

    //change this to return segregated_data
    return object;
}







//to generate a hash
module.exports.hashAndSave = function(obj){

    return new Promise(function(resolve,reject){

        bcrypt.hash(obj.passwd, salt, function(err, hash) {

            obj.passwd = hash;

            obj.save().then(function(){
                console.log("Save profile info");
                resolve("Saved");
            }).catch(function(err){
                reject(err);
            });

        });



    });



}
