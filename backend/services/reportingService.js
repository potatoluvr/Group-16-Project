import { VolunteerHistory } from "../models/VolunteerHistory.js";
import { Event } from "../models/Event.js";
import { generateCSV } from "../utils/csvGenerator.js";

export const generateVolunteerHistoryReport = async () => {
  const history = await VolunteerHistory.find()
    .populate("volunteerId")
    .populate("eventId")
    .sort({ timestamp: -1 })
    .lean();

  const rows = history.map((entry) => ({
    VolunteerName: entry.volunteerId?.name || "N/A",
    VolunteerEmail: entry.volunteerId?.email || "N/A",
    Event: entry.eventId?.name || "N/A",
    EventLocation: entry.eventId?.location || "N/A",
    EventDate: entry.eventId?.date
      ? new Date(entry.eventId.date).toLocaleDateString()
      : "N/A",
    Status: entry.status,
    Timestamp: new Date(entry.timestamp).toLocaleString(),
  }));

  return generateCSV(rows);
};

export const generateEventAssignmentsReport = async () => {
  const events = await Event.find().populate("assignedVolunteers").lean();

  const rows = [];

  events.forEach((event) => {
    if (event.assignedVolunteers?.length > 0) {
      event.assignedVolunteers.forEach((volunteer) => {
        rows.push({
          Event: event.name,
          Location: event.location,
          Date: new Date(event.date).toLocaleDateString(),
          VolunteerName: volunteer.name,
          VolunteerEmail: volunteer.email,
        });
      });
    } else {
      rows.push({
        Event: event.name,
        Location: event.location,
        Date: new Date(event.date).toLocaleDateString(),
        VolunteerName: "N/A",
        VolunteerEmail: "N/A",
      });
    }
  });

  return generateCSV(rows);
};
