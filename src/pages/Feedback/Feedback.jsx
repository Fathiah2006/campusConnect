import React, { useState } from "react";
import { FaStar } from "react-icons/fa"; // star icons
import "./Feedback.css";

const Feedback = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    userType: "",
    event: "",
    rating: 0,
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (ratingValue) => {
    setForm((prev) => ({ ...prev, rating: ratingValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing feedbacks from localStorage
    const existingFeedback =
      JSON.parse(localStorage.getItem("feedbacks")) || [];

    // Add new feedback
    const newFeedbacks = [...existingFeedback, form];

    // Save back to localStorage
    localStorage.setItem("feedbacks", JSON.stringify(newFeedbacks));

    // Reset form (no alert, just silent save)
    setForm({
      name: "",
      email: "",
      userType: "",
      event: "",
      rating: 0,
      comments: "",
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>We Value Your Feedback</h1>
          <p>
            Help us improve by sharing your thoughts on the events and
            activities you attended.
          </p>
        </div>
      </section>

      {/* Feedback Form */}
      <div className="feedback-container">
        <h2>Feedback Form</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          {/* Name */}
          <div className="form-row">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="form-row">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={form.email}
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              onChange={handleChange}
            />
          </div>

          {/* User Type */}
          <div className="form-row">
            <label>User Type:</label>
            <select
              name="userType"
              value={form.userType}
              onChange={handleChange}
              required
            >
              <option value="">-- Select User Type --</option>
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
              <option value="Guest">Guest</option>
            </select>
          </div>

          {/* Event Attended */}
          <div className="form-row">
            <label>Event Attended:</label>
            <select
              name="event"
              value={form.event}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Event --</option>
              <option value="Cultural">Cultural</option>
              <option value="Academic">Academic</option>
              <option value="Tech Fest">Tech Fest</option>
              <option value="Technical">Technical</option>
            </select>
          </div>

          {/* Rating (Stars) */}
          <div className="form-row">
            <label>Rating:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={30}
                  className={star <= form.rating ? "star selected" : "star"}
                  onClick={() => handleRating(star)}
                />
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="form-row">
            <label>Comments:</label>
            <textarea
              name="comments"
              placeholder="Write your feedback here..."
              required
              value={form.comments}
              onChange={handleChange}
            />
          </div>

          {/* Submit button */}
          <div className="form-row button-row">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
