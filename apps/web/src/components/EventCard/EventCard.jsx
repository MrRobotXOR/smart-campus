import { Link, useNavigate } from "react-router-dom";
import "./EventCard.css";

function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <div className="event-card">
      <img
        src={`http://localhost:5000${event.image}`}
        alt={event.title}
      />

      <div className="event-content">
        <span className="club-name">{event.club}</span>

        <h3>{event.title}</h3>

        <p>{event.venue}</p>

        <small>
          {new Date(event.date).toLocaleDateString("en-IN")}
        </small>

        <small className="participant-count">
          {event.participants} Participants
        </small>

        <button
          className="register-btn"
          onClick={() => navigate(`/events/${event._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default EventCard;