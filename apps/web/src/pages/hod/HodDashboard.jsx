import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatsCard from "../../components/StatsCard/StatsCard";
import ApprovalCard from "./ApprovalCard";
import api from "../../api/client";
import "./HodDashboard.css";

function HodDashboard() {

  const [events, setEvents] = useState([]);

  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0
  });

  const loadDashboard = async () => {
    try {
      const [{ data: dashboard }, { data: pending }] = await Promise.all([
        api.get("/dashboard/hod"),
        api.get("/events/pending")
      ]);

      setStats(dashboard.stats);
      setEvents(pending.events);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

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

      {/* Header */}

      <div className="hod-header">

        <div>
          <h1>Department Approval Panel</h1>
          <p>Review and manage department events.</p>
        </div>

      </div>

      {/* Summary Cards */}

      <div className="stats-grid">

        <StatsCard
          title="Pending Approval"
          value={stats.pending}
        />

        <StatsCard
          title="Approved Events"
          value={stats.approved}
        />

        <StatsCard
          title="Rejected Events"
          value={stats.rejected}
        />

      </div>

      {/* Pending Event Cards */}

      <section className="approval-section">

        <h2>Pending Events</h2>

        {events.length === 0 ? (

          <div className="empty-card">
            <p>No pending events.</p>
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