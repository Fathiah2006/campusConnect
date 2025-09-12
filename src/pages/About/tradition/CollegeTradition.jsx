import React from "react";
import "./CollegeTradition.css";
import { FaUsers, FaRegSmileBeam, FaHandsHelping } from "react-icons/fa";

const CollegeTradition = () => {
  return (
    <section className="college-traditions">
      <div className="traditions-container">
        <h2 className="traditions-title">Our Traditions</h2>
        <p className="traditions-intro">
          At CampusConnect, we celebrate not only learning but also community
          spirit. Our traditions bring together students, faculty, and alumni to
          create memories and foster lifelong bonds.
        </p>

        <div className="traditions-cards">
          <div className="tradition-card">
            <FaUsers className="tradition-icon" />
            <h3>Freshers’ Welcome</h3>
            <p>
              A long-standing tradition to warmly welcome new students with
              performances, games, and bonding activities.
            </p>
          </div>

          <div className="tradition-card">
            <FaRegSmileBeam className="tradition-icon" />
            <h3>Annual Cultural Night</h3>
            <p>
              An evening of music, dance, and drama showcasing the talents of
              our diverse student body.
            </p>
          </div>

          <div className="tradition-card">
            <FaHandsHelping className="tradition-icon" />
            <h3>Community Service</h3>
            <p>
              Students and faculty come together every semester to participate
              in blood donation drives and social outreach.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollegeTradition;
