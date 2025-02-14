import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import VolunteerHistory from "../components/VolunteerHistory";
import "./VolunteerHistoryTable.css";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

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
          <Link to="/user-profile">
            <button className="profile-icon">
              <FaUserCircle />
            </button>
          </Link>
          <Link to="/">
            <button className="signout">Sign Out</button>
          </Link>
        </div>
      </header>
      <VolunteerHistory />
      <Footer />
    </div>
  );
}

export default VolunteerHisoryPage;
