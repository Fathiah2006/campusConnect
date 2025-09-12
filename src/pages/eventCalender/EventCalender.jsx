import React, { useState, useEffect } from "react";
import CalenderHero from "./calenderHero/CalenderHero";
import "./EventCalender.css";

const EventCalender = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");

  // Sample events data
  const sampleEvents = React.useMemo(() => ([
    {
      id: 1,
      title: "Tech Symposium",
      date: new Date(2025, 9, 15),
      category: "Technical",
      description: "Annual technology conference with industry experts",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium",
    },
    {
      id: 2,
      title: "Cultural Festival",
      date: new Date(2023, 9, 22),
      category: "Cultural",
      description: "Celebration of diverse cultures with performances and food",
      time: "12:00 PM - 8:00 PM",
      location: "College Grounds",
    },
    {
      id: 3,
      title: "Sports Day",
      date: new Date(2023, 9, 5),
      category: "Sports",
      description: "Annual inter-department sports competition",
      time: "9:00 AM - 5:00 PM",
      location: "Sports Complex",
    },
    {
      id: 4,
      title: "Hackathon",
      date: new Date(2025, 15, 9),
      category: "Technical",
      description: "24-hour coding competition",
      time: "12:00 PM - 12:00 PM",
      location: "Computer Lab",
    },
    {
      id: 5,
      title: "Music Concert",
      date: new Date(2023, 10, 10),
      category: "Cultural",
      description: "Performance by college bands and artists",
      time: "6:00 PM - 10:00 PM",
      location: "Amphitheater",
    },
    {
      id: 6,
      title: "Alumni Meet",
      date: new Date(2023, 10, 18),
      category: "Community",
      description: "Reunion for alumni from various batches",
      time: "2:00 PM - 6:00 PM",
      location: "Conference Hall",
    },
    {
      id: 7,
      title: "Robotics Workshop",
      date: new Date(2023, 10, 25),
      category: "Technical",
      description: "Hands-on workshop on robotics and automation",
      time: "10:00 AM - 2:00 PM",
      location: "Engineering Block",
    },
    {
      id: 8,
      title: "Basketball Tournament",
      date: new Date(2023, 11, 2),
      category: "Sports",
      description: "Inter-college basketball championship",
      time: "9:00 AM - 6:00 PM",
      location: "Basketball Court",
    }
  ]), []);

  useEffect(() => {
    // In a real app, you would fetch events from an API
    setEvents(sampleEvents);
  }, [sampleEvents]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
  };

  const getEventsForDay = (day) => {
    const dayDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === dayDate.getDate() &&
        eventDate.getMonth() === dayDate.getMonth() &&
        eventDate.getFullYear() === dayDate.getFullYear() &&
        (filterCategory === "All" || event.category === filterCategory)
      );
    });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const isToday =
        day === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();

      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${isToday ? "today" : ""}`}
        >
          <div className="day-number">{day}</div>
          <div className="events-preview">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`event-dot ${event.category.toLowerCase()}`}
                title={event.title}
                onClick={() => handleEventClick(event)}
              ></div>
            ))}
            {dayEvents.length > 2 && (
              <div className="more-events">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Technical":
        return "#db3434";
      case "Cultural":
        return "#3498db";
      case "Sports":
        return "#2ecc71";
      case "Community":
        return "#f39c12";
      default:
        return "#95a5a6";
    }
  };

  // Get upcoming events (next 30 days)
  const getUpcomingEvents = () => {
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setDate(today.getDate() + 30);

    return events
      .filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= nextMonth;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5); // Show only the next 5 events
  };

  const upcomingEvents = getUpcomingEvents();

  return (
    <>
      <CalenderHero/>

      <div className="event-calendar-page" id="calendar-view">
        <div className="calendar-container">
          <div className="calendar-header">
            <h2>Event Calendar</h2>
            <p>Stay updated with all college events and activities</p>
          </div>

          <div className="calendar-controls">
            <div className="month-navigation">
              <button onClick={() => navigateMonth(-1)}>&lt; Prev</button>
              <h3>
                {currentDate.toLocaleString("default", { month: "long" })}{" "}
                {currentDate.getFullYear()}
              </h3>
              <button onClick={() => navigateMonth(1)}>Next &gt;</button>
              <button onClick={navigateToToday} className="today-btn">
                Today
              </button>
            </div>

            <div className="filter-controls">
              <label>Filter by Category:</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Technical">Technical</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
                <option value="Community">Community</option>
              </select>
            </div>
          </div>

          <div className="calendar-weekdays">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="weekday">
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-grid">{renderCalendar()}</div>

          <div className="legend">
            <h4>Legend:</h4>
            <div className="legend-items">
              <div className="legend-item">
                <span className="event-dot technical"></span>
                Technical Events
              </div>
              <div className="legend-item">
                <span className="event-dot cultural"></span>
                Cultural Events
              </div>
              <div className="legend-item">
                <span className="event-dot sports"></span>
                Sports Events
              </div>
              <div className="legend-item">
                <span className="event-dot community"></span>
                Community Events
              </div>
            </div>
          </div>
        </div>

        <div className="upcoming-events-sidebar" id="upcoming-events">
          <h3>Upcoming Events</h3>
          {upcomingEvents.length > 0 ? (
            <div className="upcoming-events-list">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="upcoming-event-item"
                  onClick={() => handleEventClick(event)}
                >
                  <div className="event-date">
                    {new Date(event.date).getDate()}
                    <span>
                      {new Date(event.date).toLocaleString("default", {
                        month: "short",
                      })}
                    </span>
                  </div>
                  <div className="event-info">
                    <h4>{event.title}</h4>
                    <p>
                      {event.time} • {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-upcoming-events">
              No upcoming events in the next 30 days.
            </p>
          )}
        </div>

        {showModal && selectedEvent && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <h3>{selectedEvent.title}</h3>
              <div className="event-details">
                <p>
                  <strong>Date:</strong>{" "}
                  {selectedEvent.date.toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {selectedEvent.time}
                </p>
                <p>
                  <strong>Location:</strong> {selectedEvent.location}
                </p>
                <p>
                  <strong>Category:</strong>
                  <span
                    className="category-badge"
                    style={{
                      backgroundColor: getCategoryColor(selectedEvent.category),
                    }}
                  >
                    {selectedEvent.category}
                  </span>
                </p>
                <p>
                  <strong>Description:</strong> {selectedEvent.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default EventCalender;
