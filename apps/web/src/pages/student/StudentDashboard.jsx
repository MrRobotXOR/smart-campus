import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatsCard from "../../components/StatsCard/StatsCard";
import EventCard from "../../components/EventCard/EventCard";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";
import { getUser } from "../../store/authStore";
import { getEventsApi } from "../../api/event.api";
import "./StudentDashboard.css";

function StudentDashboard() {
  const user = getUser();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getEventsApi();
        setEvents(data.events);
      } catch (error) {
        console.error("Failed to load events:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <DashboardLayout>
      <div className="welcome-card">
        <div>
          <h1>Welcome back, {user?.name || "Student"} 👋</h1>
          <p>Here's what's happening in your campus today.</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatsCard title="Upcoming Events" value="12" />
        <StatsCard title="Registered" value="5" />
        <StatsCard title="Notifications" value="8" />
      </div>

      <section className="events-section">
        <h2>Upcoming Events</h2>

        <div className="events-grid">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
              />
            ))
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}

export default StudentDashboard;