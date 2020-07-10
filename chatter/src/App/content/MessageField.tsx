import React, { useState, SyntheticEvent } from 'react'
import './MessageField.css'

const MessageField = () => {
    const [message, setMessage] = useState('')

    const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget
        setMessage(value)
    }

    return (
        <div className='message-field'>
            <input 
                className='message-input' 
                name='message'  
                placeholder='Message #general'
                value={message}
                onChange={handleChange}
            />
        </div>
    )
}

export default MessageField
