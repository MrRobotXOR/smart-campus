import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ApprovalCard from "./ApprovalCard";
import api from "../../api/client";

function RejectedEvents() {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const { data } = await api.get("/events/rejected");
    setEvents(data.events);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const approve = async (id) => {
    await api.patch(`/events/${id}/approve`);
    loadEvents();
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1>Rejected Events</h1>
        <p>Rejected department events.</p>
      </div>

      <div className="approval-grid">
        {events.map((event) => (
          <ApprovalCard
            key={event._id}
            event={event}
            onApprove={approve}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}

export default RejectedEvents;