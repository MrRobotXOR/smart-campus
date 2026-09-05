import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getEventByIdApi,
  registerEventApi,
} from "../../api/event.api";

function EventDetail() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getEventByIdApi(id);
        setEvent(data.event);
      } catch (error) {
        console.error("Failed to load event:", error);
      }
    };

    load();
  }, [id]);

  const handleRegister = async () => {
    try {
      await registerEventApi(id);

      // UI ko immediately update karo
      setEvent((prev) => ({
        ...prev,
        isRegistered: true,
      }));

      alert("Registration Successful");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  if (!event) {
    return <DashboardLayout>Loading...</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <h1>{event.title}</h1>

      <p>{event.club}</p>

      <p>{event.description}</p>

      <p>{event.venue}</p>

      <p>{new Date(event.date).toLocaleDateString()}</p>

      <button
        disabled={event.isRegistered}
        onClick={handleRegister}
      >
        {event.isRegistered
          ? "Already Registered"
          : "Register Now"}
      </button>
    </DashboardLayout>
  );
}

export default EventDetail;