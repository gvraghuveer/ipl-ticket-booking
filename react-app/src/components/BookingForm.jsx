function BookingForm() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section id="match-form">
      <h2>Booking Form</h2>

      <div className="form-container">
        <label htmlFor="team-filter">Filter Team: </label>
        <select id="team-filter">
          <option value="">--Select Team--</option>
          <option value="rcb">RCB</option>
          <option value="csk">CSK</option>
          <option value="kkr">KKR</option>
          <option value="mi">MI</option>
          <option value="dc">DC</option>
        </select>

        <h3>Details:</h3>
        <form id="booking-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            minLength="3"
            maxLength="50"
            placeholder="Enter full name"
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            required
          />

          <label htmlFor="phone-number">Phone Number:</label>
          <input
            type="tel"
            id="phone-number"
            name="phone-number"
            required
            pattern="[0-9]{10}"
            maxLength="10"
            placeholder="10-digit mobile number"
          />

          <label htmlFor="match">Select Match:</label>
          <select id="match" name="select-match" required>
            <option value="">--Select Match--</option>
            <option value="rcb-csk">RCB vs CSK</option>
            <option value="kkr-dc">KKR vs DC</option>
            <option value="mi-rcb">MI vs RCB</option>
            <option value="csk-kkr">CSK vs KKR</option>
            <option value="dc-mi">DC vs MI</option>
          </select>

          <label htmlFor="stand-category">Stand Category:</label>
          <select id="stand-category" name="stand-category" required>
            <option value="">--Select Category--</option>
            <option value="general">General</option>
            <option value="premium">Premium</option>
            <option value="vip">VIP</option>
          </select>

          <label htmlFor="ticket-quantity">Ticket Quantity:</label>
          <input
            type="number"
            id="ticket-quantity"
            name="ticket-quantity"
            min="1"
            max="6"
            placeholder="Max 6 tickets"
            required
          />

          <button type="submit">Book Ticket</button>
          <button type="reset" style={{ marginTop: "8px" }}>
            Reset
          </button>
        </form>
      </div>

      <div className="summary-container">
        <h3>Booking Summary:</h3>
        <p>Match:</p>
        <p>Venue:</p>
        <p>Date & Time:</p>
        <p>Stand Category:</p>
        <p>Ticket Price:</p>
        <p>Quantity:</p>
        <p>Total Amount:</p>
      </div>
    </section>
  );
}

export default BookingForm;
