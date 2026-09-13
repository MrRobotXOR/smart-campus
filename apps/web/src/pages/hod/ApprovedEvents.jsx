import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ApprovalCard from "./ApprovalCard";
import api from "../../api/client";

function ApprovedEvents() {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const { data } = await api.get("/events/approved");
    setEvents(data.events);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const reject = async (id) => {
    await api.patch(`/events/${id}/reject`);
    loadEvents();
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1>Approved Events</h1>
        <p>Department approved events.</p>
      </div>

      <div className="approval-grid">
        {events.map((event) => (
          <ApprovalCard
            key={event._id}
            event={event}
            onReject={reject}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}

export default ApprovedEvents;