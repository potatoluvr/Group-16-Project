const users = [
    { id: 1, email: "admin@gmail.com", role: "admin" },
    { id: 2, email: "volunteer@gmail.com", role: "volunteer" },
  ];
  
  const events = [
    { id: 1, title: "Community Cleanup", requiredSkills: ["Teamwork"], urgency: "High" },
    { id: 2, title: "Food Drive", requiredSkills: ["Organization"], urgency: "Medium" },
  ];
  
  const volunteerHistory = [
    { volunteerId: 2, eventId: 1, status: "Completed", eventTitle: "Community Cleanup" },
  ];
  
  // Get Volunteer History
  exports.getVolunteerHistory = (req, res) => {
    const volunteerId = parseInt(req.params.id);
    const history = volunteerHistory.filter((entry) => entry.volunteerId === volunteerId);
  
    if (!history.length) {
      return res.status(404).json({ success: false, message: "No volunteer history found." });
    }
  
    res.json({ success: true, history });
  };
  
  // Match Volunteer to Event
  exports.matchVolunteer = (req, res) => {
    const { volunteerId, eventId } = req.body;
    
    const volunteer = users.find((user) => user.id === volunteerId);
    const event = events.find((ev) => ev.id === eventId);
  
    if (!volunteer || !event) {
      return res.status(400).json({ success: false, message: "Invalid volunteer or event." });
    }
  
    // Add entry to volunteer history
    volunteerHistory.push({ volunteerId, eventId, status: "Upcoming", eventTitle: event.title });
  
    res.json({ success: true, message: `Volunteer matched to event: ${event.title}` });
  };
