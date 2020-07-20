import React from 'react'
import './ChatHeader.css'

const ChatHeader = (props: any) => {
    return (
        <div className='chat-header'>
            <div>
                <div className='chat-title'>{props.name}</div>
                <div className='chat-description'>The channel description</div>
            </div>
        </div>
    )
}

export default ChatHeader
