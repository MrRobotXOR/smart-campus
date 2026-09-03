import DashboardLayout from "../layouts/DashboardLayout";
import StatsCard from "../components/StatsCard/StatsCard";
import "./Dashboard.css";
function Dashboard() {

  return (
    <DashboardLayout>

      <div className="stats-grid">

        <StatsCard
          title="Upcoming Events"
          value="12"
        />

        <StatsCard
          title="Registered"
          value="5"
        />

        <StatsCard
          title="Notifications"
          value="8"
        />

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;