import React from "react";
import "./CalenderHero.css";

const CalenderHero = () => {
  return (
    <section className="event-calendar-hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Event Calendar</h1>
        <p className="hero-subtitle">
          Plan Your Participation, Never Miss an Event
        </p>
        <p className="hero-description">
          Stay updated with all upcoming college events, competitions, and
          activities. Mark your calendar and prepare for the exciting events
          throughout the academic year.
        </p>
        <div className="hero-cta">
          <a href="#calendar-view" className="cta-button">
            View Calendar
          </a>
          <a href="#upcoming-events" className="cta-button secondary">
            Upcoming Events
          </a>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <span>Scroll Down</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default CalenderHero;
