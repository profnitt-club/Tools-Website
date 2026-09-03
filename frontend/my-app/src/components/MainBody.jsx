import React from 'react'
import "../styles/mainbody.css"
import HeroSection from './Herosection'
import ContactSection from './ContactSection'
import Intro from './Intro'
import Options from './Options'
import StrategiesTools from './StrategiesTools'
import Explore from './Explore'
import ProfNITTForm from './ProfNITTForm'
import Footer from './Footer'

const MainBody = () => {
  return (
    <div className='main'>
        <HeroSection/>
        <ContactSection/>
        <Intro/>
        <Options/>
        <StrategiesTools/>
        <Explore/>
        <ProfNITTForm/>
        <Footer/>
    </div>
  )
}


export default MainBody