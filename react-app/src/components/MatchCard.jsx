function MatchCard(props) {
  return (
    <div className="match-card">
      <h3>
        Match {props.id}: {props.teams}
      </h3>
      <p>Venue: {props.venue}</p>
      <p>Date: {props.date}</p>
      <p>General: ₹{props.general}</p>
      <p>Premium: ₹{props.premium}</p>
      <p>VIP: ₹{props.vip}</p>
      <a className="match-book-btn" href="#match-form">
        Book Ticket
      </a>
    </div>
  );
}

export default MatchCard;
