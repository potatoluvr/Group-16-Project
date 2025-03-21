const Event = require("../models/Event");

const events = [
  {
    id: 1,
    title: "Community Cleanup",
    requiredSkills: ["Teamwork"],
    urgency: "High",
  },
  {
    id: 2,
    title: "Food Drive",
    requiredSkills: ["Organization"],
    urgency: "Medium",
  },
];

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body); 
    await newEvent.save(); // Saves to MongoDB
    res.json({ success: true, message: "Event created successfully!", event: newEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
