import { Router } from "express";
import {
  getVolunteerHistory,
  matchVolunteer,
} from "../controllers/volunteerController.js";
import { getVolunteers } from "../controllers/userController.js";

const router = Router();

// Route to get volunteer history
router.get("/history/:id", getVolunteerHistory);
// Route to get volunteer list
router.get("/", getVolunteers)

// Route to match a volunteer to an event
router.post("/match", matchVolunteer);

export default router;
