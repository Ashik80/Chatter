import React, { useContext, useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import SelectInput from '../../formComponents/SelectInput'
import ActionSubmit from '../ActionSubmit'
import { RootStoreContext } from '../../../stores/rootStore'
import TextInput from '../../formComponents/TextInput'
import { observer } from 'mobx-react-lite'
import ResponseMessage from '../../errors/ResponseMessage'

const SelectChannels = (props: any) => {
    const rootStore = useContext(RootStoreContext)
    const {listChannels, userChannels, addUser, added} = rootStore.channelStore

    useEffect(() => {
        listChannels()
    }, [listChannels])

    const initialize = {
        id: userChannels[0].id,
        userId: props.userId
    }

    return (
        <Form
            initialValues={initialize}
            onSubmit={(values) => addUser(values.id, values.userId)}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <Field name='id' component={SelectInput} options={userChannels} />
                    <Field type='hidden' name='userId' component={TextInput} />
                    <br />
                    <ActionSubmit buttonText='Add' />
                    {added && <ResponseMessage message='All done!' />}
                </form>
            )}
        />
    )
}

export default observer(SelectChannels)
