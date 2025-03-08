const events = [
  {
    id: 1,
    title: "Community Cleanup",
    requiredSkills: ["Teamwork"],
    urgency: "High",
  },
  {
    id: 2,
    title: "Food Drive",
    requiredSkills: ["Organization"],
    urgency: "Medium",
  },
];

export function getEvents(req, res) {
  res.json(events);
}

export function createEvent(req, res) {
  const { title, description, requiredSkills, urgency } = req.body;
  const newEvent = {
    id: events.length + 1,
    title,
    description,
    requiredSkills,
    urgency,
  };
  events.push(newEvent);
  res.json({ success: true, message: "Event created successfully!" });
}
