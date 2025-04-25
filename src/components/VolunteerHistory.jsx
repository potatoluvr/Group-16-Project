import React, { useEffect, useState } from "react";

function VolunteerHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchVolunteerHistory = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost:5000/api/volunteers/history/${userId}`
        );

        const data = await response.json();

        setHistory(data.history);
      } catch (err) {}
    };

    fetchVolunteerHistory();
  }, []);

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
          {history.length > 0 ? (
            history.map((event, index) => (
              <tr key={index}>
                <td>{event.eventName}</td>
                <td>{event.eventDescription}</td>
                <td>{event.location}</td>
                <td>{event.requiredSkills}</td>
                <td>{event.urgency}</td>
                <td>{event.eventDate}</td>
                <td>{event.participationStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VolunteerHistory;
