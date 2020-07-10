import React from 'react'
import NavBar from '../navbar/NavBar'
import LandingContent from '../landingContent/LandingContent'
import './LandingPage.css'

const LandingPage = () => {
    return (
        <div className='landing-page'>
            <NavBar />
            <LandingContent  />
        </div>
    )
}

export default LandingPage