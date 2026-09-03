import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Navbar.css";
import { getUser, clearAuth } from "../../store/authStore";

function Navbar({ setMobileOpen }) {
  const user = getUser();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  return (
    <header className="navbar">
      <button
        className="menu-btn"
        onClick={() => setMobileOpen(true)}
      >
        <FaBars />
      </button>

      <div>
        <h2>Student Dashboard</h2>
        <p>{user?.email}</p>
      </div>

      <div className="profile">
        <img
          onClick={() => setOpen(!open)}
          src={`https://ui-avatars.com/api/?name=${user?.name}`}
          alt="Profile"
          className="profile-avatar"
        />

        {open && (
          <div className="dropdown">
            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;