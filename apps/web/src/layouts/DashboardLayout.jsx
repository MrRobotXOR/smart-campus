import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import "./DashboardLayout.css";

function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="dashboard-layout">
      <Sidebar
  collapsed={collapsed}
  setCollapsed={setCollapsed}
  mobileOpen={mobileOpen}
  setMobileOpen={setMobileOpen}
/>

      <div className="dashboard-main">
        <Navbar setMobileOpen={setMobileOpen}/>

        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;