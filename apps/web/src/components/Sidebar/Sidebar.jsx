import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaCalendarAlt,
  FaBell,
  FaUser,
  FaPlusCircle,
  FaUsers,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";

import { getUser } from "../../store/authStore";
import "./Sidebar.css";

function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen
}) {
  const user = getUser();

  // Reusable role-based navigation
  const menus = {
    student: [
      { icon: <FaHome />, label: "Dashboard", path: "/dashboard" },
      { icon: <FaCalendarAlt />, label: "Events", path: "/events" },
      { icon: <FaBell />, label: "Notifications", path: "/notifications" },
      { icon: <FaUser />, label: "Profile", path: "/profile" }
    ],

    club_head: [
      { icon: <FaHome />, label: "Dashboard", path: "/club/dashboard" },
      { icon: <FaPlusCircle />, label: "Create Event", path: "/club/create-event" },
      { icon: <FaCalendarAlt />, label: "My Events", path: "/club/events" },
      { icon: <FaUsers />, label: "Participants", path: "/club/participants" }
    ],

    hod: [
      { icon: <FaHome />, label: "Dashboard", path: "/hod/dashboard" },
      { icon: <FaClipboardList />, label: "Pending", path: "/hod/pending" },
      { icon: <FaCheckCircle />, label: "Approved", path: "/hod/approved" },
      { icon: <FaTimesCircle />, label: "Rejected", path: "/hod/rejected" },
      { icon: <FaCalendarAlt />, label: "Reports", path: "/hod/reports" }
    ]
  };

  const menuItems = menus[user?.role] || menus.student;

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
      {/* Toggle */}
      <button
        className="toggle-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        <FaBars />
      </button>

      {/* Logo */}
      <div className="logo-wrapper">
        <h2 className="logo">
          {collapsed ? "SC" : "Smart Campus"}
        </h2>

        {!collapsed && (
          <span className="logo-role">
            {user?.role?.replace("_", " ").toUpperCase()}
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span className="menu-icon">
              {item.icon}
            </span>

            {!collapsed && (
              <>
                <span className="menu-label">
                  {item.label}
                </span>

                {item.badge !== undefined && (
                  <span className="menu-badge">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="sidebar-footer">
          <small>{user?.email}</small>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;