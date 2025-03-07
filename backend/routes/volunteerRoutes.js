const express = require("express");
const { getVolunteerHistory, matchVolunteer } = require("../controllers/volunteerController");

const router = express.Router();

// Route to get volunteer history
router.get("/history/:id", getVolunteerHistory);

// Route to match a volunteer to an event
router.post("/match", matchVolunteer);

module.exports = router;
