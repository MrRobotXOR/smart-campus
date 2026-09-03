import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaCalendarAlt,
  FaBell,
  FaUser,
  FaPlusCircle,
  FaUsers,
  FaClipboardList
} from "react-icons/fa";

import { getUser } from "../../store/authStore";
import "./Sidebar.css";

function Sidebar({ collapsed, setCollapsed, mobileOpen }) {
  const user = getUser();

  // Student Menu
  const studentMenu = [
    { icon: <FaHome />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaCalendarAlt />, label: "Events", path: "/events" },
    { icon: <FaBell />, label: "Notifications", path: "/notifications" },
    { icon: <FaUser />, label: "Profile", path: "/profile" }
  ];

  // Club Head Menu
  const clubMenu = [
    { icon: <FaHome />, label: "Dashboard", path: "/club/dashboard" },
    { icon: <FaPlusCircle />, label: "Create Event", path: "/club/create-event" },
    { icon: <FaCalendarAlt />, label: "My Events", path: "/club/events" },
    { icon: <FaUsers />, label: "Participants", path: "/club/participants" }
  ];

  // HOD Menu
  const hodMenu = [
    { icon: <FaHome />, label: "Dashboard", path: "/hod/dashboard" },
    { icon: <FaClipboardList />, label: "Pending Events", path: "/hod/dashboard" },
    { icon: <FaCalendarAlt />, label: "Reports", path: "/hod/reports" }
  ];

  // Role-wise Menu
  const menuItems =
    user?.role === "club_head"
      ? clubMenu
      : user?.role === "hod"
      ? hodMenu
      : studentMenu;

  return (
    <aside
      className={
        mobileOpen
          ? "sidebar mobile-open"
          : collapsed
          ? "sidebar collapsed"
          : "sidebar"
      }
    >
      <button
        className="toggle-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        <FaBars />
      </button>

      <h2 className="logo">
        {collapsed ? "SC" : "Smart Campus"}
      </h2>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span>{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;