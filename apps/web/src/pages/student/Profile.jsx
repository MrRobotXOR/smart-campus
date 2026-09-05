import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getCurrentUserApi } from "../../api/auth.api";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getCurrentUserApi();
        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, []);

  return (
    <DashboardLayout>
      <div className="profile-card">
        <img
          src={`https://ui-avatars.com/api/?name=${user?.name}`}
          alt="Profile"
        />

        <h2>{user?.name}</h2>

        <p>{user?.email}</p>

        <div className="profile-info">
          <p><strong>Role:</strong> {user?.role}</p>
          <p><strong>Branch:</strong> {user?.branch}</p>
          <p><strong>Year:</strong> {user?.year}</p>
          <p><strong>Roll No:</strong> {user?.rollNo}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;