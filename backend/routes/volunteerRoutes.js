import { Router } from "express";
import {
  getVolunteerHistory,
  matchVolunteer,
} from "../controllers/volunteerController.js";

const router = Router();

// Route to get volunteer history
router.get("/history/:id", getVolunteerHistory);

// Route to match a volunteer to an event
router.post("/match", matchVolunteer);

export default router;
