import React, { useState, useContext, useEffect } from 'react'
import './Contacts.css'
import { Form, Field } from 'react-final-form'
import TextInput from '../../formComponents/TextInput'
import ChannelList from './ChannelList'
import { IChannel } from '../../../models/channel'
import { observer } from 'mobx-react-lite'
import FriendList from './FriendList'
import {v4 as uuid} from 'uuid'
import { RootStoreContext } from '../../../stores/rootStore'
import { submitFormHandler } from './submitHandler'
import ContactHeader from './ContactHeader'

interface IProps {
    header: string,
    placeholder?: string,
    inputName: string,
    channel?: boolean
}

const Contacts: React.FC<IProps> = ({ header, placeholder, inputName, channel }) => {
    const rootStore = useContext(RootStoreContext)
    const {addChannel, channels, listChannels, deleteChannel} = rootStore.channelStore
    const {loadFriends, friends, addFriend} = rootStore.friendStore

    const [channelVisibility, setChannelVisibility] = useState(false)
    const [friendVisibility, setFriendVisibility] = useState(false)
    const [active, setActive] = useState(false)
    const [inputMode, setInputMode] = useState(false)
    const [sentMode, setSentMode] = useState(false)
    const [selected, setSelected] = useState('')

    const visibilityHandler = () => {
        channel ? setChannelVisibility(!channelVisibility) : setFriendVisibility(!friendVisibility)
        setActive(!active)
    }

    setTimeout(() => {
        setSentMode(false)
    }, 2000);

    useEffect(() => {
        channel ? listChannels() : loadFriends()
    }, [listChannels, channel, loadFriends])

    const inputModeHandler = () => {
        setInputMode(!inputMode)
    }

    const submitHandler = (values: any) => {
        submitFormHandler(values, header, addChannel, setInputMode,
        setChannelVisibility, setActive, addFriend, setSentMode)
    }

    return (
        <div className='contacts'>
            <ContactHeader visibilityHandler={visibilityHandler} header={header}
                active={active} inputMode={inputMode} inputModeHandler={inputModeHandler}/>
            {inputMode && <Form 
                onSubmit={submitHandler}
                render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <Field name={inputName} component={TextInput} contact placeholder={placeholder} />
                    </form>
                )}
            />}
            {sentMode && !channel && <div>Sent</div>}
            {channel && channelVisibility && 
                <ChannelList selected={selected} setSelected={setSelected}
                    contacts={channels} deleteChannel={deleteChannel} />
            }
            {!channel && friendVisibility && 
                <FriendList friends={friends} selected={selected} setSelected={setSelected} />}
        </div>
    )
}

export default observer(Contacts)