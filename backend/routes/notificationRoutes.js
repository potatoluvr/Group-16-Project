import express from "express";
import { notifyVolunteer } from "../controllers/notificationController.js";

const router = express.Router();
router.post("/notify", notifyVolunteer);

export default router;
