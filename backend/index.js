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

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Set-Cookie']
}));

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

mongoose.connect(process.env.DATABASE_URL).then(async () => {
  console.log("Connected to database");
  // Create initial admin user after database connection
  await createInitialAdmin();
  
  app.listen(process.env.PORT, () => {
    console.log(`Server running at port: ${process.env.PORT}`);
  });
}).catch((err) => {
  console.error("Database connection error:", err);
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
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    },
    proxy: true, // Always trust the reverse proxy
    store: MongoStore.create({ client: mongoose.connection.getClient() }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads", express.static("uploads"));



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
app.use('/api/cash-register' , cashRegisterRoutes);
app.use('/api/trodat-register' , trodatRegisterRoues);
app.use('/api/tampon' , tamponsTableRoutes);
app.use('/api/statistic' , statisticRoutes);
app.use('/api/calendar', calendarRoutes);