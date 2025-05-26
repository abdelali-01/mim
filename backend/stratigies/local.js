import passport from "passport";
import User from "../models/User.js";
import { Strategy } from "passport-local";
import dotenv from "dotenv";
import "./config.js";

dotenv.config();

passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "Incorrect Email or Password." });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect Email or Password." });
      }

      const { password: _, ...userWithoutPassword } = user.toObject();
      return done(null, userWithoutPassword);
    } catch (err) {
      return done(err);
    }
  })
);
