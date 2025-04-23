import express from "express";
import {
  getVolunteerHistoryReport,
  getEventAssignmentsReport,
} from "../controllers/reportingController.js";

const router = express.Router();

router.get("/volunteers", getVolunteerHistoryReport);
router.get("/events", getEventAssignmentsReport);

export default router;
