import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/event-management"> {/* Temporary button to open event page, will eventually make it only show for admins*/}
        <button>
          Event Management
        </button>
      </Link>
      <p>Header</p>
    </header>
  );
}

export default Header;
