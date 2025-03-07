const express = require("express");
const { getEvents, createEvent } = require("../controllers/eventController");
const router = express.Router();

router.get("/events", getEvents);
router.post("/create-event", createEvent);

module.exports = router;
