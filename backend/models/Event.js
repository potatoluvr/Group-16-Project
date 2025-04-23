import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  requiredSkills: [String],
  urgency: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
  date: Date,
  assignedVolunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Event = mongoose.model("Event", EventSchema, "events");

export { Event };
