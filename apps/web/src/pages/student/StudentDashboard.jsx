import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import StatsCard from "../../components/StatsCard/StatsCard";
import EventCard from "../../components/EventCard/EventCard";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";
import EmptyState from "../../components/EmptyState/EmptyState";

import { getDashboardApi } from "../../api/dashboard.api";
import { getEventsApi } from "../../api/event.api";
import { getCurrentUserApi } from "../../api/auth.api";

import "./StudentDashboard.css";

function StudentDashboard() {
  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    upcomingEvents: 0,
    registeredEvents: 0,
    notifications: 0,
  });

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [userData, dashboardData, eventData] = await Promise.all([
          getCurrentUserApi(),
          getDashboardApi(),
          getEventsApi(),
        ]);

        setUser(userData.user);
        setStats(dashboardData.stats);
        setEvents(eventData.events);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <DashboardLayout>
      {/* Welcome Card */}
      <div className="welcome-card">
        <div>
          <h1>Welcome back, {user?.name || "Student"} 👋</h1>
          <p>
            {user?.branch} • Year {user?.year}
          </p>
        </div>
      </div>

      {/* Real Stats */}
      <div className="stats-grid">
        <StatsCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
        />

        <StatsCard
          title="Registered"
          value={stats.registeredEvents}
        />

        <StatsCard
          title="Notifications"
          value={stats.notifications}
        />
      </div>

      {/* Events */}
      <section className="events-section">
        <h2>Upcoming Events</h2>

        <div className="events-grid">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : events.length === 0 ? (
            <EmptyState />
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