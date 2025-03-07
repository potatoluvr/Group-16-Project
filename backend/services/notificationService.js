class NotificationService {
  sendNotification(volunteerId, message) {
    console.log(`Notification sent to Volunteer ${volunteerId}: ${message}`);
    return { success: true, message: "Notification sent" };
  }
}

export default new NotificationService();
