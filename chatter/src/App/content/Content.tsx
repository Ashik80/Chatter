import React, { useContext, useEffect } from 'react'
import ChatHeader from './ChatHeader'
import MessageField from './MessageField'
import './Content.css'
import Message from './message/Message'
import { RootStoreContext } from '../../stores/rootStore'
import { observer } from 'mobx-react-lite'
import Unselected from './unselected/Unselected'

const Content = () => {
    const rootStore = useContext(RootStoreContext)
    const {channel} = rootStore.channelStore
    const {createHubConnection, stopConnection, sendMessageToChannel, messagesByDate} = rootStore.messageStore

    useEffect(() => {
        if(channel != null){
            createHubConnection(channel.id)
        }
        return(() => {
            stopConnection()
        })
    }, [createHubConnection, stopConnection, channel])

    if(channel == null) return <Unselected />

    return (
        <div className='content'>
            <ChatHeader name={channel.name} />
            <div className='message-container'>
                <Message
                    messages={messagesByDate!}
                />
            </div>
            <MessageField
                name={channel.name}
                sendMessage={sendMessageToChannel}
            />
        </div>
    )
}

export default observer(Content)