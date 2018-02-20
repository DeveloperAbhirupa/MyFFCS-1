const profileModel = require("../database/model").profileModel;
const router = require("express").Router();
var checkClash = require("../helpers").checkClash;




router.get("/logout",(req,res)=>{
    req.session.email='';
    res.redirect('/');
});



/* makes an array of clicked course slots and matches them against all alots in the database,
if match found then slot clashed */
//There is a better method to do this
router.post("/save",async function(req,res){

    console.log(req.session.email+" Logged in");

    // make an array of slots of the courses being registered
    let slots = req.body.SLOT.split("+"),str = '',cr = 0;

    //string waits for the promise to be completed and then gets assigned the value of all the slots
    let variable = await profileModel.findOne( {email:req.session.email} ).then( (data)=>{

        data.courses.forEach( (element)=>{
            //make a string by concatenating all slots in courses
            str += (element.SLOT + '+');
            cr += parseInt(element.CREDITS);
        });
        return {slots:str,credits:cr};

    }).catch( (err)=>{
        console.log(err);
    });

    console.log("total credits = "+(parseInt(req.body.CREDITS)+variable.credits) );

    //TODO check if applying for same course again
    // if requested for a course which makes more than 27 total credits then throw alert
    if(variable.credits + parseInt(req.body.CREDITS) > 27)
        res.send( {status:"limit",info:27-variable.credits} );

    //checkClash returns a clashed slot if slots are clashed
    else if( checkClash(slots,variable.slots) )
        res.send( {status:"clashed",info:slot} );

    //if no clash then update the database
    else profileModel.update( {email:req.session.email}, {$push: {courses:req.body} } ).then( ()=>{

        console.log("updated");
        res.send( { status:"updated",info:variable.credits + parseInt(req.body.CREDITS),course:req.body } );
    });


});

///////////////////////////////TODO-> Deleting//////////////////////////////////


router.delete('/del',(req,res)=>{

    console.log(req.body.VENUE);


    profileModel.update( {email:req.session.email},{$pull: {courses:req.body} }  ).then( ()=>{

        console.log("removed course!");

        res.send("deleted course");

    }).catch( (err)=>{
        console.log(err);
    });


});



module.exports = router;

/*let kappa;

//2. iterate through the array
 for(slot of slots){

    //3. check regex match for slot in db, problem TODO /B1/g
     kappa = await profileModel.findOne( {email:req.session.email} )
    .then(function(data){
            return data.courses;
    }).catch( (err) => {
        console.log(err);
    });

    if(kappa.length!==0){
        console.log("This is "+kappa);
        break;
    }
}


if(!kappa.length){
    profileModel.update( {email:req.session.email},{$push:{courses:req.body} } ).then(function(){
        console.log("updated");
    });
}

else{

    console.log("Slot clashed");
}


*/
