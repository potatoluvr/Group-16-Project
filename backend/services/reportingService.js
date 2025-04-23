import { VolunteerHistory } from "../models/VolunteerHistory.js";
import { Event } from "../models/Event.js";
import { generateCSV } from "../utils/csvGenerator.js";
import { generatePDF } from "../utils/pdfGenerator.js";

const formatFile = async (rows, title, format, defaultFilename) => {
  if (format === "pdf") {
    const buffer = await generatePDF(rows, title);
    return {
      buffer,
      contentType: "application/pdf",
      fileName: defaultFilename.replace(".csv", ".pdf"),
    };
  } else {
    const buffer = generateCSV(rows);
    return {
      buffer,
      contentType: "text/csv",
      fileName: defaultFilename,
    };
  }
};

export const generateVolunteerHistoryReport = async (format = "csv") => {
  const history = await VolunteerHistory.find()
    .populate("volunteerId")
    .populate("eventId")
    .lean();

  const rows = history.map((entry) => ({
    VolunteerName: entry.volunteerId?.name || "N/A",
    VolunteerEmail: entry.volunteerId?.email || "N/A",
    Event: entry.eventId?.title || "N/A",
    EventLocation: entry.eventId?.location || "N/A",
    EventDate: entry.eventId?.date
      ? new Date(entry.eventId.date).toLocaleDateString()
      : "N/A",
    Status: entry.status,
    Timestamp: new Date(entry.timestamp).toLocaleString(),
  }));

  return formatFile(
    rows,
    "Volunteer History Report",
    format,
    "volunteer_history_report.csv"
  );
};

export const generateEventAssignmentsReport = async (format = "csv") => {
  const events = await Event.find().populate("assignedVolunteers").lean();

  const rows = [];

  events.forEach((event) => {
    if (event.assignedVolunteers?.length > 0) {
      event.assignedVolunteers.forEach((volunteer) => {
        rows.push({
          Event: event.title,
          Location: event.location,
          Date: new Date(event.date).toLocaleDateString(),
          VolunteerName: volunteer.name,
          VolunteerEmail: volunteer.email,
        });
      });
    } else {
      rows.push({
        Event: event.title,
        Location: event.location,
        Date: new Date(event.date).toLocaleDateString(),
        VolunteerName: "N/A",
        VolunteerEmail: "N/A",
      });
    }
  });

  return formatFile(
    rows,
    "Event Assignments Report",
    format,
    "event_assignments_report.csv"
  );
};
