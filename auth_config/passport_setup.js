const passport = require("passport");
const googleStrategy = require("passport-google-oauth20");
const profileModel = require("../database/model").profileModel;



//To stuff user email into a cookie
passport.serializeUser((user,done)=>{

    done(null,user.email);
});

//to obtain user data from cookie
passport.deserializeUser((user_email,done)=>{

    profileModel.findOne({email:user_email}).then((user)=>{

        done(null,user);
    });
});




passport.use(

    new googleStrategy({

        clientID:'1041308610761-n464nc77oqip396ukj86m69gqb1lmg5b.apps.googleusercontent.com',
        clientSecret:'oK5N7s8GUFoyOCnVXVNLg1yV',
        callbackURL:'/auth/google/redirect'
    } , (accessToken,refreshToken,profile,done)=>{

            profileModel.findOne( {email:profile.displayName} ).then((user)=>{

                //If no specified user existing in DB
                if(!user){

                    new profileModel({
                        email:profile.displayName,
                        passwd:profile.id,
                        courses:[]
                    }).save().then((newUser)=>{

                        console.log("saved user to DB");
                        done(null,newUser);
                    });
                }


                else{
                    console.log("Logged in as "+profile.displayName);
                    done(null,user);
                }


            });

    })
)
