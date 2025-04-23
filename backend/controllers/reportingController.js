import {
  generateVolunteerHistoryReport,
  generateEventAssignmentsReport,
} from "../services/reportingService.js";

export const getVolunteerHistoryReport = async (req, res) => {
  try {
    const format = req.query.format || "csv";
    const { buffer, contentType, fileName } =
      await generateVolunteerHistoryReport(format);

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.send(buffer);
  } catch (err) {
    console.error("Error generating volunteer history report:", err);
    res
      .status(500)
      .json({ error: "Failed to generate volunteer history report." });
  }
};

export const getEventAssignmentsReport = async (req, res) => {
  try {
    const format = req.query.format || "csv";
    const { buffer, contentType, fileName } =
      await generateEventAssignmentsReport(format);

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.send(buffer);
  } catch (err) {
    console.error("Error generating event assignments report:", err);
    res
      .status(500)
      .json({ error: "Failed to generate event assignments report." });
  }
};
