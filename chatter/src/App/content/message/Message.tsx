import React from 'react'
import './Message.css'
import { IMessage } from '../../../models/message'
import { observer } from 'mobx-react-lite'

interface IProps {
    messages: IMessage[] | undefined
}

const Message: React.FC<IProps> = ({ messages }) => {
    return (
        <div className='message-wrap'>
            {messages?.map(message => (
                <div className='message' key={message.id}>
                    <div className='img-container' />
                    <div className='message-info'>
                        <div className='name-date'>
                            <div className='name'>{message.displayName}</div>
                            <div className='date'>{message.sentTime}</div>
                        </div>
                        <div>{message.text}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default observer(Message)
