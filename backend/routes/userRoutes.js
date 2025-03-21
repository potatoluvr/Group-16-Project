import { Router } from "express";
import {
  getUserProfile,
  createUserProfile,
} from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

// Route to fetch user profile
router.get("/:id", getUserProfile);

// Route to update user profile
router.post("/create", verifyToken, createUserProfile);

export default router;
