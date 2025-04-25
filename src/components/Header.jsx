import { Link } from "react-router-dom";

function Header({ role }) {  

  return (
    <header>
      {/* Only show Event Management button for admins */}
      {role === "admin" && (
        <Link to="/event-management">
          <button>Event Management</button>
        </Link>
      )}
      <p>Header</p>
    </header>
  );
}

export default Header;

