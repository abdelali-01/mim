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
import User from "./models/User.js";
import bcrypt from "bcrypt";

const app = express();

dotenv.config();

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
        role: process.env.ADMIN_ROLE || 'admin',
        isAdmin: true
      });
      
      await adminUser.save();
      console.log('Initial admin user created successfully');
    }
  } catch (error) {
    console.error('Error creating initial admin user:', error);
  }
}

// Trust proxy in production
if (process.env.NODE_ENV === "production") {
  app.set('trust proxy', 1);
}

// Configure CORS
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['set-cookie']
}));

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure Helmet with specific settings for production
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
}));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "MyHardAndLongSecretInThisWorld",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
    proxy: process.env.NODE_ENV === "production",
    store: MongoStore.create({ 
      client: mongoose.connection.getClient(),
      ttl: 10 * 24 * 60 * 60 // 10 days
    }),
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use("/uploads", express.static("uploads"));

// Database connection
mongoose.connect(process.env.DATABASE_URL).then(async () => {
  console.log("Connected to database");
  await createInitialAdmin();
  
  app.listen(process.env.PORT, () => {
    console.log(`Server running at port: ${process.env.PORT}`);
  });
}).catch((err) => {
  console.error("Database connection error:", err);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// setup our routes
import authRoutes from "./routers/auth.js";
import productRoutes from "./routers/product.js";
import notebookRoutes from "./routers/notebook.js";
import cashRegisterRoutes from './routers/cashRegister.js';
import trodatRegisterRoues from './routers/trodatRegister.js';
import tamponsTableRoutes from './routers/tamponTable.js';
import statisticRoutes from './routers/statistic.js';
import calendarRoutes from './routers/calendar.js';

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/notebooks", notebookRoutes);
app.use('/api/cash-register', cashRegisterRoutes);
app.use('/api/trodat-register', trodatRegisterRoues);
app.use('/api/tampon', tamponsTableRoutes);
app.use('/api/statistic', statisticRoutes);
app.use('/api/calendar', calendarRoutes);