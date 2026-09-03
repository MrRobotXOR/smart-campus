import DashboardLayout from "../../layouts/DashboardLayout";
import StatsCard from "../../components/StatsCard/StatsCard";
import "./ClubDashboard.css";

function ClubDashboard(){

  return(

    <DashboardLayout>

      <div className="club-header">

        <h1>Coding Club Dashboard</h1>

        <p>Manage your events and participants.</p>

      </div>

      <div className="stats-grid">

        <StatsCard title="Total Events" value="8"/>
        <StatsCard title="Participants" value="324"/>
        <StatsCard title="Pending Approval" value="2"/>

      </div>

    </DashboardLayout>

  );

}

export default ClubDashboard;