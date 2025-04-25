import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import notFound from "./routes/404.js";
import connectDB from "./database.js";
import reportingRoutes from "./routes/reportingRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Load Database
connectDB();

const allowedOrigins = [
  "https://group-16-project-bay.vercel.app",
  "https://group-16-project-git-main-lissettes-projects-612f8720.vercel.app"
];

// Middleware
app.use(express.json());
app.use(cors({
  origin: allowedOrigins, // your frontend on Vercel
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.get("/", (req, res) => {
  res.send("Hello");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reports", reportingRoutes);

app.use("*", notFound);

export default app;
