import { Link } from "react-router-dom";
import "./EventCard.css";

function EventCard({ event }) {
  return (
    <Link to={`/events/${event._id}`} className="event-card">
      <img
        src={event.image || "https://placehold.co/400x220"}
        alt={event.title}
      />

      <div className="event-content">
        <span className="club-name">{event.club}</span>

        <h3>{event.title}</h3>

        <p>{event.venue}</p>

        <small>{new Date(event.date).toLocaleDateString()}</small>

        <small className="participant-count">
          {event.participants || 0} Participants
        </small>

        <button
          className="register-btn"
          onClick={(e) => {
            e.preventDefault();
            // Registration API next step me connect karenge
          }}
        >
          Register
        </button>
      </div>
    </Link>
  );
}

export default EventCard;