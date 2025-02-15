import { useState } from "react";
import { FaBell } from "react-icons/fa";

const Notification = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown visibility
  };

  return (
    <div className="notification-container">
      {/* Notification button (bell) */}
      <button className="notification-button" onClick={toggleDropdown}>
        <FaBell />
      </button>

      {/* Dropdown menu for notifications (now contains buttons) */}
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <button className="notification-item">Notification 1</button>
          <button className="notification-item">Notification 2</button>
          <button className="notification-item">Notification 3</button>
        </div>
      )}
    </div>
  );
};

export default Notification;
