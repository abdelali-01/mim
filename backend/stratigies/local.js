import passport from "passport";
import User from "../models/User.js";
import { Strategy } from "passport-local";

import './config.js';

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      // Validate the password
      const isMatch = await user.comparePassword(password); // Assuming comparePassword is a method in your User model
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }

      // If everything is fine, return the user
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);