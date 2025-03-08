import { Router } from "express";
import { getEvents, createEvent } from "../controllers/eventController.js";
const router = Router();

router.get("/events", getEvents);
router.post("/create-event", createEvent);

export default router;
