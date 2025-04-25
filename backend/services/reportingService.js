import { VolunteerHistory } from "../models/VolunteerHistory.js";
import { Event } from "../models/Event.js";
import { generateCSV } from "../utils/csvGenerator.js";
import { generatePDF } from "../utils/pdfGenerator.js";
import { UserCredentials, UserProfile } from "../models/User.js";

const generateReportBuffer = async (data, format, baseFileName) => {
  let buffer;
  let contentType;
  let extension;

  if (format === "pdf") {
    buffer = await generatePDF(
      data,
      baseFileName.replace("-", " ").toUpperCase()
    );
    contentType = "application/pdf";
    extension = "pdf";
  } else {
    buffer = generateCSV(data);
    contentType = "text/csv";
    extension = "csv";
  }

  const fileName = `${baseFileName}-${new Date()
    .toISOString()
    .slice(0, 10)}.${extension}`;

  return { buffer, contentType, fileName };
};

export const generateVolunteerHistoryReport = async (format = "csv") => {
  const historyRecords = await VolunteerHistory.find()
    .populate("eventId", "eventName location eventDate")
    .populate("volunteerId");

  const userIds = historyRecords.map((r) => r.volunteerId?._id);
  const profiles = await UserProfile.find({ userId: { $in: userIds } });

  const profileMap = new Map();
  profiles.forEach((p) => profileMap.set(p.userId.toString(), p));

  const formattedData = historyRecords.map((record) => {
    const volunteer = record.volunteerId;
    const profile = profileMap.get(volunteer?._id.toString());

    return {
      Volunteer: profile?.fullName || "N/A",
      Email: volunteer?.email || "N/A",
      Event: record.eventId?.eventName || "N/A",
      Location: record.eventId?.location || "N/A",
      Date: record.eventId?.eventDate?.toISOString().split("T")[0] || "N/A",
      Status: record.status,
    };
  });

  return generateReportBuffer(formattedData, format, "volunteer-history");
};

export const generateEventAssignmentsReport = async (format = "csv") => {
  const events = await Event.find().populate("assignedVolunteers");

  const userIds = events.flatMap((e) => e.assignedVolunteers).map((u) => u._id);
  const profiles = await UserProfile.find({ userId: { $in: userIds } });

  const profileMap = new Map();
  profiles.forEach((p) => profileMap.set(p.userId.toString(), p));

  const formattedData = events.flatMap((event) => {
    if (!event.assignedVolunteers.length) {
      return [
        {
          Event: event.eventName,
          Location: event.location,
          Date: event.eventDate?.toISOString().split("T")[0] || "N/A",
          Volunteer: "None",
          Email: "N/A",
        },
      ];
    }

    return event.assignedVolunteers.map((vol) => {
      const profile = profileMap.get(vol._id.toString());

      return {
        Event: event.eventName,
        Location: event.location,
        Date: event.eventDate?.toISOString().split("T")[0] || "N/A",
        Volunteer: profile?.fullName || "N/A",
        Email: vol.email || "N/A",
      };
    });
  });

  return generateReportBuffer(formattedData, format, "event-assignments");
};
