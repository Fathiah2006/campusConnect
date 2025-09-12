import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Navbar from './components/layouts/Navbar/Navbar'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Gallery from './pages/gallery/GalleryPage'
import EventCalender from './pages/eventCalender/EventCalender'
import Contact from './pages/Contact/Contact'
import Feedback from './pages/Feedback/Feedback'
import Register from './pages/registration/Register'
import EventDetails from './pages/eventDetails/EventDetails'
import Footer from './components/layouts/Footer/Footer'



const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<EventCalender />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/register" element={<Register />} />
          <Route path="/event-details" element={<EventDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App