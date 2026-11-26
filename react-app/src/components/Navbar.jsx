import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  function toggleMenu() {
    setOpen(!open);
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header>
      <h1>IPL 2026 Ticket Booking</h1>

      <button className="menu-btn" onClick={toggleMenu}>
        ☰
      </button>

      <nav
        className={open ? "navbar open" : "navbar"}
        id="navbar"
        onClick={closeMenu}
      >
        <ul>
          <li>
            <a href="#match-schedule">Matches</a>
          </li>
          <li>
            <a href="#match-form">Book Ticket</a>
          </li>
          <li>
            <a href="#ticket-bookings">My Bookings</a>
          </li>
          <li>
            <a href="#guidelines">Guidelines</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
