import React from 'react'
import ChatHeader from './ChatHeader'
import MessageField from './MessageField'
import './Content.css'
import Message from './message/Message'

const Content = () => {
    return (
        <div className='content'>
            <ChatHeader />
            <div className='message-container'>
                <Message />
            </div>
            <MessageField />
        </div>
    )
}

export default Content
