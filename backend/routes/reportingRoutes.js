import express from "express";
import {
  getVolunteerHistoryReport,
  getEventAssignmentsReport,
} from "../controllers/reportingController.js";

const router = express.Router();

router.get("/volunteers", getVolunteerHistoryReport);
router.get("/events", getEventAssignmentsReport);

router.get("/api/reports/volunteers", async (req, res) => {
  try {
    const csv = await generateVolunteerHistoryReport();
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="volunteer-history-report.csv"'
    );
    res.send(csv);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error generating report" });
  }
});

// Finish later
router.get("/events", getEventAssignmentsReport);

export default router;
