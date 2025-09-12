import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    phone: "",
    address: "",
    userType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Add new user
    const newUsers = [...existingUsers, form];

    // Save to localStorage
    localStorage.setItem("users", JSON.stringify(newUsers));

    // Reset form
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      dob: "",
      phone: "",
      address: "",
      userType: "",
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Create Your Account</h1>
          <p>
            Join our community today! Fill out the registration form below to
            get started.
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <div className="registration-container">
        <h2>Registration Form</h2>
        <form className="registration-form" onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="form-row">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              required
              value={form.firstName}
              onChange={handleChange}
            />
          </div>

          {/* Last Name */}
          <div className="form-row">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              required
              value={form.lastName}
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
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="form-row">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password */}
          <div className="form-row">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              required
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Gender */}
          <div className="form-row">
            <label>Gender:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={form.gender === "Male"}
                  required
                  onChange={handleChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={form.gender === "Female"}
                  onChange={handleChange}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={form.gender === "Other"}
                  onChange={handleChange}
                />
                Other
              </label>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="form-row">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              required
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div className="form-row">
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={form.phone}
              required
              pattern="[0-9]{11}"
              onChange={handleChange}
            />
          </div>

          {/* Address */}
          <div className="form-row">
            <label>Address:</label>
            <textarea
              name="address"
              placeholder="Enter your address"
              required
              value={form.address}
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
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Submit */}
          <div className="form-row button-row">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
