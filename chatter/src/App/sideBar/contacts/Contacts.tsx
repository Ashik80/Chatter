import React, { useState, useContext, useEffect } from 'react'
import './Contacts.css'
import { Form, Field } from 'react-final-form'
import TextInput from '../../formComponents/TextInput'
import ChannelList from './channelComponents/ChannelList'
import { observer } from 'mobx-react-lite'
import FriendList from './friendComponents/FriendList'
import { RootStoreContext } from '../../../stores/rootStore'
import { submitFormHandler } from './submitHandler'
import ContactHeader from './ContactHeader'
import { combineValidators, isRequired } from 'revalidate'
import ResponseMessage from '../../errors/ResponseMessage'

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

    const validate = combineValidators({
        [inputName]: isRequired(inputName)
    })

    return (
        <div className='contacts'>
            <ContactHeader visibilityHandler={visibilityHandler} header={header}
                active={active} inputMode={inputMode} inputModeHandler={inputModeHandler}/>
            {inputMode && <Form
                validate={validate}
                onSubmit={submitHandler}
                render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <Field name={inputName} component={TextInput} contact placeholder={placeholder} />
                    </form>
                )}
            />}
            {sentMode && !channel && <ResponseMessage message='Request sent' />}
            {channel && channelVisibility && 
                <ChannelList channels={channels} deleteChannel={deleteChannel} />
            }
            {!channel && friendVisibility && 
                <FriendList friends={friends} />}
        </div>
    )
}

export default observer(Contacts)