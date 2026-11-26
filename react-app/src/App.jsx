import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import MatchCard from "./components/MatchCard";
import BookingForm from "./components/BookingForm";
import BookingsTable from "./components/BookingsTable";
import Guidelines from "./components/Guidelines";
import Footer from "./components/Footer";
import matches from "./data/matches";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />

        <section id="match-schedule">
          <h2>Match Schedule</h2>

          <div id="match-cards" className="match-cards">
            {matches.map(function (match) {
              return (
                <MatchCard
                  key={match.id}
                  id={match.id}
                  teams={match.teams}
                  venue={match.venue}
                  date={match.date}
                  general={match.general}
                  premium={match.premium}
                  vip={match.vip}
                />
              );
            })}
          </div>
        </section>

        <BookingForm />
        <BookingsTable />
        <Guidelines />
        <Footer />
      </main>
    </>
  );
}

export default App;
