import React from 'react'
import { Link } from "react-router-dom";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "./Footer.css"

const Footer = () => {
  return (
    <div>
        <div className="footer">
            <div className="footer-container">
                <div className="footer-about">
                    <div className="footer-logo">
                      <h2>Campus<span>C</span>onnect</h2>
                        <p>Your one-stop solution for campus connectivity, Stay Updated, Stay Involved!!!!</p>
                    
                    <div className="footer-social">
                         <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
                    </div>
                    </div>
                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/">HOME</Link></li>
                            <li><Link to="/about">ABOUT</Link></li>
                              <li><Link to="/events">Event Calendar</Link></li>
                            <li><Link to="/event-details">EVENT DETAILS </Link></li>
          <                  li><Link to="/register">Registration</Link></li>
                             <li><Link to="/gallery">Gallery</Link></li>
                              <li><Link to="/feedback">Feedback</Link></li>
                              <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="footer-event details">
                        <h3>EVENT DETAILS</h3>
                        <ul>
                            <li><Link to="/event-details">Academic Events</Link></li>
                            <li><Link to="/event-details">Cultural Events</Link></li>
                            <li><Link to="/event-details">Sport Events</Link></li>
                            <li><Link to="/event-details">Departmental Events</Link></li>
                        </ul>
                    </div>
                     <div className="footer-col">
                         <h4>Contact</h4>
                            <ul>
                            <li><FaMapMarkerAlt  className='footer-icon'/> Riverside, CA, USA</li>
                            <li className='footer-email'>
                            <FaEnvelope className='footer-icon' />
                            <a href="mailto:fathiahkazeem@gmail.com">info@CampusConnect.com</a>
                         </li>
                         <li>
                            <FaPhoneAlt className='footer-icon' />
                         <a href="tel:+12345678901" className="phone-link">+1 (234) 567-8901</a> 
                          </li>
                           </ul>
                              </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy;  {new Date().getFullYear()} CampusConnect. All rights reserved.</p>
                </div>

            </div>

        </div>
      
    </div>
  )
}

export default Footer
