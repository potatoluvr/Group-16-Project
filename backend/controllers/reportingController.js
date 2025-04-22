import {
  generateVolunteerHistoryReport,
  generateEventAssignmentsReport,
} from "../services/reportingService.js";

export const getVolunteerHistoryReport = async (req, res) => {
  try {
    const csvBuffer = await generateVolunteerHistoryReport();
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=volunteer_history_report.csv"
    );
    res.send(csvBuffer);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to generate volunteer history report." });
  }
};

export const getEventAssignmentsReport = async (req, res) => {
  try {
    const csvBuffer = await generateEventAssignmentsReport();
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=event_assignments_report.csv"
    );
    res.send(csvBuffer);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to generate event assignments report." });
  }
};
