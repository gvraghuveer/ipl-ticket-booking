function MatchCard(props) {
  function handleClick(e) {
    e.preventDefault();

    document
      .getElementById("match-form")
      .scrollIntoView({ behavior: "smooth" });

    props.onBook();
  }

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
      <p>Seats left: {props.seats}</p>
      <a className="match-book-btn" href="#match-form" onClick={handleClick}>
        Book Ticket
      </a>
    </div>
  );
}

export default MatchCard;
