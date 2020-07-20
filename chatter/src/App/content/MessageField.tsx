import React from 'react'
import { Form, Field } from 'react-final-form'
import TextInput from '../formComponents/TextInput'

const MessageField = (props: any) => {
    return (
        <div>
            <Form
                onSubmit={props.sendMessage}
                render={({handleSubmit, form}) => (
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit()?.then(() => form.reset())
                        }} 
                        style={{height: '100%'}}
                    >
                        <Field
                            name='text'
                            component={TextInput}
                            message
                            placeholder={`Message ${props.name}`}
                        />
                    </form>
                )}
            />
        </div>
    )
}

export default MessageField
