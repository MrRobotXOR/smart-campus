import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/client";
import "./CreateEvent.css";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    club: "",
    venue: "",
    date: ""
  });

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const { data } = await api.get(`/events/${id}`);

        setForm({
          title: data.event.title,
          description: data.event.description,
          club: data.event.club,
          venue: data.event.venue,
          date: data.event.date.split("T")[0]
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadEvent();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.put(`/events/${id}`, form);

      alert("Event updated successfully.");

      navigate("/club/events");
    } catch (error) {
      console.error(error);
      alert("Update failed.");
    }

    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="create-event-card">
        <h1>Edit Event</h1>

        <form onSubmit={handleSubmit} className="event-form">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Event Title"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <input
            name="club"
            value={form.club}
            onChange={handleChange}
            placeholder="Club"
          />

          <input
            name="venue"
            value={form.venue}
            onChange={handleChange}
            placeholder="Venue"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <button disabled={loading}>
            {loading ? "Updating..." : "Update Event"}
          </button>

        </form>
      </div>
    </DashboardLayout>
  );
}

export default EditEvent;