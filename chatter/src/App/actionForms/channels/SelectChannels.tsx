import React, { useContext, useEffect, useState } from 'react'
import { Form, Field } from 'react-final-form'
import SelectInput from '../../formComponents/SelectInput'
import ActionSubmit from '../ActionSubmit'
import { RootStoreContext } from '../../../stores/rootStore'
import TextInput from '../../formComponents/TextInput'

const SelectChannels = (props: any) => {
    const rootStore = useContext(RootStoreContext)
    const {listChannels, channels, addUser} = rootStore.channelStore

    const [sent, setSent] = useState(false)

    const initialize = {
        id: channels[0].id,
        userId: props.userId
    }

    useEffect(() => {
        listChannels()
    }, [listChannels])

    return (
        <Form
            initialValues={initialize}
            onSubmit={(values) => {
                addUser(values.id, values.userId)
                .then(() => {
                    setSent(true)
                    setTimeout(() => {
                        setSent(false)
                    }, 2000)
                })
            }}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <Field name='id' component={SelectInput} options={channels} />
                    <Field type='hidden' name='userId' component={TextInput} />
                    <br />
                    <ActionSubmit buttonText='Add' />
                    {sent && <div>Added!</div>}
                </form>
            )}
        />
    )
}

export default SelectChannels
