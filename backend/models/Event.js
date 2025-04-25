import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDescription: String,
  location: String,
  requiredSkills: [String],
  urgency: { type: String, enum: ["high", "medium", "low"], default: "medium" },
  eventDate: Date,
  assignedVolunteers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "UserCredentials" },
  ],
});

const Event = mongoose.model("Event", EventSchema, "events");

export { Event };
