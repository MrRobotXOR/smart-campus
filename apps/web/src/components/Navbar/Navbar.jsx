import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { getUser, clearAuth } from "../../store/authStore";
import "./Navbar.css";

function Navbar({ setMobileOpen }) {
  const user = getUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  const getTitle = () => {
    const path = location.pathname;

    if (path.startsWith("/club")) return "Club Dashboard";
    if (path.startsWith("/hod")) return "HOD Dashboard";
    if (path.startsWith("/admin")) return "Admin Dashboard";
    return "Student Dashboard";
  };

  return (
    <header className="navbar">
      <button className="menu-btn" onClick={() => setMobileOpen(true)}>
        <FaBars />
      </button>

      <div>
        <h2>{getTitle()}</h2>
        <p>{user?.email}</p>
      </div>

      <div className="profile">
        <img
          src={`https://ui-avatars.com/api/?name=${user?.name}`}
          alt="Profile"
          className="profile-avatar"
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className="dropdown">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;