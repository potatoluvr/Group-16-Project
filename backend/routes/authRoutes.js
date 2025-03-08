import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Protected route to get the user's profile
router.get("/profile", verifyToken, (req, res) => {
  const { email, role, userId } = req.user;
  res.json({
    message: "User profile data",
    email,
    role,
    userId,
  });
});

export default router;
