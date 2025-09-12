import React, { useState } from "react";
import { Mail, Phone, MapPin, User, MessageSquare, Send } from "lucide-react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  // Retrieve existing messages from localStorage or initialize empty array
  const existingMessages =
    JSON.parse(localStorage.getItem("contactMessages")) || [];
  // Add new message
  const newMessage = {
    name: formData.name,
    email: formData.email,
    message: formData.message,
    submittedAt: new Date().toISOString(),
  };
  localStorage.setItem(
    "contactMessages",
    JSON.stringify([...existingMessages, newMessage])
  );

  setFormData({ name: "", email: "", message: "" });
};


  const facultyContacts = [
    {
      name: "Dr. Sarah Johnson",
      designation: "Professor & Event Coordinator",
      department: "Computer Science",
      phone: "+1 (555) 123-4567",
      email: "s.johnson@university.edu",
    },
    {
      name: "Prof. Michael Chen",
      designation: "Associate Professor",
      department: "Student Affairs",
      phone: "+1 (555) 987-6543",
      email: "m.chen@university.edu",
    },
  ];

  const studentContacts = [
    {
      name: "Alex Rodriguez",
      designation: "Student Coordinator",
      department: "Computer Science",
      phone: "+1 (555) 456-7890",
      email: "alex.rodriguez@student.university.edu",
    },
    {
      name: "Jessica Williams",
      designation: "Event Manager",
      department: "Business Administration",
      phone: "+1 (555) 321-0987",
      email: "j.williams@student.university.edu",
    },
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Get in Touch</h1>
          <p>
            Reach out to our faculty and student coordinators for any questions
            about campus events and activities.
          </p>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="contact-map-section">
        <div className="container">
          <h2>Contact Us</h2>

          <div className="contact-map-grid">
            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="glass-card">
                <h3>Send us a Message</h3>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <div className="input-with-icon">
                      <div className="icon-container">
                        <User className="icon" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <div className="input-with-icon">
                      <div className="icon-container">
                        <Mail className="icon" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <div className="input-with-icon textarea-container">
                      <div className="icon-container">
                        <MessageSquare className="icon" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Type your message here..."
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="submit-button">
                    <Send className="button-icon" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Google Map */}
            <div className="map-container">
              <div className="glass-card">
                <div className="map-header">
                  <h3>Our Location</h3>
                  <p className="address">
                    <MapPin className="address-icon" />
                    123 University Avenue, Campus Town, CT 54321
                  </p>
                </div>
                <div className="map-embed">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1840523710886!2d-73.9876141845932!3d40.75831467932678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855b8fb3083%3A0xa0f9aef176042a5c!2sGrand%20Central%20Terminal!5e0!3m2!1sen!2sus!4v1643037412362!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Campus Location Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Contacts Section */}
      <section className="contacts-section faculty-section">
        <div className="container">
          <h2>Faculty Coordinators</h2>
          <p className="section-description">
            Our dedicated faculty members who organize and oversee campus events
            throughout the year.
          </p>

          <div className="contacts-grid">
            {facultyContacts.map((contact, index) => (
              <div key={index} className="contact-card glass-card">
                <h3>{contact.name}</h3>
                <p className="designation">{contact.designation}</p>
                <p className="department">{contact.department}</p>
                <div className="contact-details">
                  <p className="phone">
                    <Phone className="detail-icon" />
                    {contact.phone}
                  </p>
                  <p className="email">
                    <Mail className="detail-icon" />
                    {contact.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Contacts Section */}
      <section className="contacts-section student-section">
        <div className="container">
          <h2>Student Coordinators</h2>
          <p className="section-description">
            Our enthusiastic student coordinators who help plan and execute
            campus events and activities.
          </p>

          <div className="contacts-grid">
            {studentContacts.map((contact, index) => (
              <div key={index} className="contact-card glass-card">
                <h3>{contact.name}</h3>
                <p className="designation">{contact.designation}</p>
                <p className="department">{contact.department}</p>
                <div className="contact-details">
                  <p className="phone">
                    <Phone className="detail-icon" />
                    {contact.phone}
                  </p>
                  <p className="email">
                    <Mail className="detail-icon" />
                    {contact.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
