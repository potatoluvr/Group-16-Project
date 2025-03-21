const mongoose = require("mongoose");

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

module.exports = mongoose.model("Event", EventSchema);
