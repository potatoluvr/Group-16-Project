import { Link } from "react-router-dom";
import Notification from "./Notification";

function Header() {
  return (
    <header>
      <Link to="/event-management">
        {" "}
        {/* Temporary button to open event page, will eventually make it only show for admins*/}
        <button>Event Management</button>
      </Link>
      <p>Header</p>
      <Notification />
    </header>
  );
}

export default Header;
