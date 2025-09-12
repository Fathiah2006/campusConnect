import React from 'react'
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
    <div>
      <Navbar />
        {/* <Home /> */}
        {/* <About /> */}
        {/* <Gallery /> */}
        {/* <EventCalender /> */}
        {/* <Contact /> */}
        {/* <Feedback /> */}
        {/* <Register /> */}
        <EventDetails/>
      <Footer />

    </div>
  )
}

export default App