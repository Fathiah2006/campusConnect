import React from 'react'
import HeroAbout from './heroAbout/HeroAbout'
import CollegeOverview from './college/CollegeOverview'
import CollegeTradition from './tradition/CollegeTradition'
import AnnualEvents from './annualEvents/AnnualEvents'
import EventCatalog from './eventCatalog/EventCatalog'

const About = () => {
  return (
    <div>
      <HeroAbout />
      <CollegeOverview />
      <CollegeTradition />
      <EventCatalog />
      <AnnualEvents />
    </div>
  )
}

export default About
