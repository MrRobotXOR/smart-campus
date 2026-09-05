import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getDashboardApi } from "../../api/dashboard.api";

function Notifications() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDashboardApi();
        setCount(data.stats.notifications);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, []);

  return (
    <DashboardLayout>
      <h1>Notifications</h1>

      <p>Total Notifications: {count}</p>

      {count === 0 && (
        <p>No notifications yet.</p>
      )}
    </DashboardLayout>
  );
}

export default Notifications;