import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getMyEventsApi } from "../../api/event.api";
import api from "../../api/client";
import "./MyEvents.css";

function MyEvents() {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    try {
      const data = await getMyEventsApi();
      setEvents(data.events);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this event?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/events/${id}`);

      setEvents((prev) =>
        prev.filter((event) => event._id !== id)
      );

    } catch (error) {

      console.error(error);

      alert("Delete failed.");

    }

  };

  const statusColor = (status) => {
    if (status === "approved") return "#16a34a";
    if (status === "rejected") return "#dc2626";
    return "#ea580c";
  };

  return (
    <DashboardLayout>

      <h1>My Events</h1>

      <table className="events-table">

        <thead>
          <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Status</th>
            <th>Participants</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {events.length ? (

            events.map((event) => (

              <tr key={event._id}>

                <td>{event.title}</td>

                <td>
                  {new Date(event.date).toLocaleDateString()}
                </td>

                <td>
                  <span
                    style={{
                      color: statusColor(event.status),
                      fontWeight: "600"
                    }}
                  >
                    {event.status}
                  </span>
                </td>

                <td>{event.participants}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(`/club/edit-event/${event._id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(event._id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="5">
                No events found.
              </td>
            </tr>

          )}

        </tbody>

      </table>

    </DashboardLayout>
  );
}

export default MyEvents;