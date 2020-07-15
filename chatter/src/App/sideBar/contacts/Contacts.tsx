import React, { useState, useContext, useEffect } from 'react'
import './Contacts.css'
import { Form, Field } from 'react-final-form'
import TextInput from '../../formComponents/TextInput'
import ChannelList from './ChannelList'
import { IChannel } from '../../../models/channel'
import ChannelStore from '../../../stores/channelStore'
import { observer } from 'mobx-react-lite'
import FriendList from './FriendList'

interface IProps {
    header: string,
    placeholder?: string,
    inputName: string,
    channel?: boolean
}

const Contacts: React.FC<IProps> = ({ header, placeholder, inputName, channel }) => {
    const channelStore = useContext(ChannelStore)
    const {addChannel, channels, listChannels, deleteChannel} = channelStore

    const [channelVisibility, setChannelVisibility] = useState(false)
    const [friendVisibility, setFriendVisibility] = useState(false)
    const [active, setActive] = useState(false)
    const [inputMode, setInputMode] = useState(false)

    const visibilityHandler = () => {
        channel ? setChannelVisibility(!channelVisibility) : setFriendVisibility(!friendVisibility)
        setActive(!active)
    }

    useEffect(() => {
        channel && listChannels()
    }, [listChannels, channel])

    const inputModeHandler = () => {
        setInputMode(!inputMode)
    }

    const submitHandler = (values: IChannel) => {
        if(header === 'channels'){
            addChannel(values).then(() => {
                setInputMode(false)
                setChannelVisibility(true)
                setActive(true)
            })
        } else if (header === 'friends') {
            console.log(values)
        }
    }

    return (
        <div className='contacts'>
            <div className='contact-header'>
                <div onClick={visibilityHandler}>
                    <i className={`fas fa-chevron-right ${active && 'active-icon'}`} />
                    {header}
                </div>
                <button className='add-contact-btn' onClick={inputModeHandler}>
                    <i className={`fas fa-plus ${inputMode && 'cancel-btn'}`} />
                </button>
            </div>
            {inputMode && <Form 
                onSubmit={submitHandler}
                render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <Field name={inputName} component={TextInput} contact placeholder={placeholder} />
                    </form>
                )}
            />}
            {channel && channelVisibility && 
                <ChannelList contacts={channels} deleteChannel={deleteChannel} />
            }
            {!channel && friendVisibility && <FriendList />}
        </div>
    )
}

export default observer(Contacts)