import React, { useState, useRef, useEffect } from "react";
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
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#calendar">Event Calendar</a></li>

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
                <a href="#academic">Academic Events</a>
                <a href="#cultural">Cultural Events</a>
                <a href="#sports">Sports Events</a>
                <a href="#department">Departmental Events</a>
              </div>
            )}
          </li>
          <li><a href="#registration">Registration</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#feedback">Feedback</a></li>
          <li><a href="#contact">Contact Us</a></li>
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
