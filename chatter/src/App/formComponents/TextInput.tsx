import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import './TextInput.css'
import ResponseMessage from '../errors/ResponseMessage'

interface IProps extends FieldRenderProps<string> {
    contact: boolean,
    message: boolean,
}

const TextInput: React.FC<IProps> = ({ input, placeholder, message, contact, meta: { touched, error } }) => {
    const inputStyle = {
        height: 25,
        backgroundColor: '#424855',
        border: 'none',
        color: 'white',
        marginTop: 5
    }

    return (
        <div className={!message ? 'field' : 'message-field'}>
            <input 
                {...input}
                placeholder={placeholder}
                className={message ? 'message-input' : 'text-input'}
                style={contact ? inputStyle : {}}
            />
            {touched && error && !message && 
                <ResponseMessage message={error} error />}
        </div>
    )
}

export default TextInput
