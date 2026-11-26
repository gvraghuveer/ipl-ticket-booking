import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import MatchCard from "./components/MatchCard";
import BookingForm from "./components/BookingForm";
import BookingsTable from "./components/BookingsTable";
import Guidelines from "./components/Guidelines";
import Footer from "./components/Footer";

function App() {
  const [matches, setMatches] = useState([]);
  const [view, setView] = useState("grid");
  const [teamFilter, setTeamFilter] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  function showToast(message) {
    setToastMessage(message);
    setTimeout(function () {
      setToastMessage("");
    }, 3000);
  }

  async function fetchMatches() {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .order("id");

    if (error) {
      console.log("Error fetching matches:", error);
      return;
    }
    setMatches(data);
  }

  useEffect(function () {
    fetchMatches();

    const channel = supabase
      .channel("matches-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "matches" },
        function () {
          fetchMatches();
        },
      )
      .subscribe();

    return function () {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <>
      <div className={toastMessage ? "toast show" : "toast"}>
        {toastMessage}
      </div>

      <Navbar />

      <main>
        <Hero />
        <About />

        <section id="match-schedule">
          <h2>Match Schedule</h2>

          <div className="view-controls">
            <label htmlFor="schedule-filter">Filter Team:</label>
            <select
              id="schedule-filter"
              value={teamFilter}
              onChange={function (event) {
                setTeamFilter(event.target.value);
                showToast("Match list filtered");
              }}
            >
              <option value="">All Teams</option>
              <option value="rcb">RCB</option>
              <option value="csk">CSK</option>
              <option value="kkr">KKR</option>
              <option value="mi">MI</option>
              <option value="dc">DC</option>
            </select>

            <button
              className={view === "grid" ? "view-btn active" : "view-btn"}
              onClick={function () {
                setView("grid");
                showToast("Grid view");
              }}
            >
              Grid View
            </button>

            <button
              className={view === "list" ? "view-btn active" : "view-btn"}
              onClick={function () {
                setView("list");
                showToast("List view");
              }}
            >
              List View
            </button>
          </div>

          <div id="match-cards" className={"match-cards " + view + "-view"}>
            {matches
              .filter(function (match) {
                return (
                  teamFilter === "" ||
                  match.teams.toLowerCase().includes(teamFilter)
                );
              })
              .map(function (match) {
                return (
                  <MatchCard
                    key={match.id}
                    id={match.id}
                    teams={match.teams}
                    venue={match.venue}
                    date={match.match_date}
                    general={match.general_price}
                    premium={match.premium_price}
                    vip={match.vip_price}
                    seats={match.available_seats}
                    onBook={function () {
                      showToast("Fill in your details!");
                    }}
                  />
                );
              })}
          </div>
        </section>

        <BookingForm matches={matches} showToast={showToast} />
        <BookingsTable />
        <Guidelines />
        <Footer />
      </main>
    </>
  );
}

export default App;
