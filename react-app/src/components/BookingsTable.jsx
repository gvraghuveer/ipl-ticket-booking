function BookingsTable() {
  return (
    <section id="ticket-bookings">
      <h2>My Ticket Bookings</h2>
      <table border="2">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer</th>
            <th>Match</th>
            <th>Stand</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Date Booked</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </section>
  );
}

export default BookingsTable;
