import React from 'react'
import './Message.css'

const Message = () => {
    return (
        <div className='message'>
            <div className='img-container' />
            <div className='message-info'>
                <div className='name-date'>
                    <div className='name'>Name</div>
                    <div className='date'>8th July, 2020</div>
                </div>
                <div>Message text</div>
            </div>
        </div>
    )
}

export default Message
