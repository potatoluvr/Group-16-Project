import { Router } from "express";
import {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

// Route to fetch user profile
router.get("/:id", getUserProfile);

// Route to update user profile
router.post("/create", verifyToken, createUserProfile);
router.post("/update", verifyToken, updateUserProfile);

export default router;
