import React from "react";
import "./HeroAbout.css";

const HeroAbout = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-overlay">
          <div className="about-hero-content">
            <h1>
              Welcome to Campus<span>C</span>onnect
            </h1>
            <p className="about-subtitle">
              Affiliated with <strong>CampusConnect</strong> | Located in Lagos, Nigeria
            </p>
            <p className="about-description">
             CampusConnect is your all-in-one platform to explore and stay updated on college events.
              From academic seminars and workshops to sports, cultural fests, and student activities,
               CampusConnect keeps you connected, engaged, and informed every step of the way.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroAbout;
