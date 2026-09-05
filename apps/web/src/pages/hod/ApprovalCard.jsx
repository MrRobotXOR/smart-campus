import "./ApprovalCard.css";

function ApprovalCard({ event, onApprove, onReject }) {

  return (
    <div className="approval-card">

      <img
        src={
          event.image
            ? `http://localhost:5000${event.image}`
            : "https://placehold.co/400x220"
        }
        alt={event.title}
      />

      <div className="approval-content">

        <span className="club-name">{event.club}</span>

        <h3>{event.title}</h3>

        <p>{event.description}</p>

        <div className="event-meta">

          <span>{event.venue}</span>

          <span>
            {new Date(event.date).toLocaleDateString("en-IN")}
          </span>

        </div>

        <div className="approval-actions">

          <button
            className="approve-btn"
            onClick={() => onApprove(event._id)}
          >
            Approve
          </button>

          <button
            className="reject-btn"
            onClick={() => onReject(event._id)}
          >
            Reject
          </button>

        </div>

      </div>

    </div>
  );
}

export default ApprovalCard;