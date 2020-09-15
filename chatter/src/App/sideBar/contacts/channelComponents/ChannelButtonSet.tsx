import React, { SyntheticEvent } from 'react'
import ActionButton from '../../../actionForms/ActionButton'
import { IChannel } from '../../../../models/channel'

interface IProps {
    channel: IChannel,
    handleEditMode: (e: SyntheticEvent<HTMLButtonElement>) => void,
    deleteChannel: (id: string) => Promise<void>
}

const ChannelButtonSet: React.FC<IProps> = ({channel, handleEditMode, deleteChannel}) => {
    return (
        <>
            <ActionButton
                id={channel.id}
                name={channel.name}
                content={<i className='fas fa-pen' />}
                style={{ color: 'white' }}
                clickHandle={handleEditMode}
            />
            <ActionButton
                clickHandle={(e: any) => {
                    e.stopPropagation()
                    deleteChannel(channel.id)
                }}
                content={<i className='fas fa-trash' />}
                style={{ color: 'orangered' }}
            />
        </>
    )
}

export default ChannelButtonSet
