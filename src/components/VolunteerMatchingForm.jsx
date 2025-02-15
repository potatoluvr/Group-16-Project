import React, { useState, useEffect } from "react";
import "./VolunteerMatchingFormStyle.css";

// Placeholder
const fetchVolunteers = () => {
  // Fetch volunteers data from the database (placeholder)
  return [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ];
};

const fetchEvents = () => {
  // Fetch events data from the database (placeholder)
  return [
    { id: 1, title: "Blood Drive" },
    { id: 2, title: "Donation" },
  ];
};

function VolunteerMatchingForm() {
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");

  useEffect(() => {
    // Fetch data when the component is mounted
    setVolunteers(fetchVolunteers());
    setEvents(fetchEvents());
  }, []);

  const handleVolunteerChange = (e) => {
    setSelectedVolunteer(e.target.value);
  };

  const handleEventChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here to match the volunteer to the event
    // Send the matching data to the backend to update the volunteer's profile or event assignment
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
        <label htmlFor="volunteer">Volunteer Name</label>
        <select
          id="volunteer"
          value={selectedVolunteer}
          onChange={handleVolunteerChange}
          required
        >
          <option value="" disabled>
            Select Volunteer
          </option>
          {volunteers.map((volunteer) => (
            <option key={volunteer.id} value={volunteer.id}>
              {volunteer.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="event">Matched Event</label>
        <select
          id="event"
          value={selectedEvent}
          onChange={handleEventChange}
          required
        >
          <option value="" disabled>
            Select Event
          </option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="button-match">
        Match Volunteer
      </button>
    </form>
  );
}

export default VolunteerMatchingForm;
