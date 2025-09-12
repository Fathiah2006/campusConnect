import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);    
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const navbarRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);


useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }       
}, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleMouseLeave = () => {
      if (window.innerWidth > 768) {
        setDropdownOpen(false);
      }
    };

    const navbar = navbarRef.current;
    if (navbar) {
      navbar.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (navbar) {
        navbar.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const handleDropdownToggle = () => {
    if (window.innerWidth <= 768) {
      setDropdownOpen(!dropdownOpen);
    }
  };

  return (
    <div>
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} ref={navbarRef}>
      <div className="navbar-container">
       {!isOpen && <div className="logo">Campus<span>C</span>onnect</div>}

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/events">Event Calendar</Link></li>

          <li
            className="dropdown"
            onMouseEnter={() => window.innerWidth > 768 && setDropdownOpen(true)}
            onMouseLeave={() => window.innerWidth > 768 && setDropdownOpen(false)}
          >
            <button className="dropbtn" onClick={handleDropdownToggle}>
              Event Details <FaChevronDown className="icon" />
            </button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <Link to="/event-details">Academic Events</Link>
                <Link to="/event-details">Cultural Events</Link>
                <Link to="/event-details">Sports Events</Link>
                <Link to="/event-details">Departmental Events</Link>
              </div>
            )}
          </li>
          <li><Link to="/register">Registration</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>

        <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
