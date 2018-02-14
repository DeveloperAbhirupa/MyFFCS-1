const model = require("../database/model").courseModel;
const profileModel = require("../database/model").profileModel;

//to segreagate data into morning and evening theory and lab slots
const segregateData = require("../helpers").segregateData;

//hash function for storing passwords
const hashAndSave = require("../helpers").hashAndSave;

//to check hashed password
const bcrypt = require("bcrypt");

//set up router
const router = require("express").Router();





router.get('/',function(req,res){
    res.render('index');
});




router.post('/',function(req,res){

    //if posted registration form
    if(req.body.confirm !== undefined){

        var obj =  { email:req.body.email,passwd:req.body.passwd };

        profileModel.findOne( {email:req.body.email} ).then(function(data){

            if(data === null  ){

                obj = new profileModel( { email:req.body.email,passwd:req.body.passwd,courses:[] } );

                hashAndSave(obj).then(function(){
                    //save user email in cookies
                    req.session.email = req.body.email;
                    res.redirect('/timetable');
                });

            }

            else{
                res.send("Someone with this email already exists");
            }

        });

    }

    //if trying to log in
    else{

        profileModel.findOne( {email:req.body.email} ).then(function(data){

            if(data === null)
                res.send("User not found");

            else{


                //check hash against password
                bcrypt.compare(req.body.passwd,data.passwd,function(err,result){


                      if(result){
                          //save user email in cookies
                          req.session.email = req.body.email;
                          res.redirect('/timetable');
                      }


                      else
                        res.send("incorrect password");
                });

            }


    });

    }


});




router.get("/timetable",function(req,res){
    //add timetable looking up TODO

    profileModel.findOne( {email:req.session.email} ).then( (data)=>{

        res.render("timetable",{data:data.courses});
    });

});






router.post("/timetable",function(req,res){


    model.find(req.body).then(function(data){

        var segregated_data = segregateData(data);

        res.send( JSON.stringify(segregated_data) );

    });


});




module.exports = router;
