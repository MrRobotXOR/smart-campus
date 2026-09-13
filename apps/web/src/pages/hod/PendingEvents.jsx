import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ApprovalCard from "./ApprovalCard";
import api from "../../api/client";

function PendingEvents() {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const { data } = await api.get("/events/pending");
    setEvents(data.events);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const approve = async (id) => {
    await api.patch(`/events/${id}/approve`);
    loadEvents();
  };

  const reject = async (id) => {
    await api.patch(`/events/${id}/reject`);
    loadEvents();
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1>Pending Events</h1>
        <p>Events waiting for approval.</p>
      </div>

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
    </DashboardLayout>
  );
}

export default PendingEvents;