import express from "express";
import { createEvent, getEvents } from "../controllers/eventController.js";
import verifyToken, { isAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/event", verifyToken, isAdmin, createEvent); 
router.post("/create-event", createEvent);
router.get("/", getEvents);

export default router;
