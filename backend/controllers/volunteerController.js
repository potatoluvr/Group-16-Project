import { VolunteerHistory } from "../models/VolunteerHistory.js";
import { UserCredentials, UserProfile } from "../models/User.js";
import { Event } from "../models/Event.js";

// Get Volunteer History
export const getVolunteerHistory = async (req, res) => {
  try {
    const volunteerId = req.params.id;
    const history = await VolunteerHistory.find({ volunteerId }).populate("eventId");

    if (!history.length) {
      return res.status(404).json({ success: false, message: "No volunteer history found." });
    }

    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Match Volunteer to Event
export const matchVolunteer = async (req, res) => {
  try {
    const { volunteerId, eventId } = req.body;

    // Ensure volunteerId exists in User collection
    const volunteer = await User.findById(volunteerId);
    if (!volunteer || volunteer.role !== "volunteer") {
      return res.status(400).json({ success: false, message: "Invalid volunteer ID" });
    }

    // Ensure eventId exists in Event collection
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(400).json({ success: false, message: "Invalid event ID" });
    }

    // Create a new volunteer-event match entry
    const newMatch = new VolunteerHistory({
      volunteerId,
      eventId,
      status: "Upcoming",
    });
    await newMatch.save();

    res.json({ success: true, message: "Volunteer matched successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

