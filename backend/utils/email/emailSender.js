import nodemailer from "nodemailer";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// email setup nodemailer
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify if the transporter works without errors
transporter.verify((error, success) => {
  if (error) {
    console.log({ error });
  } else {
    console.log(success);
  }
});


export const emailSender = async (options) => {
  return await transporter.sendMail({
    from:  `Mim store <${process.env.EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html : options.html
  });
};