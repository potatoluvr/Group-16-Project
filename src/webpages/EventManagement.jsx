import EventManagementForm from "../components/EventManagementForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./EventStyle.css";

function EventManagement() {
    return (
      <div className="event-form-page">
        <Header />
        <EventManagementForm />
        <Footer />
      </div>
    );
  }
  
export default EventManagement;