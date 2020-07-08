import React from 'react'
import './MessageField.css'

const MessageField = () => {
    return (
        <div className='message-field'>
            <input 
                className='message-input' 
                name='message'  
                placeholder='Message #general'
            />
        </div>
    )
}

export default MessageField
