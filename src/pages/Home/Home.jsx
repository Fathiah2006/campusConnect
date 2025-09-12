import React, { useState, useEffect } from "react";
import "./Home.css";

// Timer for the upcoming events
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft]= useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
const [isExpired, setIsExpired] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference >= 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setIsExpired(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  if (isExpired) {
    return (
      <div className="countdown-timer expired">
        <span>Event Started!</span>
      </div>
    );
  }

  return (
    <div className="countdown-timer">
      <div className="time-units">
        <div className="time-unit">
          <span className="time-number">{formatNumber(timeLeft.days)}</span>
          <span className="time-label">Days</span>
        </div>
        <div className="time-unit">
          <span className="time-number">{formatNumber(timeLeft.hours)}</span>
          <span className="time-label">Hours</span>
        </div>
        <div className="time-unit">
          <span className="time-number">{formatNumber(timeLeft.minutes)}</span>
          <span className="time-label">Min</span>
        </div>
        <div className="time-unit">
          <span className="time-number">{formatNumber(timeLeft.seconds)}</span>
          <span className="time-label">Sec</span>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    fetch("/events.json")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.events || []);
        setUpcomingEvents(data.upcoming_events || []);
        setFeaturedEvents(data.feature_events || []);
      })
      .catch((error) => console.error("Error loading events:", error));
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const interval = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % events.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [events]);

  return (
    <div className="homepage">
      {/* Welcome Banner */}
      {featuredEvents.length > 0 && (
        <header
          className="banner"
          style={{
            backgroundImage: `url(./images/${featuredEvents[currentBanner].thumbnail})`,
          }}
        >
          <div className="banner-overlay">
            <div className="banner-text">
              <h1>Welcome to Campus<span>C</span>onnect Event Hub</h1>
              <p>Stay Updated, Stay Involved!</p>
            </div>
          </div>
        </header>
      )}

      {/* upcoming Events */}
      <section className="events-section">
        <h2>Upcoming Events</h2>
        <div className="events-grid">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="event-card">
              <img src={`./images/${event.thumbnail}`} alt={event.title} />
              <h3>{event.title}</h3>
              <p className="date">{event.date}</p>
              <CountdownTimer targetDate={event.date} />
              <p>{event.description}</p>
              <button className="learn-more">Learn More</button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Events */}
      <section className="events-section">
        <h2>Featured Events</h2>
        <div className="events-grid">
          {featuredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <img src={`./images/${event.thumbnail}`} alt={event.title} />
              <h3>{event.title}</h3>
              <p className="date">{event.date}</p>
              <p>{event.description}</p>
              <button className="learn-more">Learn More</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
