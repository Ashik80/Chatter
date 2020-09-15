import React from 'react'
import './ChatterInfo.css'

const ChatterInfo = () => {
    return (
        <div className='chatter-info'>
            <div className='info-header'>
                <i className='fas fa-lightbulb' />
                What's new in Chatter?
            </div>
            <div className='info-description'>
                Chatter is very easy to use. Everything is just <strong>one click away</strong>
                (almost everything). It's functionalities are easy to access and each conversation 
                is very <strong>secure</strong>.
            </div>
        </div>
    )
}

export default ChatterInfo
