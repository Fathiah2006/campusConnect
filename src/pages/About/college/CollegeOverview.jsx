import React from "react";
import "./CollegeOverview.css";
import { FaUniversity, FaMapMarkerAlt, FaAward } from "react-icons/fa";

const CollegeOverview = () => {
  return (
    <section className="college-overview">
      <div className="overview-container">
        <h2 className="overview-title">About Our Campus<span>C</span>onnect</h2>
        <p className="overview-intro">
          Campus<span>C</span>onnect represents College of Technology, proudly
          affiliated with <span>Middlesex University</span>. Known for excellence in
          academics, cultural diversity, and innovation, our college provides a
          vibrant environment for both students and guests.
        </p>

        <div className="overview-cards">
          <div className="overview-card">
            <FaUniversity className="overview-icon" />
            <h3>CampusConnect & Affiliation</h3>
            <p>
              CampusConnect, proudly affiliated with Middlesex
              University, offering top-notch education across multiple streams.
            </p>
          </div>

          <div className="overview-card">
            <FaMapMarkerAlt className="overview-icon" />
            <h3>Location</h3>
            <p>
              Situated in Lagos, Nigeria, our campus is at the heart of
              innovation and opportunities, surrounded by a thriving community.
            </p>
          </div>

          <div className="overview-card">
            <FaAward className="overview-icon" />
            <h3>Campus Highlights</h3>
            <p>
              Recognized for excellence in academics, national-level technical
              fests, and cultural achievements, our campus is a hub of growth
              and creativity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollegeOverview;
