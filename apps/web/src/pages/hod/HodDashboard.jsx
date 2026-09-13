import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import ApprovalCard from "./ApprovalCard";
import api from "../../api/client";
import "./HodDashboard.css";

function HodDashboard() {
  const [activeTab, setActiveTab] = useState("pending");

  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0
  });

  const [events, setEvents] = useState([]);

  const loadDashboard = async () => {
    try {
      const [
        { data: pending },
        { data: approved },
        { data: rejected }
      ] = await Promise.all([
        api.get("/events/pending"),
        api.get("/events/approved"),
        api.get("/events/rejected")
      ]);

      setStats({
        pending: pending.events.length,
        approved: approved.events.length,
        rejected: rejected.events.length
      });

      if (activeTab === "approved") {
        setEvents(approved.events);
      } else if (activeTab === "rejected") {
        setEvents(rejected.events);
      } else {
        setEvents(pending.events);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [activeTab]);

  const approve = async (id) => {
    await api.patch(`/events/${id}/approve`);
    loadDashboard();
  };

  const reject = async (id) => {
    await api.patch(`/events/${id}/reject`);
    loadDashboard();
  };

  return (
    <DashboardLayout>
      {/* ===== Hero ===== */}

      <div className="hod-hero">
        <div>
          <span className="hero-badge">HOD Control Center</span>

          <h1>Department Approval Center</h1>

          <p>
            Review, approve and manage all department events from one place.
          </p>
        </div>
      </div>

      {/* ===== Analytics ===== */}

      <div className="hod-stats">
        <button
          className={`stat-card ${
            activeTab === "pending" ? "active pending" : "pending"
          }`}
          onClick={() => setActiveTab("pending")}
        >
          <h2>{stats.pending}</h2>
          <span>Pending</span>
        </button>

        <button
          className={`stat-card ${
            activeTab === "approved" ? "active approved" : "approved"
          }`}
          onClick={() => setActiveTab("approved")}
        >
          <h2>{stats.approved}</h2>
          <span>Approved</span>
        </button>

        <button
          className={`stat-card ${
            activeTab === "rejected" ? "active rejected" : "rejected"
          }`}
          onClick={() => setActiveTab("rejected")}
        >
          <h2>{stats.rejected}</h2>
          <span>Rejected</span>
        </button>
      </div>

      {/* ===== Events Section ===== */}

      <section className="approval-section">
        <div className="section-header">
          <h2>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Events
          </h2>

          <span>{events.length} events</span>
        </div>

        {events.length === 0 ? (
          <div className="empty-card">
            <h3>No {activeTab} events</h3>

            <p>New events will appear here automatically.</p>
          </div>
        ) : (
          <>
            <div className="approval-grid">
              {events.slice(0, 4).map((event) => (
                <ApprovalCard
                  key={event._id}
                  event={event}
                  onApprove={approve}
                  onReject={reject}
                />
              ))}
            </div>

            <div className="view-all-wrapper">
              <Link
                to={`/hod/${activeTab}`}
                className="view-all-btn"
              >
                View All{" "}
                {activeTab.charAt(0).toUpperCase() +
                  activeTab.slice(1)}{" "}
                →
              </Link>
            </div>
          </>
        )}
      </section>
    </DashboardLayout>
  );
}

export default HodDashboard;