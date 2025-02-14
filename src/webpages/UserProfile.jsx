import UserProfileForm from "../components/UserProfileForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./UserProfileStyle.css";

function UserProfile() {
    return (
        <div className="user-profile-page">
          <Header />
          <UserProfileForm />
          <Footer />
        </div>
      );
}

export default UserProfile;