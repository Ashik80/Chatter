import React from 'react'
import './LandingContent.css'
import LandingInfo from './LandingInfo'
import img from './chatter-landing.png'

const LandingContent = () => {
    return (
        <div className='landing-content' style={{backgroundImage: `url(${img})`}}>
            <div className='info-position'>
                <LandingInfo />
            </div>
        </div>
    )
}

export default LandingContent
