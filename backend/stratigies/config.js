import passport from "passport";
import User from "../models/User.js";


passport.serializeUser((user , done)=>{
    done(null , user._id);
});

passport.deserializeUser(async (id , done)=>{
    try {
        const findUser = await User.findById(id);
        if(!findUser) {
            return done(null, null);
        }

        done(null , findUser);
    } catch (error) {
        console.log('Error during deserialize the User' , error);
        done(error , null);
    }
});


export default passport ;