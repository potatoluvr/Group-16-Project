import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import VolunteerHistory from "../components/VolunteerHistory";
import "./VolunteerHistoryTable.css";
import { FaBell, FaUserCircle } from "react-icons/fa";

function VolunteerHisoryPage() {
  const [notifications] = useState([
    "You have a new message.",
    "Your event was approved.",
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <div className="volunteer-history">
      <header className="header">
        <div className="header-right">
          <div
            className="notification-container"
            onMouseEnter={() => setShowNotifications(true)}
            onMouseLeave={() => setShowNotifications(false)}
          >
            <button className="notification-icon">
              <FaBell />
              {notifications.length > 0 && (
                <span className="notification-count">
                  {notifications.length}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="notification-dropdown">
                {notifications.map((notification, index) => (
                  <div key={index} className="notification-item">
                    {notification}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="profile-icon">
            <FaUserCircle />
          </button>
          <button className="signout">Sign Out</button>
        </div>
      </header>
      <VolunteerHistory />
      <Footer />
    </div>
  );
}

export default VolunteerHisoryPage;
