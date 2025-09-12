import React, { useEffect, useState } from "react";
import "./AnnualEvents.css";

const AnnualEvents = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState("grid");

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.annual_events || []);
      })
      .catch((err) => console.error("Error loading events:", err));
  }, []);

  const monthsOrder = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const filteredEvents = events.filter((event) => {
    return filter === "All" || event.category === filter;
  });

  const sortedEvents = [...filteredEvents].sort(
    (a, b) => monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month)
  );

  return (
    <section className="annual-events">
      <div className="events-container">
        <h3 className="events-title">Annual Events</h3>

        <div className="events-filters">
          {["All", "Technical", "Cultural", "Sports", "Community"].map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? "active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="view-toggle">
          <button
            className={view === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
          >
            Grid View
          </button>
          <button
            className={view === "timeline" ? "active" : ""}
            onClick={() => setView("timeline")}
          >
            Timeline View
          </button>
        </div>

        {view === "grid" ? (
          <div className="events-grid">
            {sortedEvents.map((event) => (
              <div key={event.id} className="event-card">
                <img src={event.image} alt={event.title} />
                <h4>{event.title}</h4>
                <p className="event-category">
                  {event.category} • {event.month}
                </p>
                <p className="event-description">{event.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="timeline">
            {sortedEvents.map((event) => (
              <div key={event.id} className="timeline-item">
                <div className="timeline-date">{event.month}</div>
                <div className="timeline-content">
                  <h4>{event.title}</h4>
                  <p className="event-category">{event.category}</p>
                  <p>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AnnualEvents;
