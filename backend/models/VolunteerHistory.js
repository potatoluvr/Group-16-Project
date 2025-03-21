const mongoose = require("mongoose");

const VolunteerHistorySchema = new mongoose.Schema({
  volunteerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  eventId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Event", required: true 
  },
  status: { 
    type: String, 
    enum: ["Pending", "Completed"], 
    default: "Pending" 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("VolunteerHistory", VolunteerHistorySchema);
