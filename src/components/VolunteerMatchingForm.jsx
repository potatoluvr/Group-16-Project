import { useState, useEffect } from "react";
import "./VolunteerMatchingFormStyle.css";

// Placeholder functions
const fetchVolunteers = () => {
  return [
    { id: 1, name: "John Doe", skills: "Deploy, Code", preferences: "Night" },
    {
      id: 2,
      name: "Jane Smith",
      skills: "Packing, Assisting",
      preferences: "Morning",
    },
  ];
};

const fetchEvents = () => {
  return [
    {
      id: 1,
      title: "Blood Drive",
      description: "Saving lives",
      skills: "Packing, Assisting",
    },
    {
      id: 2,
      title: "Donation",
      description: "Donate",
      skills: "Packing, Assisting",
    },
  ];
};

function VolunteerMatchingForm() {
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [volunteerDetails, setVolunteerDetails] = useState({
    skills: "",
    preferences: "",
  });
  const [eventDetails, setEventDetails] = useState({
    description: "",
    skills: "",
  });
  const [showVolunteerList, setShowVolunteerList] = useState(false);
  const [showEventList, setShowEventList] = useState(false);

  useEffect(() => {
    setVolunteers(fetchVolunteers());
    setEvents(fetchEvents());
  }, []);

  const handleVolunteerSelect = (volunteerId) => {
    setSelectedVolunteer(volunteerId);

    const selected = volunteers.find(
      (volunteer) => volunteer.id === parseInt(volunteerId)
    );
    if (selected) {
      setVolunteerDetails({
        skills: selected.skills,
        preferences: selected.preferences,
      });
    }
    setShowVolunteerList(false); // Close the volunteer list after selection
  };

  const handleEventSelect = (eventId) => {
    setSelectedEvent(eventId);

    const selected = events.find((event) => event.id === parseInt(eventId));
    if (selected) {
      setEventDetails({
        description: selected.description,
        skills: selected.skills,
      });
    }
    setShowEventList(false); // Close the event list after selection
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Matched Volunteer:",
      selectedVolunteer,
      "to Event:",
      selectedEvent
    );
  };

  return (
    <form onSubmit={handleSubmit} className="volunteer-matching-form">
      <div className="form-group">
        <label>Select Volunteer</label>
        <button
          type="button"
          onClick={() => setShowVolunteerList(!showVolunteerList)}
        >
          {selectedVolunteer
            ? volunteers.find((v) => v.id === parseInt(selectedVolunteer)).name
            : "Choose Volunteer"}
        </button>

        {showVolunteerList && (
          <ul className="option-list">
            {volunteers.map((volunteer) => (
              <li
                key={volunteer.id}
                onClick={() => handleVolunteerSelect(volunteer.id)}
              >
                {volunteer.name}
              </li>
            ))}
          </ul>
        )}

        {selectedVolunteer && (
          <div className="volunteer-info">
            <p>
              <strong>Skills:</strong>{" "}
              {volunteerDetails.skills || "Not specified"}
            </p>
            <p>
              <strong>Preferences:</strong>{" "}
              {volunteerDetails.preferences || "Not specified"}
            </p>
          </div>
        )}
      </div>

      <div className="form-group">
        <label>Select Event</label>
        <button type="button" onClick={() => setShowEventList(!showEventList)}>
          {selectedEvent
            ? events.find((e) => e.id === parseInt(selectedEvent)).title
            : "Choose Event"}
        </button>

        {showEventList && (
          <ul className="option-list">
            {events.map((event) => (
              <li key={event.id} onClick={() => handleEventSelect(event.id)}>
                <strong>{event.title}</strong>
                <p style={{ fontSize: "smaller" }}>{event.description}</p>
                <p style={{ fontSize: "smaller" }}>
                  <strong>Skills:</strong> {event.skills}
                </p>
              </li>
            ))}
          </ul>
        )}

        {selectedEvent && (
          <div className="event-info">
            <p>
              <strong>Description:</strong> {eventDetails.description}
            </p>
            <p>
              <strong>Skills:</strong> {eventDetails.skills}
            </p>
          </div>
        )}
      </div>

      <button type="submit" className="button-match">
        Match Volunteer
      </button>
    </form>
  );
}

export default VolunteerMatchingForm;
