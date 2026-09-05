import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/client";
import "./Participants.css";

function Participants() {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState("");
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const { data } = await api.get("/events/my-events");
      setEvents(data.events);

      if (data.events.length) {
        setSelected(data.events[0]._id);
      }
    };

    loadEvents();
  }, []);

  useEffect(() => {
    if (!selected) return;

    const loadParticipants = async () => {
      const { data } = await api.get(
        `/registrations/${selected}/participants`
      );

      setParticipants(data.participants);
    };

    loadParticipants();
  }, [selected]);

  return (
    <DashboardLayout>
      <h1>Participants</h1>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {events.map((event) => (
          <option key={event._id} value={event._id}>
            {event.title}
          </option>
        ))}
      </select>

      <table className="participants-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Branch</th>
            <th>Email</th>
            <th>Registered</th>
          </tr>
        </thead>

        <tbody>
          {participants.map((item) => (
            <tr key={item._id}>
              <td>{item.student.name}</td>
              <td>{item.student.rollNo}</td>
              <td>{item.student.branch}</td>
              <td>{item.student.email}</td>
              <td>
                {new Date(item.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Participants;