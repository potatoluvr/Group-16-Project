import React, { useState } from "react";

function VolunteerHistory() {
  const [eventData] = useState([
    {
      eventName: "Community Cleanup",
      eventDescription: "A cleanup event in the park.",
      location: "Hermann Park, 6001 Fannin St, Houston, TX 77030",
      requiredSkills: "Teamwork, Physical Stamina",
      urgency: "High",
      eventDate: "2025-03-15",
      participationStatus: "Completed",
    },
    {
      eventName: "Food Drive",
      eventDescription: "Collect and distribute food for the needy.",
      location: "The Houston Food Bank, 535 Portwall St, Houston, TX 77029",
      requiredSkills: "Organization, Communication",
      urgency: "Medium",
      eventDate: "2025-04-10",
      participationStatus: "Upcoming",
    },
    {
      eventName: "Animal Rescue",
      eventDescription: "Assist in rescuing and caring for stray animals.",
      location: "BARC Animal Shelter, 3300 Carr St, Houston, TX 77026",
      requiredSkills: "Patience, Animal Care",
      urgency: "High",
      eventDate: "2025-05-05",
      participationStatus: "Pending Approval",
    },
  ]);

  return (
    <div className="container-history">
      <h2>Volunteer History</h2>
      <table className="volunteer-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Required Skills</th>
            <th>Urgency</th>
            <th>Event Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {eventData.map((event, index) => (
            <tr key={index}>
              <td>{event.eventName}</td>
              <td>{event.eventDescription}</td>
              <td>{event.location}</td>
              <td>{event.requiredSkills}</td>
              <td>{event.urgency}</td>
              <td>{event.eventDate}</td>
              <td>{event.participationStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VolunteerHistory;
