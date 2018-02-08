const model = require("./database/model");



//Function to segregate data to lab/theory slots and morning/evening slots
function segregateData(data){

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







module.exports = function(app,urlencodedParser){

    app.get("/",function(req,res){
        res.render("index",{data:''});
    });






    app.post("/",urlencodedParser,function(req,res){

        console.log(req.body);


        model.find(req.body).then(function(data){

            var segregated_data = segregateData(data);

            res.send( JSON.stringify(segregated_data) );

        });





    });
}
