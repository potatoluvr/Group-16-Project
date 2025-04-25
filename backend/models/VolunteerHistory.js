import mongoose from "mongoose";

const VolunteerHistorySchema = new mongoose.Schema({
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserCredentials",
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const VolunteerHistory = mongoose.model(
  "VolunteerHistory",
  VolunteerHistorySchema,
  "volunteerhistories"
);

export { VolunteerHistory };
