import passport from "passport";
import User from "../models/User.js";
import { Strategy } from "passport-local";

import './config.js';

passport.use(
  new Strategy(
    { usernameField: "email" },
    async (email, password, done) => {

      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Incorrect Email or Password." });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect Email or Password." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);