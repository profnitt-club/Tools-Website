import React from 'react'
import HeroSection from './Herosection'
import ContactSection from './ContactSection'
import Intro from './Intro'
import Options from './Options'
import Explore from './Explore'
import ProfNITTForm from './ProfNITTForm'
import Footer from './Footer'

const MainBody = () => {
  return (
    <div className='flex flex-col bg-pn-bg w-full min-h-screen relative overflow-y-auto overflow-x-hidden px-[clamp(0.5rem,2vw,1rem)] sm:px-0'>
        <HeroSection/>
        <ContactSection/>
        <Intro/>
        <Options/>
        <Explore/>
        <ProfNITTForm/>
        <Footer/>
    </div>
  )
}

export default MainBody