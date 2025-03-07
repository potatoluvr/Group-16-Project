import { useState, useEffect } from "react";
import "./VolunteerMatchingFormStyle.css";

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
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/volunteers")
      .then((response) => response.json())
      .then((data) => setVolunteers(data))
      .catch((error) => console.error("Error fetching volunteers:", error));
  
    fetch("http://localhost:5000/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/volunteers/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ volunteerId: selectedVolunteer, eventId: selectedEvent }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert("Volunteer matched successfully!");
      } else {
        setErrorMessage("Failed to match volunteer.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Server error. Please try again.");
    }
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
