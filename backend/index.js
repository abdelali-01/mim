import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

// Basic rate limiter: max 100 requests per 5 minutes
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("Connected to database");
  app.listen(process.env.PORT, () => {
    console.log(`Server running at port: ${process.env.PORT}`);
  });
}).catch((err) => {
  console.error("Database connection error:", err.message);
});

app.use(
  session({
    secret: "MyHardAndLongSecretInThisWorld",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
    store: MongoStore.create({ client: mongoose.connection.getClient() }),
  })
);

app.use(passport.initialize());
app.use(passport.session());


// setup our routes
import authRoutes from "./routers/auth.js";
import productRoutes from "./routers/product.js";
import notebookRoutes from "./routers/notebook.js";

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/notebooks", notebookRoutes);