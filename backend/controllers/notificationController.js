import notificationService from "../services/notificationService.js";

export const notifyVolunteer = (req, res) => {
  const { volunteerId, message } = req.body;
  if (!volunteerId || !message) {
    return res
      .status(400)
      .json({ error: "volunteerId and message are required" });
  }

  const result = notificationService.sendNotification(volunteerId, message);
  res.status(200).json(result);
};
