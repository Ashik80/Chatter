import React, { useState, SyntheticEvent, useContext } from 'react'
import { IChannel } from '../../../../models/channel'
import { observer } from 'mobx-react-lite'
import './ChannelList.css'
import ActionButton from '../../../actionForms/ActionButton'
import { RootStoreContext } from '../../../../stores/rootStore'
import ChannelButtonSet from './ChannelButtonSet'
import ChannelEditForm from './ChannelEditForm'

interface IProps {
    channels: IChannel[],
    deleteChannel: (id: string) => Promise<void>
}

const ChannelList: React.FC<IProps> = ({ channels, deleteChannel }) => {
    const rootStore = useContext(RootStoreContext)
    const { editChannel, channelDetails } = rootStore.channelStore
    const {selected, setSelected} = rootStore.selectionStore

    const [editMode, setEditMode] = useState({ id: '', name: '' })

    const handleEditMode = (e: SyntheticEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        const { id, name } = e.currentTarget
        setEditMode({
            id: id,
            name: name.split('#')[1]
        })
    }

    return (
        <div style={{ marginTop: 10 }}>
            {channels.map(channel =>
                <div key={channel.id}>
                    <div id={channel.id}
                        className={`channel-list ${selected === channel.id && 'selected-channel'}`}
                        onClick={() => {
                            setSelected(channel.id)
                            channelDetails(channel.id)
                        }}
                    >
                        <div className='channel-name'>{channel.name}</div>
                        {channel.isAdmin &&
                            <div>
                                {editMode.id !== channel.id ?
                                    <ChannelButtonSet channel={channel}
                                        handleEditMode={handleEditMode} deleteChannel={deleteChannel} />
                                    : <ActionButton
                                        content={<i className='fas fa-times' />}
                                        style={{ color: 'white' }}
                                        clickHandle={(e: any) => {
                                            e.stopPropagation()
                                            setEditMode({ id: '', name: '' })
                                        }}
                                    />
                                }
                            </div>
                        }
                    </div>
                    {editMode.id === channel.id &&
                        <ChannelEditForm editMode={editMode} contact={channel}
                            editChannel={editChannel} setEditMode={setEditMode} />
                    }
                </div>
            )}
        </div>
    )
}

export default observer(ChannelList)