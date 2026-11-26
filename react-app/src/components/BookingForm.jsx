import { useState } from "react";
import { supabase } from "../supabase";

function BookingForm(props) {
  const [bookingTeam, setBookingTeam] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [matchId, setMatchId] = useState("");
  const [stand, setStand] = useState("");
  const [quantity, setQuantity] = useState("");

  // the match the user selected
  const selectedMatch = props.matches.find(function (m) {
    return m.id === Number(matchId);
  });

  // price and total for the summary
  let price = 0;
  if (selectedMatch && stand !== "") {
    price = selectedMatch[stand + "_price"];
  }
  const total = price * Number(quantity);

  function clearForm() {
    setBookingTeam("");
    setName("");
    setEmail("");
    setPhone("");
    setMatchId("");
    setStand("");
    setQuantity("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const qty = Number(quantity);

    if (qty > selectedMatch.available_seats) {
      props.showToast("Not enough seats left for this match");
      return;
    }

    const { error: insertError } = await supabase.from("bookings").insert({
      customer_name: name,
      email: email,
      phone: phone,
      match_id: selectedMatch.id,
      stand: stand,
      quantity: qty,
      total_amount: total,
    });

    if (insertError) {
      props.showToast("Booking failed: " + insertError.message);
      return;
    }

    const { error: updateError } = await supabase
      .from("matches")
      .update({ available_seats: selectedMatch.available_seats - qty })
      .eq("id", selectedMatch.id);

    if (updateError) {
      props.showToast("Seats update failed: " + updateError.message);
      return;
    }

    props.showToast("Ticket booked successfully!");
    clearForm();
  }

  return (
    <section id="match-form">
      <h2>Booking Form</h2>

      <div className="form-container">
        <label htmlFor="team-filter">Filter Team: </label>
        <select
          id="team-filter"
          value={bookingTeam}
          onChange={function (e) {
            setBookingTeam(e.target.value);
            props.showToast("Match list filtered");
          }}
        >
          <option value="">--Select Team--</option>
          <option value="rcb">RCB</option>
          <option value="csk">CSK</option>
          <option value="kkr">KKR</option>
          <option value="mi">MI</option>
          <option value="dc">DC</option>
        </select>

        <h3>Details:</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            minLength="3"
            maxLength="50"
            placeholder="Enter full name"
            required
            value={name}
            onChange={function (e) {
              setName(e.target.value);
            }}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            required
            value={email}
            onChange={function (e) {
              setEmail(e.target.value);
            }}
          />

          <label htmlFor="phone-number">Phone Number:</label>
          <input
            type="tel"
            id="phone-number"
            pattern="[0-9]{10}"
            maxLength="10"
            placeholder="10-digit mobile number"
            required
            value={phone}
            onChange={function (e) {
              setPhone(e.target.value);
            }}
          />

          <label htmlFor="match">Select Match:</label>
          <select
            id="match"
            required
            value={matchId}
            onChange={function (e) {
              setMatchId(e.target.value);
              props.showToast("Booking summary updated");
            }}
          >
            <option value="">--Select Match--</option>
            {props.matches
              .filter(function (m) {
                return (
                  bookingTeam === "" ||
                  m.teams.toLowerCase().includes(bookingTeam)
                );
              })
              .map(function (m) {
                return (
                  <option key={m.id} value={m.id}>
                    {m.teams}
                  </option>
                );
              })}
          </select>

          <label htmlFor="stand-category">Stand Category:</label>
          <select
            id="stand-category"
            required
            value={stand}
            onChange={function (e) {
              setStand(e.target.value);
              props.showToast("Booking summary updated");
            }}
          >
            <option value="">--Select Category--</option>
            <option value="general">General</option>
            <option value="premium">Premium</option>
            <option value="vip">VIP</option>
          </select>

          <label htmlFor="ticket-quantity">Ticket Quantity:</label>
          <input
            type="number"
            id="ticket-quantity"
            min="1"
            max="6"
            placeholder="Max 6 tickets"
            required
            value={quantity}
            onChange={function (e) {
              setQuantity(e.target.value);
            }}
            onBlur={function () {
              props.showToast("Booking summary updated");
            }}
          />

          <button type="submit">Book Ticket</button>
          <button
            type="button"
            style={{ marginTop: "8px" }}
            onClick={clearForm}
          >
            Reset
          </button>
        </form>
      </div>

      <div className="summary-container">
        <h3>Booking Summary:</h3>
        <p>Match: {selectedMatch ? selectedMatch.teams : ""}</p>
        <p>Venue: {selectedMatch ? selectedMatch.venue : ""}</p>
        <p>Date & Time: {selectedMatch ? selectedMatch.match_date : ""}</p>
        <p>Stand Category: {stand}</p>
        <p>Ticket Price: {price > 0 ? "₹" + price : ""}</p>
        <p>Quantity: {quantity}</p>
        <p>Total Amount: {total > 0 ? "₹" + total : ""}</p>
      </div>
    </section>
  );
}

export default BookingForm;
