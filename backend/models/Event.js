import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  requiredSkills: [String],
  urgency: { type: String, 
             enum: ["High", "Medium", "Low"], 
             default: "Medium" 
           },
  date: Date,
});

const Event = mongoose.model("Event", EventSchema);

export { Event };