import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function BookingsTable() {
  const [bookings, setBookings] = useState([]);

  async function fetchBookings() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, matches(teams)")
      .order("id", { ascending: false });

    if (error) {
      console.log("Error fetching bookings:", error);
      return;
    }
    setBookings(data);
  }

  useEffect(function () {
    fetchBookings();

    const channel = supabase
      .channel("bookings-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        function () {
          fetchBookings();
        },
      )
      .subscribe();

    return function () {
      supabase.removeChannel(channel);
    };
  }, []);

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
        <tbody>
          {bookings.map(function (b) {
            return (
              <tr key={b.id}>
                <td>BK{b.id}</td>
                <td>{b.customer_name}</td>
                <td>{b.matches ? b.matches.teams : ""}</td>
                <td>{b.stand}</td>
                <td>{b.quantity}</td>
                <td>₹{b.total_amount}</td>
                <td>{new Date(b.created_at).toLocaleDateString()}</td>
                <td>Confirmed</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default BookingsTable;
