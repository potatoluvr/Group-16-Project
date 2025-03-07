const express = require("express");
const cors = require("cors");
const logger = require("./utils/logger");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/users", userRoutes);
app.use("/volunteers", volunteerRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Volunteer Management API");
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

// Start Server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
