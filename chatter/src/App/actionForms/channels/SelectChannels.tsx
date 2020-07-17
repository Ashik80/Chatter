import React, { useContext, useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import SelectInput from '../../formComponents/SelectInput'
import ActionSubmit from '../ActionSubmit'
import { RootStoreContext } from '../../../stores/rootStore'
import TextInput from '../../formComponents/TextInput'

const SelectChannels = (props: any) => {
    const rootStore = useContext(RootStoreContext)
    const {listChannels, channels} = rootStore.channelStore

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
            onSubmit={(values) => console.log(values)}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <div>Add user to channel</div>
                    <Field name='id' component={SelectInput} options={channels} />
                    <Field type='hidden' name='userId' component={TextInput} />
                    <ActionSubmit buttonText='Add' />
                </form>
            )}
        />
    )
}

export default SelectChannels
