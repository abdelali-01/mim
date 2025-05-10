import express from "express";
import passport from "passport";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import "../stratigies/local.js"; // Ensure this file is imported to initialize the strategy
import jwt from "jsonwebtoken";
import { getResetPasswordEmail } from "../utils/email/emailTemplates.js";
import { emailSender } from "../utils/email/emailSender.js";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
import {
  addAdminPermissions,
  rolePermissions,
} from "../utils/middlewares/adminPermissions.js";
import Notebook from "../models/Notebook.js";
dotenv.config();

const router = express.Router();

// check user is logged in or not
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    return res
      .status(200)
      .json({ message: "User is logged in", user: req.user });
  } else {
    return res.status(401).json({ message: "User is not logged in" });
  }
});

// get the admins 
router.get('/admins' , rolePermissions(['super' , 'sub-super']) ,async (req, res) => {
  try {
    const admins = await User.find({isAdmin : true});
    if(!admins){
      return res.status(404).json({
        message : 'No admin found !'
      })
    }

    res.status(200).json({
      message : 'success',
      admins ,
    });
  } catch (error) {
    console.log('Error during getting the admins' , error);
          res
        .status(500)
        .json({ message: "Error getting admin accounts", error: err.message });
  }
})

// Signup route
router.post(
  "/signup",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("phone").isMobilePhone().withMessage("Invalid phone number"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  rolePermissions(["super", "sub-super"]),
  // Only allow super and sub-super admins to register new users
  addAdminPermissions,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, phone, password, isAdmin, role } = req.body;
    try {
      // Check if the username, email, or phone already exists
      const existingUser = await User.findOne({
        $or: [{ username }, { email }, { phone }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Username, email, or phone already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        username,
        email,
        phone,
        password: hashedPassword,
        isAdmin,
        role,
      });
      await newUser.save();

      // create notebook for registred client 
      const notebook = {
        client : {
          username : newUser.username ,
          phone : newUser.phone ,
          id : newUser._id
        }
      }
      const createdNotebook = new Notebook(notebook);
      await createdNotebook.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error registering user", error: err.message });
      console.error("error durring client registration ", err);
    }
  }
);

// Login route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error during authentication", error: err.message });
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }

    // Log the user in
    req.logIn(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error logging in", error: err.message });
      }
      res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
});

// reset password route
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // const link = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    const link = `${process.env.FRONTEND_URL}/api/auth/reset-password/${token}`;
    // Send the email with the reset link
    const template = getResetPasswordEmail(link);

    try {
      await emailSender({
        email: user.email,
        subject: "Reset Password",
        html: template,
      });

      res.status(200).json({
        message: "Reset password link sent to your email",
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error sending email", error: error.message });
      console.error("Error sending email: ", error);
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error finding user", error: err.message });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    // Find the user by email
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error resetting password", error: error.message });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error logging out", error: err.message });
    }
    res.status(200).json({ message: "Logout successful" });
  });
});

export default router;
