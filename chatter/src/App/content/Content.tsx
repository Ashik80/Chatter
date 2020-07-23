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
    const {friend} = rootStore.friendStore
    const {createHubConnection, stopConnection, 
        sendMessageToChannel, sendMessageToFriend, messagesByDate} = rootStore.messageStore

    useEffect(() => {
        if(channel != null && friend == null){
            createHubConnection(channel.id)
        }
        if(friend != null && channel == null){
            createHubConnection(friend.friendshipID)
        }
        return(() => {
            stopConnection()
        })
    }, [createHubConnection, stopConnection, channel, friend])

    if(channel == null && friend == null) return <Unselected />

    return (
        <div className='content'>
            {channel && <ChatHeader name={channel.name} />}
            {friend && <ChatHeader name={friend.displayName} />}
            <div className='message-container'>
                <Message
                    messages={messagesByDate!}
                />
            </div>
            {channel && <MessageField
                name={channel.name}
                sendMessage={sendMessageToChannel}
            />}
            {friend && <MessageField
                name={friend.displayName}
                sendMessage={sendMessageToFriend}
            />}
        </div>
    )
}

export default observer(Content)