import React from 'react'
import './LandingInfo.css'
import Button from '../button/Button'

const LandingInfo = () => {
    return (
        <div className='landing-info'>
            <div className='landing-header'>Chatter is where you get productive</div>
            <div className='landing-description'>Blazing fast, secure and easy to use</div>
            <div className='button-group'>
                <Button content='TRY IT' paddingX={50} paddingY={20} />
                <Button content='Why chatter?' paddingX={50} paddingY={20} inverted />
            </div>
        </div>
    )
}

export default LandingInfo
