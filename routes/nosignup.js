const model = require("../database/model").courseModel;
const router = require("express").Router();


router.get("/timetable",(req,res)=>{
    res.render("nosignup-timetable");
});


module.exports = router;
