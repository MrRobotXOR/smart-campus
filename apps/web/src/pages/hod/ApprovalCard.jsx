import "./ApprovalCard.css";

function ApprovalCard({
  event,
  onApprove,
  onReject
}) {

  return (
    <div className="approval-card">

      <h3>{event.title}</h3>

      <p>{event.club}</p>

      <p>{event.venue}</p>

      <small>
        {new Date(event.date).toLocaleDateString()}
      </small>

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
  );
}

export default ApprovalCard;