import React from 'react'
import { IChannel } from '../../../models/channel'
import { observer } from 'mobx-react-lite'
import './ChannelList.css'

interface IProps {
    contacts: IChannel[],
    deleteChannel: (id: string) => Promise<void>
}

const ChannelList: React.FC<IProps> = ({ contacts, deleteChannel }) => {
    return (
        <div className=''>
            {contacts.map(contact =>
                <div key={contact.id} className='channel-list'>
                    <div className='channel-name'>{contact.name}</div>
                    <button onClick={() => deleteChannel(contact.id)}>
                        <i className='fas fa-times' />
                    </button>
                </div>
            )}
        </div>
    )
}

export default observer(ChannelList)