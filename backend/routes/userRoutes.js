import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

const router = Router();

// Route to fetch user profile
router.get("/:id", getUserProfile);

// Route to update user profile
router.post("/update", updateUserProfile);

export default router;
