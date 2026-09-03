import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import ApprovalCard from "./ApprovalCard";

import api from "../../api/client";

import "./HodDashboard.css";

function HodDashboard() {

  const [events, setEvents] = useState([]);

  const loadEvents = async () => {

    const { data } = await api.get("/events/pending", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    setEvents(data.events);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const approve = async (id) => {

    await api.patch(`/events/${id}/approve`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    loadEvents();
  };

  const reject = async (id) => {

    await api.patch(`/events/${id}/reject`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    loadEvents();
  };

  return (
    <DashboardLayout>

      <div className="hod-header">

        <h1>Department Approval Panel</h1>

        <p>Review pending events.</p>

      </div>

      <div className="approval-grid">

        {events.map(event => (

          <ApprovalCard
            key={event._id}
            event={event}
            onApprove={approve}
            onReject={reject}
          />

        ))}

      </div>

    </DashboardLayout>
  );
}

export default HodDashboard;