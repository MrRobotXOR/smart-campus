import "./StatsCard.css";

function StatsCard({ title, value }) {
  return (
    <div className="stats-card">

      <h4>{title}</h4>

      <h2>{value}</h2>

    </div>
  );
}

export default StatsCard;