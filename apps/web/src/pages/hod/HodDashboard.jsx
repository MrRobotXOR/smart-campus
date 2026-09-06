import { useEffect, useState } from "react";
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

      switch (activeTab) {
        case "approved":
          setEvents(approved.events);
          break;

        case "rejected":
          setEvents(rejected.events);
          break;

        default:
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

      <div className="hod-hero">

        <div>
          <h1>Department Approval Center</h1>
          <p>
            Review, approve and manage all department events.
          </p>
        </div>

      </div>

      <div className="hod-stats">

        <button
          className={activeTab === "pending" ? "stat-card active pending" : "stat-card"}
          onClick={() => setActiveTab("pending")}
        >
          <h2>{stats.pending}</h2>
          <span>Pending</span>
        </button>

        <button
          className={activeTab === "approved" ? "stat-card active approved" : "stat-card"}
          onClick={() => setActiveTab("approved")}
        >
          <h2>{stats.approved}</h2>
          <span>Approved</span>
        </button>

        <button
          className={activeTab === "rejected" ? "stat-card active rejected" : "stat-card"}
          onClick={() => setActiveTab("rejected")}
        >
          <h2>{stats.rejected}</h2>
          <span>Rejected</span>
        </button>

      </div>

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

            <p>
              New events will appear here automatically.
            </p>

          </div>

        ) : (

          <div className="approval-grid">

            {events.map((event) => (

              <ApprovalCard
                key={event._id}
                event={event}
                onApprove={approve}
                onReject={reject}
              />

            ))}

          </div>

        )}

      </section>

    </DashboardLayout>
  );
}

export default HodDashboard;