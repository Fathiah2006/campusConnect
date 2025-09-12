import React, { useState, useEffect } from "react";
import { MapPin, X } from "lucide-react";
import "./EventCatalog.css";

// Countdown Component
const Countdown = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const eventDate = new Date(date);
      const now = new Date();
      const diff = eventDate - now;

      if (diff <= 0) {
        setTimeLeft("Event Started");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return <span className="countdown">{timeLeft}</span>;
};

const EventCatalog = () => {
  const [eventsData, setEventsData] = useState({ upcoming: [], past: [] });
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("date");
  const [lightboxImg, setLightboxImg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/eventCatalog.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Ensure data has the expected structure with default empty arrays
        setEventsData({
          upcoming: data.upcoming || [],
          past: data.past || [],
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading events:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Show loading state
  if (loading) {
    return <div className="event-section">Loading events...</div>;
  }

  // Show error state
  if (error) {
    return <div className="event-section">Error loading events: {error}</div>;
  }

  const { upcoming, past } = eventsData;
  let allEvents = [...upcoming, ...past];

  // Filter by category
  if (filter !== "All") {
    allEvents = allEvents.filter((event) => event.category === filter);
  }

  // Sort logic
  if (sort === "date") {
    allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sort === "name") {
    allEvents.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "category") {
    allEvents.sort((a, b) => a.category.localeCompare(b.category));
  }

  return (
    <section className="event-section">
      {/* Upcoming Events */}
      <h2>Upcoming Events</h2>
      {upcoming.length > 0 ? (
        <div className="event-grid">
          {upcoming.map((event) => (
            <div className="event-card" key={event.id}>
              <img
                src={event.venueImage}
                alt={event.venue}
                className="venue-img"
                onClick={() => setLightboxImg(event.venueImage)}
              />
              <h3>{event.name}</h3>
              <p className="date">
                {new Date(event.date).toLocaleString()}{" "}
                <Countdown date={event.date} />
              </p>
              <p className="venue">
                <MapPin size={16} /> {event.venue}
              </p>
              <p>{event.description}</p>
              <span className="tag">{event.category}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No upcoming events found.</p>
      )}

      {/* Past Events */}
      <h2>Past Events</h2>
      {past.length > 0 ? (
        <div className="event-grid past-grid">
          {past.map((event) => (
            <div className="event-card" key={event.id}>
              <img
                src={event.venueImage}
                alt={event.venue}
                className="venue-img"
                onClick={() => setLightboxImg(event.venueImage)}
              />
              <h3>{event.name}</h3>
              <p className="date">{new Date(event.date).toLocaleString()}</p>
              <p className="venue">
                <MapPin size={16} /> {event.venue}
              </p>
              <p>{event.description}</p>
              <span className="tag">{event.category}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No past events found.</p>
      )}

      {/* Event Catalog */}
      <h2>Event Catalog</h2>
      <div className="tabs">
        {["All", "Academic", "Cultural", "Sports", "Departmental"].map(
          (cat) => (
            <button
              key={cat}
              className={`tab ${filter === cat ? "active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          )
        )}
      </div>

      <div className="sort-buttons">
        <button onClick={() => setSort("date")}>Sort by Date</button>
        <button onClick={() => setSort("name")}>Sort by Name</button>
        <button onClick={() => setSort("category")}>Sort by Category</button>
      </div>

      {allEvents.length > 0 ? (
        <div className="event-grid">
          {allEvents.map((event) => (
            <div className="event-card" key={event.id}>
              <img
                src={event.venueImage}
                alt={event.venue}
                className="venue-img"
                onClick={() => setLightboxImg(event.venueImage)}
              />
              <h3>{event.name}</h3>
              <p className="date">{new Date(event.date).toLocaleString()}</p>
              <p className="venue">
                <MapPin size={16} /> {event.venue}
              </p>
              <p>{event.description}</p>
              <span className="tag">{event.category}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No events found for the selected filter.</p>
      )}

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="lightbox" onClick={() => setLightboxImg(null)}>
          <button
            className="lightbox-close"
            onClick={() => setLightboxImg(null)}
          >
            <X size={28} />
          </button>
          <img src={lightboxImg} alt="Venue Large" className="lightbox-img" />
        </div>
      )}
    </section>
  );
};

export default EventCatalog;
