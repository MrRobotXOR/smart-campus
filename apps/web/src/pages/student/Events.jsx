import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import EventCard from "../../components/EventCard/EventCard";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";
import EmptyState from "../../components/EmptyState/EmptyState";
import { getEventsApi } from "../../api/event.api";
import "./StudentDashboard.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getEventsApi();
        setEvents(data.events);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <DashboardLayout>
      <h1>All Approved Events</h1>

      <div className="events-grid">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : events.length ? (
          events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </DashboardLayout>
  );
}

export default Events;