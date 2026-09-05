import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatsCard from "../../components/StatsCard/StatsCard";
import { getMyEventsApi } from "../../api/event.api";
import "./ClubDashboard.css";

function ClubDashboard() {

  const [stats, setStats] = useState({
    totalEvents:0,
    participants:0,
    pending:0
  });

  useEffect(() => {

    const load = async () => {

      try{

        const data = await getMyEventsApi();

        const total = data.events.length;

        const pending = data.events.filter(
          e=>e.status==="pending"
        ).length;

        const participants = data.events.reduce(
          (sum,e)=>sum+(e.participants||0),
          0
        );

        setStats({
          totalEvents:total,
          participants,
          pending
        });

      }catch(error){

        console.error(error);

      }

    };

    load();

  }, []);

  return (

    <DashboardLayout>

      <div className="club-header">

        <h1>Coding Club Dashboard</h1>

        <p>Manage your events and participants.</p>

      </div>

      <div className="stats-grid">

        <StatsCard
          title="Total Events"
          value={stats.totalEvents}
        />

        <StatsCard
          title="Participants"
          value={stats.participants}
        />

        <StatsCard
          title="Pending Approval"
          value={stats.pending}
        />

      </div>

    </DashboardLayout>

  );

}

export default ClubDashboard;