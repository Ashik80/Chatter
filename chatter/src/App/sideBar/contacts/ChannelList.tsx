import React, { useState, SyntheticEvent, useContext } from 'react'
import { IChannel } from '../../../models/channel'
import { observer } from 'mobx-react-lite'
import './ChannelList.css'
import ActionButton from '../../actionForms/ActionButton'
import { Form, Field } from 'react-final-form'
import TextInput from '../../formComponents/TextInput'
import { RootStoreContext } from '../../../stores/rootStore'

interface IProps {
    contacts: IChannel[],
    deleteChannel: (id: string) => Promise<void>,
    selected: string,
    setSelected: (value: React.SetStateAction<string>) => void
}

const ChannelList: React.FC<IProps> = ({ contacts, deleteChannel, selected, setSelected }) => {
    const rootStore = useContext(RootStoreContext)
    const { editChannel, channelDetails } = rootStore.channelStore

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
        <div style={{marginTop: 10}}>
            {contacts.map(contact =>
                <div key={contact.id}>
                    <div className={`channel-list ${selected === contact.id && 'selected-channel'}`} 
                        onClick={() => channelDetails(contact.id).then(() => setSelected(contact.id))}
                    >
                        <div className='channel-name'>{contact.name}</div>
                        {contact.isAdmin &&
                            <div>
                                {editMode.id !== contact.id ?
                                    <>
                                        <ActionButton
                                            id={contact.id}
                                            name={contact.name}
                                            content={<i className='fas fa-pen' />}
                                            style={{ color: 'white' }}
                                            clickHandle={handleEditMode}
                                        />
                                        <ActionButton
                                            clickHandle={(e: any) => {
                                                e.stopPropagation()
                                                deleteChannel(contact.id)
                                            }}
                                            content={<i className='fas fa-trash' />}
                                            style={{ color: 'orangered' }}
                                        />
                                    </>
                                    : <ActionButton
                                        content={<i className='fas fa-times' />}
                                        style={{color: 'white'}}
                                        clickHandle={(e: any) => {
                                            e.stopPropagation()
                                            setEditMode({id: '', name: ''})
                                        }}
                                    />
                                }
                            </div>
                        }
                    </div>
                    {editMode.id === contact.id &&
                        <div id={contact.id} style={{marginBottom: 20, marginTop: -10}}>
                            <Form
                                initialValues={editMode}
                                onSubmit={(values: IChannel) => {
                                    editChannel(values)
                                        .then(() => setEditMode({ id: '', name: '' }))
                                }}
                                render={({ handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Field
                                            name='id'
                                            component={TextInput}
                                            type='hidden'
                                            contact
                                        />
                                        <Field
                                            name='name'
                                            component={TextInput}
                                            contact
                                            placeholder='Channel name'
                                        />
                                    </form>
                                )}
                            />
                        </div>
                    }
                </div>
            )}
        </div>
    )
}

export default observer(ChannelList)