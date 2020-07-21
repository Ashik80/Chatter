import React from 'react'
import { Form, Field } from 'react-final-form'
import { IChannel } from '../../../../models/channel'
import TextInput from '../../../formComponents/TextInput'

interface IProps {
    contact: IChannel,
    editChannel: (values: IChannel) => Promise<void>,
    setEditMode: (value: React.SetStateAction<{
        id: string,
        name: string
    }>) => void,
    editMode: {
        id: string;
        name: string;
    }
}

const ChannelEditForm: React.FC<IProps> = ({contact, editChannel, setEditMode, editMode}) => {
    return (
        <div id={contact.id} style={{ marginBottom: 20, marginTop: -10 }}>
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
    )
}

export default ChannelEditForm
