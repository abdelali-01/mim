import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import User from "./models/User.js";
import bcrypt from "bcrypt";

import path from "path";
import { fileURLToPath } from "url";
const app = express();



// This fixes __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Load .env from backend folder
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Function to create initial admin user
async function createInitialAdmin() {
  try {
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const adminUser = new User({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        username: process.env.ADMIN_USERNAME,
        role: process.env.ADMIN_ROLE || "admin",
        isAdmin: true,
      });

      await adminUser.save();
      console.log("Initial admin user created successfully");
    }
  } catch (error) {
    console.error("Error creating initial admin user:", error);
  }
}

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "*"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.DATABASE_URL)
  .then(async () => {
    console.log("Connected to database");
    await createInitialAdmin();

    app.listen(process.env.PORT || 4444, () => {
      console.log(`Server running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.use(
  session({
    secret: "MyHardAndLongSecretInThisWorld",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
    store: MongoStore.create({ client: mongoose.connection.getClient() }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Set the correct uploads directory path based on environment
// const uploadsPath = path.join(
//   __dirname,
//   "..",
//   "resources",
//   "backend",
//   "uploads"
// );


app.get("/", (req, res) => {
  res.send("API is running...");
});

// setup our routes
import authRoutes from "./routers/auth.js";
import productRoutes from "./routers/product.js";
import notebookRoutes from "./routers/notebook.js";
import cashRegisterRoutes from "./routers/cashRegister.js";
import trodatRegisterRoues from "./routers/trodatRegister.js";
import tamponsTableRoutes from "./routers/tamponTable.js";
import statisticRoutes from "./routers/statistic.js";
import calendarRoutes from "./routers/calendar.js";

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/notebooks", notebookRoutes);
app.use("/api/cash-register", cashRegisterRoutes);
app.use("/api/trodat-register", trodatRegisterRoues);
app.use("/api/tampon", tamponsTableRoutes);
app.use("/api/statistic", statisticRoutes);
app.use("/api/calendar", calendarRoutes);
