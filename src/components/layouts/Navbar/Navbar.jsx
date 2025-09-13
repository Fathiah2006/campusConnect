import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navbarRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // Navbar scroll background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close dropdown on mouse leave (desktop only)
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

  // ✅ Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleDropdownToggle = () => {
    if (window.innerWidth <= 768) {
      setDropdownOpen(!dropdownOpen);
    }
  };

  // ✅ Close on link click (mobile)
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} ref={navbarRef}>
        <div className="navbar-container">
          {!isOpen && (
            <div className="logo">
              Campus<span>C</span>onnect
            </div>
          )}

          <ul className={`nav-links ${isOpen ? "open" : ""}`}>
            <li>
              <Link to="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={handleLinkClick}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/events" onClick={handleLinkClick}>
                Event Calendar
              </Link>
            </li>

            <li
              className="dropdown"
              onMouseEnter={() =>
                window.innerWidth > 768 && setDropdownOpen(true)
              }
              onMouseLeave={() =>
                window.innerWidth > 768 && setDropdownOpen(false)
              }
            >
              <button className="dropbtn" onClick={handleDropdownToggle}>
                Event Details <FaChevronDown className="icon" />
              </button>
              {dropdownOpen && (
                <div className="dropdown-content">
                  <Link to="/event-details" onClick={handleLinkClick}>
                    Academic Events
                  </Link>
                  <Link to="/event-details" onClick={handleLinkClick}>
                    Cultural Events
                  </Link>
                  <Link to="/event-details" onClick={handleLinkClick}>
                    Sports Events
                  </Link>
                  <Link to="/event-details" onClick={handleLinkClick}>
                    Departmental Events
                  </Link>
                </div>
              )}
            </li>

            <li>
              <Link to="/register" onClick={handleLinkClick}>
                Registration
              </Link>
            </li>
            <li>
              <Link to="/gallery" onClick={handleLinkClick}>
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/feedback" onClick={handleLinkClick}>
                Feedback
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={handleLinkClick}>
                Contact Us
              </Link>
            </li>
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
