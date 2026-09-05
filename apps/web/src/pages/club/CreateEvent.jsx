import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/client";
import Toast from "../../components/Toast/Toast";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import "./CreateEvent.css";

function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    club: "Coding Club",
    date: "",
    venue: "",
  });

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (image) {
        formData.append("image", image);
      }

      // Token client.js interceptor automatically bhejega
      await api.post("/events", formData);

      setToast({
        message: "Event created and sent to HOD for approval",
        type: "success",
      });

      setForm({
        title: "",
        description: "",
        club: "Coding Club",
        date: "",
        venue: "",
      });

      setImage(null);
      setPreview("");
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Something went wrong",
        type: "error",
      });

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="create-event-card">
        <Toast {...toast} />

        <h1>Create Event</h1>

        <form onSubmit={handleSubmit} className="event-form">
          <input
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Event Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            name="club"
            placeholder="Club Name"
            value={form.club}
            onChange={handleChange}
            required
          />

          <input
            name="venue"
            placeholder="Venue"
            value={form.venue}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <ImageUpload
            preview={preview}
            onChange={handleImage}
          />

          <button disabled={loading}>
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default CreateEvent;